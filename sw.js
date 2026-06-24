/**
 * Service Worker for Lumina (2026 best-practices) - updated for improved mobile playback of CDN/Dropbox assets
 *
 * Strategy (updates):
 * - Navigation (document) requests: Network-first -> fallback to cached navigation shell
 * - Static assets (CSS/JS/Images/fonts): Stale-while-revalidate
 * - Media files (big video files / CDN links with query): Network-first and special handling for Range requests to
 *   forward ranged requests to the network (bypassing cache) and return streamed responses so mobile players can
 *   perform efficient byte-range fetching (important for Dropbox and other CDNs).
 *
 * Notes:
 * - Cache names versioned so updates rotate caches cleanly.
 * - Added networkFirstRange handler to stream ranged responses and respect Range headers.
 */

const CACHE_VERSION = 'v2';
const PRECACHE = `lumina-precache-${CACHE_VERSION}`;
const RUNTIME = `lumina-runtime-${CACHE_VERSION}`;
const NAV_CACHE_KEY = '/index.html'; // navigation fallback (app shell)

// Precache core shell
const PRECACHE_URLS = [
  '/',                   // root
  '/index.html',
  '/manifest.json',

  // CSS / JS (include both absolute and relative paths to match how pages request them)
  '/style.css',
  'style.css',
  '/script.js',
  'script.js',

  // Icons (cache both leading-slash and relative variants)
  '/fiveicon.png',
  'fiveicon.png',
  '/fiveicon-512.png',
  'fiveicon-512.png',
  '/PiPicon.png',
  'PiPicon.png'
];

// resources considered "static" for stale-while-revalidate
const STATIC_EXT = /\.(?:js|css|png|jpg|jpeg|webp|svg|gif|woff2?|ttf|ico)$/i;

/*
 * Media detection: prefer network-first streaming with Range support for:
 * - Known media CDN hosts (Dropbox, Odycdn, Drive, etc.)
 * - Any request that looks like a direct media file (.mp4, .webm, .m3u8, .mov, .ogg)
 * This improves mobile playback and seeking for CDN-hosted videos and tokenized links.
 */
const MEDIA_HOSTS = ['dl.dropboxusercontent.com', 'player.odycdn.com', 'drive.google.com', 'odycdn.com', 'tokyvideo.com', 'playerflixapi.com', 'player.odycdn.com', 'blogger.com', 'rumble.com'];

// Install: pre-cache core shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS.map(u => new Request(u, { cache: 'reload' }))))
  );
});

// Activate: cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => ![PRECACHE, RUNTIME].includes(k)).map(k => caches.delete(k)));
    try { await self.clients.claim(); } catch (_) {}
  })());
});

// Utility: respond with stale-while-revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request).then(networkRes => {
    if (networkRes && networkRes.ok) cache.put(request, networkRes.clone()).catch(()=>{});
    return networkRes;
  }).catch(()=>null);

  // return cache immediately if available, otherwise wait network
  return cached || (await networkPromise) || new Response('', { status: 503, statusText: 'Service Unavailable' });
}

// Utility: network-first with cache fallback
async function networkFirst(request, cacheKeyOverride) {
  const cache = await caches.open(RUNTIME);
  try {
    const networkResponse = await fetch(request.clone());
    if (networkResponse && networkResponse.ok) {
      cache.put(cacheKeyOverride || request, networkResponse.clone()).catch(()=>{});
      return networkResponse;
    }
    const cached = await cache.match(cacheKeyOverride || request);
    if (cached) return cached;
    return networkResponse;
  } catch (err) {
    const cached = await cache.match(cacheKeyOverride || request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const pre = await caches.open(PRECACHE);
      const shell = await pre.match(NAV_CACHE_KEY);
      return shell || Response.error();
    }
    return Response.error();
  }
}

