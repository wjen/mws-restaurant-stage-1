const cacheVersion = '2';
const STATIC_CACHE = `static_cache-v${cacheVersion}`;
const IMAGES_CACHE = `images_cache-v`;

import { openDB, deleteDB, wrap, unwrap } from 'idb';

console.log(openDB);
const dbPromise = openDB('rr-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('restaurants', { keyPath: 'id' });
    store.createIndex('id', 'id');
  }
});

function isImageURL(url) {
  let imgTypes = ["png", "jpg", "jpeg", "svg", "gif"];
  let isImage = false;
  for (let type of imgTypes) {
    if (url.endsWith(type)) { isImage = true; break};
  }
  return isImage;
}


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll([
        '/',
        '/src/main.js',
        '/src/dbhelper.js',
        '/restaurant.html',
        '/index.html',
        '/src/restaurant_info.js',
        '/src/styles.css',
        '/src/rr-icon512.png'
      ]).catch(error => {
        console.log('error opening cache' + error);
      });
    })
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(response => {
        return (response || fetch(event.request).then(fetchResponse => {
          let useCache = isImageURL(event.request.url) ?  IMAGES_CACHE : STATIC_CACHE;
          return caches.open(useCache).then(cache => {
             cache.put(event.request, fetchResponse.clone());
             return fetchResponse;
          });
        }));
      }).catch(error => {
        console.log(error);
      })
    );
  } else {
    event.respondWith( fetch(event.request) );
  }
});
