/**
 * Module d'intégration des fenêtres avec le système VMC
 * Ce module permet de synchroniser le nombre de fenêtres avec le type de logement
 * et de comparer les débits d'air entre les fenêtres et les bouches VMC
 */

// Configuration et constantes (sources: règles internes, à vérifier selon norme locale)
const HOUSING_TYPE_CONFIG = (window.VMC_CONSTANTS && window.VMC_CONSTANTS.HOUSING_TYPE_CONFIG) || {
  'T1': { windowsMin: 1, windowsMax: 3, defaultWindows: 2 },
  'T2': { windowsMin: 2, windowsMax: 4, defaultWindows: 3 },
  'T3': { windowsMin: 3, windowsMax: 6, defaultWindows: 4 },
  'T4': { windowsMin: 4, windowsMax: 8, defaultWindows: 6 },
  'T5+': { windowsMin: 5, windowsMax: 10, defaultWindows: 8 }
};

const STANDARD_FLOW_RATES = (window.VMC_CONSTANTS && window.VMC_CONSTANTS.STANDARD_FLOW_RATES) || {
  // valeurs indicatives (m³/h). Préférer mesures réelles.
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
    // Option: override detection with explicit housingType
    this.explicitHousingType = null;
  }

  /**
   * Détecte automatiquement le type de logement en fonction des pièces déclarées
   * @param {Array} rooms - Liste des pièces du logement
   * @returns {String} Type de logement détecté (T1, T2, T3...)
   */
  detectHousingType(rooms) {
    // Permettre override explicite
    if (this.explicitHousingType) return this.explicitHousingType;

    // Tentative de détection plus réaliste: compter pièces principales (séjour + chambres)
    const bedroomCount = rooms.filter(room => room.type === 'chambre').length;
    const sejourCount = rooms.filter(room => room.type === 'sejour' || room.type === 'salon').length;
    const mainRooms = bedroomCount + sejourCount;

    // Si on a peu d'infos, retomber sur ancien comportement
    if (typeof mainRooms !== 'number' || mainRooms === 0) {
      return bedroomCount >= 4 ? 'T5+' : (bedroomCount === 0 ? 'T1' : `T${bedroomCount + 1}`);
    }

    // Mappe le nombre de pièces principales à un type T
    if (mainRooms <= 1) return 'T1';
    if (mainRooms === 2) return 'T2';
    if (mainRooms === 3) return 'T3';
    if (mainRooms === 4) return 'T4';
    return 'T5+';
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
    // Ajuster le nombre de fenêtres au nombre recommandé (clamp entre min/max)
    if (this.windows.length < config.defaultWindows) {
      const windowsToAdd = config.defaultWindows - this.windows.length;
      for (let i = 0; i < windowsToAdd; i++) this.addDefaultWindow();
    } else if (this.windows.length > config.windowsMax) {
      // Supprimer les fenêtres en trop (dernier entré supprimé)
      this.windows.splice(config.windowsMax);
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
        // Si un débit n'est pas fourni, estimer à partir de surface ouvrante (approx.)
        let fr = parseFloat(window.flowRate);
        if (isNaN(fr) || fr <= 0) {
          // estimer: aire (m2) * coefficient (~25 m3/h par m2 d'ouverture en conditions calmes)
          const areaM2 = ((window.width || 0) / 100) * ((window.height || 0) / 100);
          fr = areaM2 > 0 ? areaM2 * 25 : 0;
        }
        totalFlowRate += fr;
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
      if (measurement && measurement.value !== undefined && measurement.value !== null) {
        let v = parseFloat(measurement.value);
        if (isNaN(v)) return;

        // Normaliser unités si fournies (supporter l/s -> m3/h)
        const unit = (measurement.unit || '').toLowerCase();
        if (unit === 'l/s' || unit === 'ls') {
          v = v * 3.6; // 1 l/s = 3.6 m3/h
        }
        // Supposer m3/h par défaut
        totalFlowRate += v;
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
    const percentDifference = vmcFlow === 0 ? NaN : (difference / vmcFlow) * 100;
    
    let status, message, recommendation;
    if (vmcFlow === 0) {
      status = 'critical';
      message = 'Aucune mesure VMC valide — contrôle urgent requis';
      recommendation = 'Vérifier les mesures VMC, l’alimentation et la sonde. Intervenir en priorité.';
    } else if (Math.abs(percentDifference) <= 10) {
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
    const rooms = (vmcMeasurements || []).map(m => ({
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
