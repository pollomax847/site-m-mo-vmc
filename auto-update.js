// Script de gestion des mises à jour automatiques pour l'application
document.addEventListener('DOMContentLoaded', function() {
  // Version de l'application
  const APP_VERSION = '1.0.2'; // Incrémentez cette valeur à chaque nouvelle version
  
  // Vérification si une mise à jour est disponible
  function checkForUpdates() {
    // Récupérer la dernière version depuis le serveur (simulation)
    fetch('./version.json')
      .then(response => {
        // Si le fichier n'existe pas ou erreur réseau, on ignore silencieusement
        if (!response.ok) return { version: APP_VERSION };
        return response.json();
      })
      .then(data => {
        const storedVersion = localStorage.getItem('app_version') || APP_VERSION;
        
        // Si nouvelle version détectée
        if (data.version !== storedVersion) {
          console.log(`Mise à jour disponible: ${storedVersion} -> ${data.version}`);
          
          // Afficher notification de mise à jour
          showUpdateNotification(data.version);
          
          // Mettre à jour la version en cache
          localStorage.setItem('app_version', data.version);
          
          // Forcer un rechargement de la page après un court délai
          setTimeout(() => {
            // Effacer le cache de l'application
            if ('caches' in window) {
              caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                  if (cacheName.includes('memo-vmc')) {
                    caches.delete(cacheName)
                      .then(() => console.log(`Cache ${cacheName} supprimé`));
                  }
                });
              });
            }
            
            // Recharger la page
            window.location.reload(true);
          }, 3000);
        }
      })
      .catch(err => console.error('Erreur lors de la vérification des mises à jour:', err));
  }
  
  // Afficher une notification de mise à jour
  function showUpdateNotification(version) {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <p>Mise à jour vers la version ${version}...</p>
      <div class="spinner"></div>
    `;
    document.body.appendChild(notification);
  }
  
  // Vérifier périodiquement les mises à jour
  setTimeout(checkForUpdates, 2000); // Première vérification après 2 secondes
  setInterval(checkForUpdates, 60 * 60 * 1000); // Puis vérifier toutes les heures
  
  // Vérifier également lors de la reconnexion internet
  window.addEventListener('online', checkForUpdates);
});
