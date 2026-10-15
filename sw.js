const CACHE_NAME = 'tidrapport-cache-v1.1112';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// Sparar filerna i telefonen vid första besöket
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Använder sparade filer om nätet är nere
self.addEventListener('fetch', event => {
  // Låt API-anropen till Google gå vidare till nätet/kön, cacha dem inte här
  if (event.request.url.includes('script.google.com')) return;
  
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
