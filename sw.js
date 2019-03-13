const cacheID = 'mws';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      cache.addAll([
        '/',
        'js/main.js',
        'js/dbhelper.js',
        'js/registration.js',
        'restaurant.html',
        'sass/main.scss',
        'index.html',
        'js/restaurant_info.js',
      ]).catch(error => {
        console.log('error opening cache' + error);
      });
    })
  );
});


