const CACHE = 'threatlens-v1';
const SHELL = ['/', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // API calls: network-first, fall back to cache
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const cl = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, cl));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // Static: cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(nr => {
      const cl = nr.clone();
      caches.open(CACHE).then(c => c.put(e.request, cl));
      return nr;
    }))
  );
});
