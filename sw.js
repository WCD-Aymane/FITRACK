/* FitTrack — Service Worker
   Stratégie : cache-first pour le shell de l'app, network-first pour le reste.
   Bump CACHE_VERSION pour forcer la mise à jour côté client.
*/
const CACHE_VERSION = 'fittrack-v1';
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(SHELL_ASSETS).catch(err => {
        // Silent fail on CDN — better to install partial cache than none
        console.warn('[SW] Some shell assets failed to cache', err);
      }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Cache-first pour le shell
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // On ne cache que les requêtes 200 et same-origin / CDN connu
        if (res && res.status === 200 && (res.type === 'basic' || req.url.includes('unpkg.com'))) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, clone));
        }
        return res;
      }).catch(() => {
        // Hors ligne et pas dans le cache : fallback sur la page principale si c'est une nav
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
