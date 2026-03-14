const CACHE_NAME = 'lumina-v2';
const OFFLINE_URL = '/';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/fiveicon.png',
  '/fiveicon-512.png',
  // fonts & external assets are best-effort; keep minimal to avoid large cache
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }))).catch(() => {
        // ignore errors adding some remote assets
        return cache.add(OFFLINE_URL).catch(()=>{});
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // remove old caches
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
      if (self.clients && clients.claim) await clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // only handle GET
  if (req.method !== 'GET') return;

  // prefer network for navigation requests but fallback to cache (network-first for navigations)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        // put a copy into cache
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(OFFLINE_URL, copy));
        return res;
      }).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  // For other requests, use a network-first approach when the request includes query params
  // or targets known media providers (e.g. Dropbox) to avoid serving stale URLs cached earlier.
  event.respondWith((async () => {
    try {
      const isDropbox = url.hostname.includes('dropbox.com');
      const hasQuery = !!url.search; // any query params present
      // For navigation we handled above; for media-like requests prefer network-first when query or dropbox
      if (isDropbox || hasQuery) {
        try {
          const networkResponse = await fetch(req.clone());
          // update cache with fresh response if successful
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              try { cache.put(req, copy); } catch (e) {}
            });
          }
          return networkResponse;
        } catch (err) {
          // network failed -> fallback to cache if available
          const cached = await caches.match(req);
          if (cached) return cached;
          // fallback to offline root for images/documents
          if (req.destination === 'image' || req.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
          // otherwise throw to let browser handle
          throw err;
        }
      }

      // Default: cache-first then network
      const cached = await caches.match(req);
      if (cached) return cached;
      const networkRes = await fetch(req.clone());
      if (networkRes && networkRes.status === 200) {
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then(cache => {
          try { cache.put(req, clone); } catch(e) {}
        });
      }
      return networkRes;
    } catch (e) {
      // final fallback
      const fallback = await caches.match(OFFLINE_URL);
      return fallback;
    }
  })());
});
