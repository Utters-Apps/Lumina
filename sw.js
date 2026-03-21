/**
 * Service Worker for Lumina (2026 best-practices)
 *
 * Strategy:
 * - Navigation (document) requests: Network-first -> fallback to cached navigation shell (ensures fresh content)
 * - Static assets (CSS/JS/Images/fonts): Stale-while-revalidate (serve cache immediately and refresh in background)
 * - Media files (big video files / CDN links with query): Network-first and fall back to cache if offline
 *
 * Notes:
 * - Cache names versioned so updates rotate caches cleanly.
 * - Small in-memory routing helpers keep fetch handler readable.
 */

const CACHE_VERSION = 'v1';
const PRECACHE = `lumina-precache-${CACHE_VERSION}`;
const RUNTIME = `lumina-runtime-${CACHE_VERSION}`;
const NAV_CACHE_KEY = 'index.html'; // navigation fallback (app shell)
const PRECACHE_URLS = [
  './index.html',
  'manifest.json',
  'style.css',
  './style.css',              // include both variants to avoid path mismatches in different loads
  'fiveicon.png',
  'fiveicon-512.png'
];

// resources considered "static" for stale-while-revalidate
const STATIC_EXT = /\.(?:js|css|png|jpg|jpeg|webp|svg|gif|woff2?|ttf|ico)$/i;

// resources considered "media" (prefer network)
const MEDIA_HOSTS = ['dropbox.com', 'player.odycdn.com', 'drive.google.com', 'youtube.com', 'www.youtube.com', 'youtu.be'];

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
    // if network responded but non-OK, fall back
    const cached = await cache.match(cacheKeyOverride || request);
    if (cached) return cached;
    return networkResponse;
  } catch (err) {
    const cached = await cache.match(cacheKeyOverride || request);
    if (cached) return cached;
    // fallback to navigation shell if it's a navigation
    if (request.mode === 'navigate') {
      const pre = await caches.open(PRECACHE);
      const shell = await pre.match(NAV_CACHE_KEY);
      return shell || Response.error();
    }
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
        // if networkFirst returned a response that's not valid, fallback to precache shell
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
  if (STATIC_EXT.test(url.pathname) || url.origin === location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Treat direct .mp4 requests as network-first to ensure large media isn't served stale or blocked by SW
  if (url.pathname && /\.mp4(\?|$)/i.test(url.pathname)) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Media / CDN hosts (including YouTube/short links) -> network-first (long timeout)
  if (MEDIA_HOSTS.some(h => url.hostname.includes(h)) || url.search) {
    event.respondWith(networkFirst(req));
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
