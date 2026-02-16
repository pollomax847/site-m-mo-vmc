// Données structurées pour les modèles DSC (indicatif)
// Object exposé: window.vmcDSCModels
(function() {
  window.vmcDSCModels = window.vmcDSCModels || {
    LEGRAND: {
      name: 'LEGRAND',
      models: ['BAES DSC VMC'],
      bornier: 'Format DIN rail, numéroté',
      contact: 'NO',
      power: '230V',
      notes: 'Vérifier référence exacte et manuel constructeur'
    },
    ALDES: {
      name: 'ALDES',
      models: ['DSC 1000', 'DSC 2000'],
      bornier: 'Bornier numéroté 1 à 6',
      contact: 'NF',
      power: '230V + transfo 24V',
      notes: 'Temporisation fixe 15s sur certains modèles; réarmement manuel possible'
    },
    ATLANTIC: {
      name: 'ATLANTIC',
      models: ['SSG'],
      bornier: 'Bornier fonctionnel (VMC, PS, EV)',
      contact: 'NO',
      power: '230V + transfo intégré/externe',
      notes: 'Temporisation au démarrage; vérifier version exacte'
    },
    NATHER: {
      name: 'NATHER',
      models: ['Vigitherm'],
      bornier: 'Bornier numéroté 1 à 8',
      contact: 'NF',
      power: '230V + tore intensité',
      notes: 'Double sécurité: intensité + pressostat; consulter manuel'
    }
  };
})();
