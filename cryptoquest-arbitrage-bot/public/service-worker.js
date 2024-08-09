self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Precache resources
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});
