const cacheID = 'mws';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      return cache.addAll([
        '/',
        '/src/main.js',
        '/src/dbhelper.js',
        '/restaurant.html',
        '/index.html',
        '/src/restaurant_info.js',
        '/src/styles.css',
        '/app.bundle.js',
        '/restaurant.bundle.js',
        '/src/rr-icon512.png'
      ]).catch(error => {
        console.log('error opening cache' + error);
      });
    })
  );
});

