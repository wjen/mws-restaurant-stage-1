export default (function () {

  if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/serviceworker.bundle.js').then(registration => {
       console.log('SW registered: ', registration);
       console.log('HELLO FROM REGISTRATION JS');
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
  }

})();


