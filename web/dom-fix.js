/**
 * Correctifs pour les éléments DOM manquants
 * Crée les éléments dès que possible pour éviter les erreurs
 */
(function() {
  // S'exécute le plus tôt possible
  const createRequiredElements = () => {
    // Liste complète des éléments que des scripts pourraient rechercher
    const elementsToCreate = [
      'menuToggle', 
      'offline-status', 
      'searchButton', 
      'searchInput',
      'mainMenu', 
      'content',
      'btnAjouterAeration',
      'btnAjouterPiece',
      'typeLogement',
      'typeVMC',
      'diametre',
      'mesures-container',
      'resultats',
      'reference-table-container',
      'diametre-container',
      'valueToConvert',
      'fromUnit',
      'toUnit',
      'diametreConversion',
      'btnConvert',
      'conversionResult',
      'diametre-conversion-container'
    ];
    
    // Créer tous les éléments requis s'ils n'existent pas
    elementsToCreate.forEach(id => {
      if (!document.getElementById(id)) {
        const element = document.createElement('div');
        element.id = id;
        element.classList.add('dom-fix');
        element.style.display = 'none';
        element.dataset.info = 'Élément créé par dom-fix.js';
        document.body.appendChild(element);
      }
    });
    
    // Créer les éléments pour la structure de la VMC si elle n'existe pas
    if (!document.querySelector('.calculator-container')) {
      const container = document.createElement('div');
      container.className = 'calculator-container dom-fix';
      container.style.display = 'none';
      document.body.appendChild(container);
    }
    
    // Créer un mock des données de débit pour éviter l'erreur
    if (!window.debitData) {
      window.debitData = {
        'simple-flux': {
          'T1': {
            'cuisine': { min: 45, max: 45 },
            'salle-de-bain': { min: 15, max: 15 },
            'wc': { min: 15, max: 15 }
          },
          'T2': {
            'cuisine': { min: 45, max: 45 },
            'salle-de-bain': { min: 15, max: 15 },
            'wc': { min: 15, max: 15 }
          }
        }
      };
    }
  };
  
  // Exécuter dès que le DOM est disponible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createRequiredElements);
  } else {
    createRequiredElements();
  }
  
  // Mettre en place une surveillance DOM pour résoudre les problèmes futurs
  if ('MutationObserver' in window) {
    const observer = new MutationObserver((_mutations) => {
      // Re-vérifier les éléments critiques périodiquement
      setTimeout(createRequiredElements, 200);
    });
    
    // Observer seulement les ajouts d'éléments
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true 
    });
  }
})();