// New helper: network-first but honor Range header by proxying request directly to network and streaming response.
// This avoids returning an entire cached file and allows byte-range seeks which are crucial for mobile video players.
async function networkFirstRange(request) {
  try {
    // If there's no Range header, behave like networkFirst but prefer fresh network
    const range = request.headers.get('range');
    if (!range) return await networkFirst(request);

    // For ranged requests, attempt network fetch with CORS first and fall back to no-cors when CORS blocks
    const makeFetch = async (mode) => {
      try {
        const init = {
          method: 'GET',
          headers: { 'Range': range },
          mode: mode, // 'cors' or 'no-cors'
          credentials: 'omit',
          cache: 'no-cache'
        };
        // Use fetch with the provided mode and return response (may be opaque for no-cors)
        return await fetch(request.url, init);
      } catch (e) {
        return null;
      }
    };

    // Try CORS-mode fetch first (best for receiving 206 with proper headers)
    let networkResponse = await makeFetch('cors');

    // If CORS failed or returned an opaque/unsuitable response, try no-cors fallback (may yield opaque response but often succeeds on CDNs like Dropbox)
    if (!networkResponse || (!networkResponse.ok && networkResponse.status !== 206 && networkResponse.type !== 'opaque')) {
      const fallbackResp = await makeFetch('no-cors');
      if (fallbackResp) networkResponse = fallbackResp;
    }

    // If we have a usable response (206, 200 or opaque), return it directly (do not cache partials)
    if (networkResponse && (networkResponse.status === 206 || networkResponse.status === 200 || networkResponse.type === 'opaque')) {
      return networkResponse;
    }

    // Otherwise try to serve a cached copy as fallback
    const cache = await caches.open(RUNTIME);
    const cached = await cache.match(request);
    if (cached) return cached;

    // Final fallback: try a normal network fetch without Range (with CORS then no-cors)
    let normal = null;
    try { normal = await fetch(request.url, { mode: 'cors', credentials: 'omit' }); } catch(_) { try { normal = await fetch(request.url, { mode: 'no-cors', credentials: 'omit' }); } catch(_) { normal = null; } }
    if (normal) return normal;

    return Response.error();
  } catch (err) {
    try {
      // On network error, return cached variant if present
      const cache = await caches.open(RUNTIME);
      const cached = await cache.match(request);
      if (cached) return cached;
    } catch(_) {}
    return Response.error();
  }
}

// Main fetch handler
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Only handle GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Navigation (document) -> network-first, ensure app shell fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const resp = await networkFirst(req, NAV_CACHE_KEY);
        if (!resp || resp.status >= 500) {
          const pre = await caches.open(PRECACHE);
          const shell = await pre.match(NAV_CACHE_KEY);
          return shell || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        }
        return resp;
      })()
    );
    return;
  }

  // Static assets (js/css/images/fonts) -> stale-while-revalidate
  if (STATIC_EXT.test(url.pathname) || (url.origin === location.origin && url.pathname.startsWith('/assets/'))) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Media / CDN hosts -> network-first, with Range-aware handler for streaming/ranged requests
  // Determine if the request targets media we should handle specially.
  const hasQuery = Boolean(url.search);
  const looksLikeMediaExt = /\.(mp4|webm|m3u8|mov|ogg)$/i.test(url.pathname) || /\.(mp4|webm|m3u8|mov|ogg)$/i.test((url.pathname + (url.search || '')));
  const isMediaHost = MEDIA_HOSTS.some(h => url.hostname.includes(h));
  const isMediaRequest = isMediaHost || looksLikeMediaExt;

  // For known media hosts or direct media file requests (e.g. .mp4/.m3u8), use a Range-aware network-first strategy so mobile players can seek/stream reliably.
  if (isMediaRequest) {
    event.respondWith(networkFirstRange(req));
    return;
  }

  // Default: try cache, then network, then precache fallback
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const networkRes = await fetch(req);
      if (networkRes && networkRes.ok) {
        cache.put(req, networkRes.clone()).catch(()=>{});
        return networkRes;
      }
    } catch (e) {}
    // fallback to precache for safe assets
    const pre = await caches.open(PRECACHE);
    const shell = await pre.match(NAV_CACHE_KEY);
    return shell || Response.error();
  })());
});

// Keep service worker alive during long-running operations if needed
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') self.skipWaiting();
});