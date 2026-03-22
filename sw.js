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
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',
  '/script.js',
  '/fiveicon.png',
  '/fiveicon-512.png',
  '/PiPicon.png'
];

// resources considered "static" for stale-while-revalidate
const STATIC_EXT = /\.(?:js|css|png|jpg|jpeg|webp|svg|gif|woff2?|ttf|ico)$/i;

// resources considered "media" (prefer network)
const MEDIA_HOSTS = ['dl.dropboxusercontent.com', 'player.odycdn.com', 'drive.google.com', 'odycdn.com', 'tokyvideo.com', 'playerflixapi.com'];

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

    // For ranged requests, fetch from network with credentials and no-cache to ensure CDN serves proper 206 partial responses.
    const init = {
      method: 'GET',
      headers: {
        // Preserve incoming headers but ensure Range is passed through
        'Range': range
      },
      // We prefer CORS mode for most CDNs; allow no-cors fallback where necessary.
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-cache'
    };

    // Attempt network fetch first; if it fails, try to serve a cached full file as fallback (best-effort).
    const networkResponse = await fetch(request.url, init);
    if (networkResponse && (networkResponse.status === 206 || networkResponse.status === 200)) {
      // For partial content (206) or full (200), return network response directly without caching (to avoid storing large media with partial ranges).
      return networkResponse;
    }

    // If network returns non-ideal status, fall back to cache if available.
    const cache = await caches.open(RUNTIME);
    const cached = await cache.match(request);
    if (cached) return cached;

    // As last resort, attempt a normal fetch (without Range) to obtain a response.
    const fallback = await fetch(request.url, { mode: 'cors', credentials: 'omit' });
    return fallback;
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
  const isMediaHost = MEDIA_HOSTS.some(h => url.hostname.includes(h));
  if (isMediaHost || url.search) {
    // Let the browser handle media/CDN requests directly (no SW interception) to avoid CORS/Range issues
    // that commonly prevent mobile players from fetching video bytes; returning here allows native
    // network stack to handle Range requests and streaming for better mobile compatibility.
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
