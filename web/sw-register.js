/**
 * Enregistrement du Service Worker avec gestion des erreurs améliorée
 */

// Vérifier si le service worker est pris en charge avant de l'utiliser
(function() {
  // Ne rien faire si le service worker n'est pas pris en charge
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker non pris en charge par ce navigateur');
    return;
  }
  
  // Fonction pour charger une ressource CSS de secours
  function loadFallbackCSS(href) {
    console.warn('Chargement CSS de secours pour:', href);
    
    // Créer un nouvel élément link pour le CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href + (href.includes('?') ? '&' : '?') + 'bypass-sw=true&t=' + Date.now();
    
    // Ajouter au document
    document.head.appendChild(link);
  }
  
  // Gérer les erreurs de chargement de ressources
  window.addEventListener('error', function(event) {
    // Ne traiter que les erreurs de chargement de ressources CSS
    if (event.target && 
        event.target.tagName === 'LINK' && 
        event.target.rel === 'stylesheet') {
      
      loadFallbackCSS(event.target.href);
      
      // Désactiver le lien original pour éviter les conflits
      event.target.disabled = true;
    }
  }, true);
  
  // Enregistrer le service worker une fois la page chargée
  window.addEventListener('load', function() {
    // Attendre un peu avant d'enregistrer le service worker
    setTimeout(function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('Service Worker enregistré avec succès:', registration.scope);
        })
        .catch(function(error) {
          console.log('Échec de l\'enregistrement du Service Worker:', error);
        });
    }, 1000);
  });
})();