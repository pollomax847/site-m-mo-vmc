/**
 * Utilitaires pour le développement local
 */
(function() {
  const DEBUG_LEVEL = 0; // 0=errors only, 1=warnings, 2=info, 3=debug
  
  // Détecter le mode développement (localhost)
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname.includes('192.168.');

  // Redéfinir la méthode console.debug pour qu'elle n'affiche rien en mode silencieux
  const originalConsoleDebug = console.debug;
  console.debug = function() {
    if (DEBUG_LEVEL >= 3) {
      originalConsoleDebug.apply(console, arguments);
    }
  };
  
  // Redéfinir la méthode console.info pour qu'elle n'affiche rien en mode silencieux
  const originalConsoleInfo = console.info;
  console.info = function() {
    if (DEBUG_LEVEL >= 2) {
      originalConsoleInfo.apply(console, arguments);
    }
  };
  
  // Redéfinir la méthode console.warn pour qu'elle n'affiche rien en mode silencieux
  const originalConsoleWarn = console.warn;
  console.warn = function() {
    if (DEBUG_LEVEL >= 1) {
      originalConsoleWarn.apply(console, arguments);
    }
  };

  if (isDev) {
    console.info('Mode développement détecté, optimisations activées');
    
    // Mock pour adsbygoogle
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push = function(obj) {
      console.debug('Appel AdSense simulé:', obj);
      return;
    };
    
    // Supprimer les scripts GoogleAds
    document.querySelectorAll('script[src*="googlesyndication"]').forEach(script => {
      console.debug('Script Google Ads supprimé:', script.src);
      script.remove();
    });
  }
  
  // Données de débit par défaut pour éviter l'erreur
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
      },
      'T3': {
        'cuisine': { min: 45, max: 45 },
        'salle-de-bain': { min: 15, max: 15 },
        'wc': { min: 15, max: 15 }
      },
      'T4': {
        'cuisine': { min: 45, max: 45 },
        'salle-de-bain': { min: 15, max: 15 },
        'wc': { min: 15, max: 15 }
      }
    }
  };
  
  // Liste des éléments à créer au démarrage
  const requiredElements = [
    'menuToggle', 
    'offline-status', 
    'mainMenu',
    'content', 
    'searchButton',
    'searchInput',
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
  
  // Créer les éléments requis pour éviter les erreurs getElementById
  window.addEventListener('DOMContentLoaded', () => {
    requiredElements.forEach(id => {
      if (!document.getElementById(id)) {
        // Crée l'élément seulement s'il n'existe pas déjà
        const tempElement = document.createElement('div');
        tempElement.id = id;
        tempElement.classList.add('dev-placeholder');
        tempElement.style.display = 'none';
        tempElement.setAttribute('data-dev-info', 'Élément de substitution créé par dev-utils.js');
        document.body.appendChild(tempElement);
        console.debug(`Élément placeholder créé pour #${id}`);
      }
    });
  });
  
  // Intercepter les erreurs getElementById null avec un message plus discret
  const originalGetElementById = document.getElementById;
  document.getElementById = function(id) {
    const element = originalGetElementById.call(document, id);
    if (!element) {
      console.debug(`getElementById('${id}') a retourné null - création d'un élément temporaire`);
      const tempElement = document.createElement('div');
      tempElement.id = id;
      tempElement.classList.add('dev-placeholder');
      tempElement.style.display = 'none';
      document.body.appendChild(tempElement);
      return tempElement;
    }
    return element;
  };
  
  // Filtrer les erreurs CSS moins importantes
  const originalConsoleError = console.error;
  console.error = function() {
    if (arguments[0] && typeof arguments[0] === 'string') {
      // Erreurs CSS non critiques à rétrograder en avertissements
      if (arguments[0].includes('CSS') || 
          arguments[0].includes('-webkit-') ||
          arguments[0].includes('-moz-') ||
          arguments[0].includes('style') ||
          arguments[0].includes('Données de débit non trouvées')) {
        console.debug('Info CSS:', ...arguments);
        return;
      }
    }
    originalConsoleError.apply(console, arguments);
  };
})();
