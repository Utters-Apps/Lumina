/*
  Lumina PWA Service Worker
  - Precaches app shell
  - Runtime caches images, HTML, JS/CSS, and provides special handling for direct .mp4 downloads saved offline
  - Uses Cache Storage "lumina-static-v1" for shell and "lumina-runtime-v1" for runtime assets, and "lumina-media-v1" for stored .mp4
  - Strategy:
      * Shell: cache-first (install)
      * Runtime (images, fonts, API): stale-while-revalidate
      * .mp4 requests: network-first when online (to stream), else serve from "lumina-media-v1"
      * Requests to explicitly downloaded videos are served from "lumina-media-v1" when available
  - Exposes a small message API to manage cache from the page (download, remove)
*/

const VERSION = 'lumina-sw-v1';
const STATIC_CACHE = 'lumina-static-v1';
const RUNTIME_CACHE = 'lumina-runtime-v1';
const MEDIA_CACHE = 'lumina-media-v1';

// list of shell assets to precache (minimal; app.js and index.html are large, but include common assets)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  // intentionally do NOT precache /app.js to reduce install payload and memory pressure on low-end devices
  '/service-worker.js',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => ![STATIC_CACHE, RUNTIME_CACHE, MEDIA_CACHE].includes(k)).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

// helper: small TTL for runtime stale-while-revalidate logic
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    // only store valid responses
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  }).catch(()=>null);
  return cached || fetchPromise;
}

self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  const url = new URL(req.url);

  // Serve navigation requests from cache first (app shell)
  if (req.mode === 'navigate') {
    evt.respondWith(
      caches.match('/index.html').then((resp) => resp || fetch('/index.html'))
    );
    return;
  }

  // handle mp4 requests specially
  if (req.destination === 'video' || url.pathname.endsWith('.mp4')) {
    // If there is a specific cached media (downloaded), serve it when offline.
    evt.respondWith((async () => {
      try {
        // Try network-first for streaming/fresh content when online
        const networkResp = await fetch(req);
        // Do not automatically cache all network mp4 responses (we only cache on explicit download via message)
        return networkResp;
      } catch (e) {
        // offline: try media cache
        const cache = await caches.open(MEDIA_CACHE);
        const match = await cache.match(req.url);
        if (match) return match;
        // fallback to runtime cache for same-origin mp4s
        const runtime = await caches.match(req);
        if (runtime) return runtime;
        return new Response('Offline and media not available', { status: 503, statusText: 'Offline' });
      }
    })());
    return;
  }

  // Images & fonts: stale-while-revalidate
  if (req.destination === 'image' || req.destination === 'font' || /\.(png|jpg|jpeg|webp|svg|gif)$/.test(url.pathname)) {
    evt.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
    return;
  }

  // JS/CSS: network-first but fallback to cache
  if (req.destination === 'script' || req.destination === 'style') {
    evt.respondWith(
      fetch(req).then(resp => {
        if (resp && resp.ok) {
          caches.open(RUNTIME_CACHE).then(c => c.put(req, resp.clone()));
        }
        return resp;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Default: try cache, else network
  evt.respondWith(
    caches.match(req).then(cached => cached || fetch(req).catch(()=>cached))
  );
});

// Message API (from page) to manage storing/removing .mp4 into MEDIA_CACHE
self.addEventListener('message', (evt) => {
  const data = evt.data || {};
  if (!data || !data.type) return;

  if (data.type === 'DOWNLOAD_VIDEO') {
    const { url } = data;
    if (!url) return;
    // fetch and store in MEDIA_CACHE
    evt.waitUntil((async () => {
      try {
        const cache = await caches.open(MEDIA_CACHE);
        // fetch the resource (as a full response) and put into cache
        const resp = await fetch(url);
        if (resp && resp.ok) {
          await cache.put(url, resp.clone());
          // inform client about completion
          const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
          for (const c of clientsList) {
            c.postMessage({ type: 'DOWNLOAD_COMPLETE', url, status: 'ok' });
          }
        } else {
          const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
          for (const c of clientsList) {
            c.postMessage({ type: 'DOWNLOAD_COMPLETE', url, status: 'error', statusText: resp && resp.statusText });
          }
        }
      } catch (e) {
        const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
        for (const c of clientsList) {
          c.postMessage({ type: 'DOWNLOAD_COMPLETE', url, status: 'error', error: String(e) });
        }
      }
    })());
  }

  if (data.type === 'REMOVE_VIDEO') {
    const { url } = data;
    if (!url) return;
    evt.waitUntil((async () => {
      try {
        const cache = await caches.open(MEDIA_CACHE);
        await cache.delete(url);
        const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
        for (const c of clientsList) c.postMessage({ type: 'REMOVE_COMPLETE', url, status: 'ok' });
      } catch (e) {
        const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
        for (const c of clientsList) c.postMessage({ type: 'REMOVE_COMPLETE', url, status: 'error', error: String(e) });
      }
    })());
  }
});