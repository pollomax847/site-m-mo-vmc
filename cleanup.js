/**
 * Script de nettoyage qui supprime les propriétés CSS problématiques
 * en runtime pour éliminer les erreurs de la console
 */
(function() {
  // Fonction qui supprime les propriétés CSS problématiques d'une feuille de style
  function cleanupStylesheet(stylesheet) {
    try {
      if (!stylesheet.cssRules) return; // Feuille de style externe non chargée ou cross-origin
      
      const problemRules = [
        '-webkit-text-size-adjust',
        '-moz-osx-font-smoothing',
        'font-smooth',
        'text-size-adjust'
      ];
      
      for (let i = 0; i < stylesheet.cssRules.length; i++) {
        const rule = stylesheet.cssRules[i];
        
        // Si c'est une règle de style
        if (rule.style) {
          problemRules.forEach(prop => {
            if (rule.style[prop]) {
              rule.style.removeProperty(prop);
            }
          });
        }
        
        // Si c'est une règle @media, nettoyer les règles internes
        if (rule.cssRules) {
          for (let j = 0; j < rule.cssRules.length; j++) {
            const innerRule = rule.cssRules[j];
            if (innerRule.style) {
              problemRules.forEach(prop => {
                if (innerRule.style[prop]) {
                  innerRule.style.removeProperty(prop);
                }
              });
            }
          }
        }
      }
    } catch (e) {
      // Ignorer les erreurs de CORS
      if (!e.message.includes('cross-origin')) {
        console.debug('Erreur lors du nettoyage CSS:', e);
      }
    }
  }

  // Nettoyer toutes les feuilles de style après chargement complet
  window.addEventListener('load', function() {
    try {
      // Laisser un peu de temps aux feuilles de style pour se charger
      setTimeout(() => {
        for (let i = 0; i < document.styleSheets.length; i++) {
          cleanupStylesheet(document.styleSheets[i]);
        }
      }, 500);
    } catch (e) {
      console.debug('Erreur lors du nettoyage CSS:', e);
    }
  });
})();
