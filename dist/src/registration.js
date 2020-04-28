export default (function () {

  if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/sw.js').then(registration => {
       console.log('SW registered: ', registration);
       console.log('HELLO FROM REGISTRATION JS');
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
  }

})();


