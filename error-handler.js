/**
 * Gestionnaire d'erreurs robuste pour l'application
 * Intercepte et gère les erreurs de manière élégante
 */
(function() {
  // Options de configuration
  const options = {
    showDebugPanel: false,       // Afficher le panneau de débogage
    logErrors: true,             // Enregistrer les erreurs dans la console
    catchJSErrors: true,         // Intercepter les erreurs JavaScript
    catchDOMErrors: true,        // Essayer de réparer les erreurs DOM
    placeholderTimeout: 1000,    // Délai après lequel réessayer les opérations DOM
  };
  
  // Compteurs pour le suivi des erreurs
  let stats = {
    jsErrors: 0,
    domErrors: 0,
    cssErrors: 0,
    fixedErrors: 0,
    placeHolders: 0
  };
  
  // Créer le panneau de débogage
  let debugPanel;
  
  function createDebugPanel() {
    if (debugPanel) return;
    
    debugPanel = document.createElement('div');
    debugPanel.className = 'dev-debug-panel' + (options.showDebugPanel ? '' : ' hidden');
    debugPanel.innerHTML = `
      <h3>Débogage</h3>
      <div>JS Errors: <span class="error-count">0</span></div>
      <div>DOM Errors: <span class="error-count">0</span></div>
      <div>CSS Errors: <span class="error-count">0</span></div>
      <div>Fixed: <span class="placeholder-count">0</span></div>
      <div>Placeholders: <span class="placeholder-count">0</span></div>
      <button id="toggle-debug">Toggle Panel</button>
    `;
    document.body.appendChild(debugPanel);
    
    document.getElementById('toggle-debug').addEventListener('click', () => {
      options.showDebugPanel = !options.showDebugPanel;
      debugPanel.classList.toggle('hidden');
    });
  }
  
  // Mettre à jour le panneau de débogage
  function updateDebugPanel() {
    if (!debugPanel) return;
    
    const errorCounters = debugPanel.querySelectorAll('.error-count');
    errorCounters[0].textContent = stats.jsErrors;
    errorCounters[1].textContent = stats.domErrors;
    errorCounters[2].textContent = stats.cssErrors;
    
    const placeholderCounters = debugPanel.querySelectorAll('.placeholder-count');
    placeholderCounters[0].textContent = stats.fixedErrors;
    placeholderCounters[1].textContent = stats.placeHolders;
  }
  
  // Intercepter les erreurs JavaScript
  if (options.catchJSErrors) {
    window.addEventListener('error', function(event) {
      stats.jsErrors++;
      
      if (event.error && event.error.message.includes('querySelector')) {
        stats.domErrors++;
        // Erreur liée au DOM, potentiellement réparable
        
        const errorStack = event.error.stack || '';
        if (errorStack.includes('.window-item') || 
            errorStack.includes('.air-inlet') || 
            errorStack.includes('.window-')) {
          
          const containerEl = document.querySelector('.windows-container');
          if (containerEl) {
            // Reconstruire les éléments de fenêtre si possible
            setTimeout(function() {
              try {
                if (typeof initWindowsModule === 'function') {
                  const existingItems = document.querySelectorAll('.window-item');
                  if (existingItems.length === 0) {
                    initWindowsModule();
                    stats.fixedErrors++;
                    updateDebugPanel();
                  }
                }
              } catch(e) {
                // Ignore les erreurs de reconstruction
              }
            }, options.placeholderTimeout);
          }
        }
      } else if (event.error && event.error.message.includes('CSS')) {
        stats.cssErrors++;
      }
      
      if (options.logErrors) {
        console.warn('[Error Handler] Intercepted error:', event.message);
      }
      
      updateDebugPanel();
    });
  }
  
  // Observer les modifications du DOM pour détecter les problèmes
  if (options.catchDOMErrors) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Vérifier si des éléments problématiques ont été ajoutés
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Élément DOM
              if (node.classList && node.classList.contains('window-item')) {
                // Vérifier que les éléments requis sont présents
                const requiredSelectors = [
                  '.air-inlet-module', 
                  '.window-state', 
                  '.progress-fill',
                  '.air-flow-value'
                ];
                
                let allValid = true;
                requiredSelectors.forEach(selector => {
                  if (!node.querySelector(selector)) {
                    allValid = false;
                    console.warn(`Élément ${selector} manquant dans .window-item`);
                  }
                });
                
                if (!allValid) {
                  // Supprimer et recréer l'élément si nécessaire
                  try {
                    node.parentNode.removeChild(node);
                    stats.domErrors++;
                    updateDebugPanel();
                    
                    setTimeout(() => {
                      if (typeof addWindowWithAirInlet === 'function') {
                        addWindowWithAirInlet();
                        stats.fixedErrors++;
                        updateDebugPanel();
                      }
                    }, 100);
                  } catch(e) {
                    // Ignorer l'erreur de suppression/recréation
                  }
                }
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true 
    });
  }
  
  // Initialisation au chargement de la page
  window.addEventListener('DOMContentLoaded', function() {
    createDebugPanel();
    updateDebugPanel();
  });
  
  // Exposer une API publique
  window.ErrorHandler = {
    reportError: function(type, message) {
      if (type === 'js') stats.jsErrors++;
      else if (type === 'dom') stats.domErrors++;
      else if (type === 'css') stats.cssErrors++;
      
      updateDebugPanel();
      if (options.logErrors) {
        console.warn(`[Error Handler] Reported ${type} error:`, message);
      }
    },
    
    reportFix: function() {
      stats.fixedErrors++;
      updateDebugPanel();
    },
    
    reportPlaceholder: function() {
      stats.placeHolders++;
      updateDebugPanel();
    },
    
    showPanel: function() {
      options.showDebugPanel = true;
      if (debugPanel) debugPanel.classList.remove('hidden');
    }
  };
})();
