/**
 * Service Worker Registration - Version sécurisée
 */

(function() {
  console.log('Initialisation du Service Worker sécurisé...');
  
  // Vérifier que service worker est supporté
  if ('serviceWorker' in navigator) {
    // Attendre que la page soit complètement chargée
    window.addEventListener('load', function() {
      // Petit délai pour donner la priorité au contenu
      setTimeout(function() {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function(registration) {
            console.log('Service Worker enregistré avec succès:', registration.scope);
          })
          .catch(function(error) {
            console.warn('Échec d\'enregistrement du Service Worker:', error);
          });
      }, 3000);
    });
  } else {
    console.log('Service Worker non supporté par ce navigateur');
  }
})();
