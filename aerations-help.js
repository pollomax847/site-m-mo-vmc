/**
 * Module d'aide pour les aérations de fenêtres
 */

(function() {
  // Fonction d'initialisation au chargement du DOM
  function initAerationsHelp() {
    // Lorsque la page est prête, chercher la section VMC
    document.addEventListener('DOMContentLoaded', function() {
      // Recherche périodique jusqu'à ce que l'élément soit trouvé
      const checkForElement = setInterval(function() {
        const windowsSection = document.querySelector('.windows-vmc-integration');
        if (windowsSection) {
          clearInterval(checkForElement);
          addHelpSection(windowsSection);
        }
      }, 500); // Vérifier toutes les 500ms
      
      // Arrêter la recherche après 10 secondes
      setTimeout(function() {
        clearInterval(checkForElement);
      }, 10000);
    });
    
    // Également vérifier au chargement du contenu
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail && event.detail.section === 'verification-debit') {
        setTimeout(function() {
          const windowsSection = document.querySelector('.windows-vmc-integration');
          if (windowsSection) {
            addHelpSection(windowsSection);
          }
        }, 500);
      }
    });
  }
  
  // Fonction pour ajouter la section d'aide
  function addHelpSection(container) {
    // Vérifier si la section existe déjà
    if (document.querySelector('.aerations-help-section')) return;
    
    // Créer l'élément
    const helpSection = document.createElement('div');
    helpSection.className = 'aerations-help-section';
    
    helpSection.innerHTML = `
      <h4>Guide des entrées d'air pour VMC</h4>
      <div class="aerations-help-content">
        <p>Les entrées d'air sont essentielles dans un système VMC : elles permettent l'admission contrôlée d'air frais dans les pièces principales, tandis que l'air vicié est extrait dans les pièces humides.</p>
        
        <div class="tip-container">
          <div class="tip">
            <strong>💡 Important :</strong> L'équilibre entre entrées d'air et extraction garantit une ventilation efficace et évite les problèmes d'humidité.
          </div>
        </div>
        
        <div id="aerations-details" class="aerations-details">
          <h5>Types d'entrées d'air</h5>
          <ul>
            <li><strong>Autoréglables</strong> : Débit constant quelle que soit la pression extérieure</li>
            <li><strong>Hygroréglables</strong> : Débit variable selon l'humidité ambiante</li>
          </ul>
          
          <h5>Emplacement et nombre</h5>
          <ul>
            <li>Dans les menuiseries ou coffres de volets roulants des pièces principales uniquement (séjour, chambres)</li>
            <li>T1: entrée d'air dans le séjour (45 m³/h minimum au total)</li>
            <li>T2: entrées dans le séjour et la chambre (60-90 m³/h au total)</li>
            <li>T3 et plus: une entrée par pièce principale (15-45 m³/h par entrée selon la pièce)</li>
          </ul>
          
          <h5>Entretien</h5>
          <ul>
            <li>Nettoyer les entrées d'air 2-3 fois par an avec un chiffon humide</li>
            <li>Vérifier qu'elles ne sont pas obstruées par des meubles ou rideaux</li>
          </ul>
        </div>
        
        <button type="button" class="aerations-help-toggle" id="aerationsHelpToggle">Voir les détails</button>
      </div>
    `;
    
    // Insérer au début de la section
    container.insertBefore(helpSection, container.firstChild);
    
    // Ajouter l'événement au bouton
    const toggleButton = document.getElementById('aerationsHelpToggle');
    const detailsSection = document.getElementById('aerations-details');
    
    if (toggleButton && detailsSection) {
      toggleButton.addEventListener('click', function() {
        const isVisible = detailsSection.style.display === 'block';
        
        detailsSection.style.display = isVisible ? 'none' : 'block';
        toggleButton.textContent = isVisible ? 'Voir les détails' : 'Masquer les détails';
      });
    }
  }
  
  // Démarrer l'initialisation
  initAerationsHelp();
})();
