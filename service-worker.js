const CACHE_NAME = 'memo-vmc-cache-v1';
const CACHE_VERSION = '1.0.1'; // Incrémenter cette valeur pour déclencher une mise à jour
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './verification-debit.js',
  './cgu.js',
  './logo.png',
  './logo-192.png',
  './logo-512.png',
  './manifest.json',
  './sw-register.js'
];

// Variables pour le suivi de la progression
let totalAssets = ASSETS.length;
let loadedAssets = 0;

// Installation du Service Worker avec suivi de la progression
self.addEventListener('install', event => {
  console.log('[Service Worker] Installation avec version:', CACHE_VERSION);
  self.skipWaiting(); // Force le nouveau SW à prendre le contrôle immédiatement
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Pour chaque ressource, nous effectuons un fetch et un cache.put
        const cachePromises = ASSETS.map(url => {
          return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              
              // Mettre en cache la ressource
              const cacheResponse = cache.put(url, response.clone());
              
              // Mettre à jour la progression
              loadedAssets++;
              const progress = Math.round((loadedAssets / totalAssets) * 100);
              
              // Envoyer une notification de progression aux clients
              self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                  client.postMessage({
                    type: 'DOWNLOAD_PROGRESS',
                    progress: progress
                  });
                });
              });
              
              return cacheResponse;
            })
            .catch(error => {
              console.error(`Cache error for ${url}: ${error.message}`);
            });
        });
        
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('Mise en cache terminée');
        // Notification de fin de téléchargement
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'DOWNLOAD_COMPLETE'
            });
          });
        });
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activation avec version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Service worker activé');
      return self.clients.claim(); // Prendre le contrôle de toutes les pages ouvertes
    })
  );
  
  // Notifier toutes les fenêtres clientes qu'une mise à jour a été activée
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'UPDATE_ACTIVATED',
        version: CACHE_VERSION
      });
    });
  });
});

// Interception des requêtes réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retourne la réponse du cache
        if (response) {
          return response;
        }
        
        // Clone de la requête
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          response => {
            // Vérification de la validité de la réponse
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone de la réponse
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        ).catch(() => {
          // Si la requête échoue (pas de réseau), essayer de servir la page offline
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Événement message pour communiquer avec les pages
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'GET_INSTALLATION_STATUS') {
    // Répond avec l'état d'installation actuel
    event.source.postMessage({
      type: 'INSTALLATION_STATUS',
      isInstalled: true,
      progress: Math.round((loadedAssets / totalAssets) * 100),
      version: CACHE_VERSION
    });
  }
  
  // Gestion des demandes de vérification de mise à jour
  if (event.data && event.data.action === 'CHECK_FOR_UPDATES') {
    console.log('[Service Worker] Vérification des mises à jour...');
    // Renvoie la version actuelle du service worker
    event.source.postMessage({
      type: 'CURRENT_VERSION',
      version: CACHE_VERSION
    });
    
    // Force l'update du service worker
    self.registration.update()
      .then(() => {
        console.log('[Service Worker] Mise à jour vérifiée');
      })
      .catch(err => {
        console.error('[Service Worker] Erreur lors de la vérification de mise à jour:', err);
      });
  }
  
  // Gestion des demandes de mise à jour immédiate
  if (event.data && event.data.action === 'FORCE_UPDATE') {
    console.log('[Service Worker] Mise à jour forcée demandée');
    self.skipWaiting().then(() => {
      console.log('[Service Worker] skipWaiting appliqué, les clients vont être rechargés');
    });
  }
});
