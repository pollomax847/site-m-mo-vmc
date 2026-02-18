// Constantes et configurations partagées pour le module VMC
// Source: valeurs indicatives — remplacer par références normatives réelles si nécessaire
(function() {
  window.VMC_CONSTANTS = window.VMC_CONSTANTS || {};

  window.VMC_CONSTANTS.HOUSING_TYPE_CONFIG = window.VMC_CONSTANTS.HOUSING_TYPE_CONFIG || {
    'T1': { windowsMin: 1, windowsMax: 3, defaultWindows: 2 },
    'T2': { windowsMin: 2, windowsMax: 4, defaultWindows: 3 },
    'T3': { windowsMin: 3, windowsMax: 6, defaultWindows: 4 },
    'T4': { windowsMin: 4, windowsMax: 8, defaultWindows: 6 },
    'T5+': { windowsMin: 5, windowsMax: 10, defaultWindows: 8 }
  };

  window.VMC_CONSTANTS.STANDARD_FLOW_RATES = window.VMC_CONSTANTS.STANDARD_FLOW_RATES || {
    'cuisine': 45,
    'salleDeBain': 30,
    'wc': 15,
    'chambre': 15,
    'salon': 30,
    'fenetre': {
      'petite': 10,
      'moyenne': 20,
      'grande': 30,
      'baie': 45
    }
  };

  // Indiquer la source / date pour maintenance
  window.VMC_CONSTANTS.__meta = { source: 'project-default', date: new Date().toISOString() };
})();
