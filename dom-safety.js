/**
 * Script de sécurité DOM pour éviter les erreurs document.body is null
 * Doit être chargé avant tous les autres scripts
 */

(function() {
  console.log('Initialisation des protections DOM...');
  
  // Créer une fonction qui vérifie la disponibilité du document.body
  function ensureBody() {
    if (!document.body) {
      console.warn('document.body n\'est pas encore disponible, création d\'une protection');
      
      // Sauvegarder la méthode originale getElementById
      const originalGetElementById = document.getElementById;
      
      // Remplacer getElementById par une version sécurisée
      document.getElementById = function(id) {
        try {
          const element = originalGetElementById.call(document, id);
          if (element) return element;
          
          console.warn(`Élément #${id} non trouvé, création d'un élément temporaire`);
          const tempElement = document.createElement('div');
          tempElement.id = id;
          tempElement.style.display = 'none';
          tempElement.setAttribute('data-temp', 'true');
          
          // Ajouter au document.head en attendant que body soit disponible
          if (document.head) document.head.appendChild(tempElement);
          return tempElement;
        } catch (e) {
          console.error('Erreur dans getElementById sécurisé:', e);
          const tempElement = document.createElement('div');
          tempElement.id = id || 'temp-element';
          return tempElement;
        }
      };
      
      // Vérifier périodiquement si body est disponible
      const bodyCheckInterval = setInterval(function() {
        if (document.body) {
          clearInterval(bodyCheckInterval);
          console.log('document.body est maintenant disponible');
          
          // Déplacer les éléments temporaires vers le body
          const tempElements = document.querySelectorAll('[data-temp="true"]');
          tempElements.forEach(el => {
            if (el.parentElement === document.head) {
              document.body.appendChild(el);
            }
          });
        }
      }, 10); // Vérifier fréquemment
    }
  }
  
  // Exécuter immédiatement
  ensureBody();
  
  // Vérifier encore après DOMContentLoaded au cas où
  document.addEventListener('DOMContentLoaded', ensureBody);
  
  // Dernière vérification après load
  window.addEventListener('load', ensureBody);
  
  // Exposer une méthode globale pour accéder au body en toute sécurité
  window.getBodySafely = function() {
    return document.body || document.documentElement;
  };
})();
