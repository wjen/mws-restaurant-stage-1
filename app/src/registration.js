(function () {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log(`serviceworker registered: ${registration}`);
    }).catch(function(error) {
      console.log(`serviceworker failed: ${error}`);
    })
  } else {
    console.log('ServiceWorker not supported');
  }
})();
