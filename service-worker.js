// Service Worker pour l'application Mémo VMC

const CACHE_NAME = 'memo-vmc-cache-v3'; // Incrémenter la version du cache
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/style.min.css',
  '/script.js',
  '/script.min.js',
  '/logo.png',
  '/logo-192.png',
  '/logo-512.png',
  '/logo-192.webp',
  '/logo-512.webp',
  '/verification-debit.js',
  '/verification-debit.min.js',
  '/auto-update.js',
  '/auto-update.css',
  '/cgu.js',
  '/fix-mobile-display.js'
  // Ne pas mettre les ressources qui posent problème dans le cache initial
];

// Installation du service worker
self.addEventListener('install', function(event) {
  // Forcer l'activation immédiate sans attendre la fermeture des pages
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ouvert');
        // On utilise Promise.allSettled pour continuer même si certaines ressources échouent
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(error => 
              console.warn(`Échec de mise en cache pour ${url}:`, error)
            )
          )
        );
      })
  );
});

// Activation du service worker
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  
  // S'assurer que le service worker prend le contrôle immédiatement
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Suppression de l\'ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Interception des requêtes
self.addEventListener('fetch', function(event) {
  // Ne pas intercepter les requêtes WebSocket
  if (event.request.url.includes('/ws')) {
    return;
  }

  // Ignorer les requêtes publicitaires Google (pour éviter les erreurs CORS)
  if (event.request.url.includes('googlesyndication.com')) {
    return;
  }

  // Vérifier si la requête doit contourner le service worker
  if (event.request.url.includes('bypass-sw=true')) {
    return;
  }

  // Utiliser une stratégie network-first pour les ressources CSS problématiques
  if (event.request.url.includes('/styles/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Mettre en cache la réponse fraîchement récupérée
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Essayer depuis le cache en cas d'échec du réseau
          return caches.match(event.request);
        })
    );
    return;
  }

  // Pour les autres ressources, utiliser une stratégie cache-first
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Le cache a une réponse pour cette requête
        if (response) {
          return response;
        }
        
        // Cloner la requête
        const fetchRequest = event.request.clone();

        // Essayer de récupérer depuis le réseau
        return fetch(fetchRequest)
          .then(function(response) {
            // Vérifier si nous avons reçu une réponse valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse
            const responseToCache = response.clone();

            // Mettre en cache pour utilisation future
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(function(error) {
            console.error('Erreur fetch:', error);
            
            // Gérer les erreurs selon le type de ressource
            if (event.request.url.endsWith('.css')) {
              return new Response('/* Feuille de style de secours */', {
                headers: { 'Content-Type': 'text/css' }
              });
            }
            
            if (event.request.url.endsWith('.js')) {
              return new Response('console.log("Script de secours chargé");', {
                headers: { 'Content-Type': 'application/javascript' }
              });
            }
            
            if (event.request.url.endsWith('.png') || 
                event.request.url.endsWith('.jpg') || 
                event.request.url.endsWith('.jpeg')) {
              // Pour les images, retourner une image transparente
              return new Response('', {
                headers: { 'Content-Type': 'image/png' }
              });
            }
            
            // Fallback générique
            return new Response('Ressource non disponible', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
