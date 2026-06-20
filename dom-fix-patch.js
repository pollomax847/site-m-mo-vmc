/**
 * Correctif pour les problèmes liés à document.body is null
 * Ce script doit être chargé AVANT tous les autres scripts
 */

(function() {
  console.log('Application du correctif DOM...');

  // Exécuter immédiatement pour protéger les accès au DOM
  const originalGetElementById = Document.prototype.getElementById;
  Document.prototype.getElementById = function(id) {
    try {
      const element = originalGetElementById.call(this, id);
      if (element) return element;
      
      // Si l'élément n'existe pas et qu'on n'a pas de body, créer un élément temporaire
      if (!document.body) {
        console.warn(`DOM Patch: body absent, élément temporaire créé pour #${id}`);
        const tempElement = document.createElement('div');
        tempElement.id = id;
        tempElement.style.display = 'none';
        tempElement.dataset.tempElement = 'true';
        
        // Ajouter à head si body n'est pas disponible
        if (document.head) {
          document.head.appendChild(tempElement);
        }
        return tempElement;
      }
      return null;
    } catch (e) {
      console.error('Erreur dans getElementById patché:', e);
      return null;
    }
  };

  // Déplacer les éléments temporaires vers le body une fois qu'il est disponible
  const checkBodyInterval = setInterval(function() {
    if (document.body) {
      clearInterval(checkBodyInterval);
      
      const tempElements = document.querySelectorAll('[data-temp-element="true"]');
      if (tempElements.length > 0) {
        console.log(`Déplacement de ${tempElements.length} éléments temporaires vers body`);
        tempElements.forEach(el => {
          if (el.parentElement === document.head) {
            document.body.appendChild(el);
          }
        });
      }
    }
  }, 50);
  
  // Sécurité supplémentaire : exposer une fonction sûre pour accéder au body
  window.safeGetBody = function() {
    return document.body || document.documentElement;
  };
})();
