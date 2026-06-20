/**
 * Module d'intégration des fenêtres avec le système VMC
 * Ce module permet de synchroniser le nombre de fenêtres avec le type de logement
 * et de comparer les débits d'air entre les fenêtres et les bouches VMC
 */

// Configuration des types de logement et du nombre de fenêtres recommandé
const HOUSING_TYPE_CONFIG = {
  'T1': { windowsMin: 1, windowsMax: 3, defaultWindows: 2 },
  'T2': { windowsMin: 2, windowsMax: 4, defaultWindows: 3 },
  'T3': { windowsMin: 3, windowsMax: 6, defaultWindows: 4 },
  'T4': { windowsMin: 4, windowsMax: 8, defaultWindows: 6 },
  'T5+': { windowsMin: 5, windowsMax: 10, defaultWindows: 8 }
};

// Débits standards par type de pièce (en m³/h)
const STANDARD_FLOW_RATES = {
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

class WindowsVMCIntegration {
  constructor() {
    this.housingType = '';
    this.windows = [];
    this.vmcMeasurements = [];
    this.totalWindowsFlowRate = 0;
    this.totalVMCFlowRate = 0;
    this.autoSync = true;
  }

  /**
   * Détecte automatiquement le type de logement en fonction des pièces déclarées
   * @param {Array} rooms - Liste des pièces du logement
   * @returns {String} Type de logement détecté (T1, T2, T3...)
   */
  detectHousingType(rooms) {
    // Compter le nombre de chambres
    const bedroomCount = rooms.filter(room => room.type === 'chambre').length;
    
    // T1 = 0 chambre, T2 = 1 chambre, etc.
    const type = bedroomCount === 0 ? 'T1' : `T${bedroomCount + 1}`;
    
    // Si plus de 5 chambres, on retourne T5+
    return bedroomCount >= 4 ? 'T5+' : type;
  }

  /**
   * Met à jour le nombre de fenêtres en fonction du type de logement
   * @param {String} housingType - Type de logement (T1, T2, etc.)
   */
  updateWindowsCount(housingType) {
    if (!HOUSING_TYPE_CONFIG[housingType]) {
      console.error(`Type de logement non reconnu: ${housingType}`);
      return;
    }
    
    this.housingType = housingType;
    const config = HOUSING_TYPE_CONFIG[housingType];
    
    // Ajuster le nombre de fenêtres au nombre recommandé
    if (this.windows.length < config.defaultWindows) {
      // Ajouter des fenêtres si nécessaire
      const windowsToAdd = config.defaultWindows - this.windows.length;
      for (let i = 0; i < windowsToAdd; i++) {
        this.addDefaultWindow();
      }
    }
  }

  /**
   * Ajoute une fenêtre par défaut
   */
  addDefaultWindow() {
    this.windows.push({
      id: `window_${Date.now()}_${this.windows.length}`,
      type: 'moyenne',
      position: 'centre',
      height: 120,
      width: 80,
      flowRate: STANDARD_FLOW_RATES.fenetre.moyenne,
      isOpen: false
    });
  }

  /**
   * Calcule le débit d'air total des fenêtres (en m³/h)
   * @param {Array} windows - Liste des fenêtres
   * @param {Boolean} onlyOpen - Si true, ne calcule que les fenêtres ouvertes
   * @returns {Number} Débit d'air total en m³/h
   */
  calculateWindowsFlowRate(windows = this.windows, onlyOpen = true) {
    let totalFlowRate = 0;
    
    windows.forEach(window => {
      if (!onlyOpen || window.isOpen) {
        totalFlowRate += window.flowRate;
      }
    });
    
    this.totalWindowsFlowRate = totalFlowRate;
    return totalFlowRate;
  }

  /**
   * Calcule le débit d'air total des bouches VMC
   * @param {Array} measurements - Liste des mesures VMC
   * @returns {Number} Débit d'air total en m³/h
   */
  calculateVMCFlowRate(measurements = this.vmcMeasurements) {
    let totalFlowRate = 0;
    
    measurements.forEach(measurement => {
      if (measurement.value && !isNaN(measurement.value)) {
        totalFlowRate += parseFloat(measurement.value);
      }
    });
    
    this.totalVMCFlowRate = totalFlowRate;
    return totalFlowRate;
  }

  /**
   * Compare les débits des fenêtres et des bouches VMC
   * @returns {Object} Résultat de la comparaison avec recommandations
   */
  compareFlowRates() {
    const windowsFlow = this.calculateWindowsFlowRate();
    const vmcFlow = this.calculateVMCFlowRate();
    
    const difference = windowsFlow - vmcFlow;
    const percentDifference = (difference / vmcFlow) * 100;
    
    let status, message, recommendation;
    
    if (Math.abs(percentDifference) <= 10) {
      status = 'success';
      message = 'Équilibre correct entre les fenêtres et la VMC';
      recommendation = 'Aucune action nécessaire';
    } else if (percentDifference > 10) {
      status = 'warning';
      message = 'Le débit des fenêtres est supérieur à celui de la VMC';
      recommendation = 'Envisagez de fermer certaines fenêtres ou d\'augmenter le débit de la VMC';
    } else {
      status = 'error';
      message = 'Le débit des fenêtres est inférieur à celui de la VMC';
      recommendation = 'Envisagez d\'ouvrir plus de fenêtres ou de réduire le débit de la VMC';
    }
    
    return {
      windowsFlow,
      vmcFlow,
      difference,
      percentDifference,
      status,
      message,
      recommendation
    };
  }

  /**
   * Synchronise automatiquement les données entre les fenêtres et la VMC
   * @param {Array} vmcMeasurements - Nouvelles mesures VMC
   */
  syncWithVMC(vmcMeasurements) {
    if (!this.autoSync) return;
    
    this.vmcMeasurements = vmcMeasurements;
    
    // Détecter le type de logement à partir des pièces
    const rooms = vmcMeasurements.map(m => ({
      type: m.roomType,
      name: m.roomName
    }));
    
    const detectedType = this.detectHousingType(rooms);
    
    // Mettre à jour le type de logement et le nombre de fenêtres
    if (this.housingType !== detectedType) {
      this.updateWindowsCount(detectedType);
    }
    
    // Recalculer les débits
    this.calculateWindowsFlowRate();
    this.calculateVMCFlowRate();
    
    // Retourner les résultats de la comparaison
    return this.compareFlowRates();
  }
}

// Exporter la classe pour utilisation dans l'application
window.WindowsVMCIntegration = WindowsVMCIntegration;

// Créer une instance par défaut
window.windowsVMCModule = new WindowsVMCIntegration();

// Écouter les événements de mesure VMC pour mise à jour automatique
document.addEventListener('vmc-measurements-updated', function(event) {
  if (window.windowsVMCModule && event.detail && event.detail.measurements) {
    const result = window.windowsVMCModule.syncWithVMC(event.detail.measurements);
    
    // Dispatcher un événement avec les résultats de la comparaison
    document.dispatchEvent(new CustomEvent('windows-vmc-comparison', {
      detail: { result }
    }));
  }
});

console.log('Module d\'intégration VMC et fenêtres chargé');
