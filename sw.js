const CACHE_NAME = 'lumina-v1';
const OFFLINE_URL = '/';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
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

  // for other requests use cache-first then network
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(networkRes => {
        // store a copy for future
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => {
            try { cache.put(req, clone); } catch(e) {}
          });
        }
        return networkRes;
      }).catch(() => {
        // fallback to offline root if an image or document requested
        if (req.destination === 'image' || req.destination === 'document') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
