// Script de correction pour les problèmes d'affichage mobile

document.addEventListener('DOMContentLoaded', function() {
  // Détection avancée des appareils
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  // Ajouter une classe au body pour cibler spécifiquement les appareils
  if (isAndroid) {
    document.body.classList.add('android');
  } else if (isIOS) {
    document.body.classList.add('ios');
  }
  
  if (isMobile) {
    console.log('Appareil mobile détecté, application des correctifs d\'affichage améliorés...');
    
    // Forcer l'affichage complet
    function forceFullDisplay() {
      // Réinitialiser les hauteurs et le défilement
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'scroll';
      document.documentElement.style.height = 'auto';
      
      // S'assurer que le contenu est visible
      const content = document.getElementById('content');
      if (content) {
        content.style.height = 'auto';
        content.style.maxHeight = 'none';
        content.style.overflow = 'visible';
      }
      
      // Corriger spécifiquement la page de vérification des débits
      const calculators = document.querySelectorAll('.calculator-container');
      calculators.forEach(calc => {
        calc.style.maxHeight = 'none';
        calc.style.overflow = 'visible';
        calc.style.paddingBottom = '100px';
      });
      
      // Assurer que tous les conteneurs de résultats sont visibles
      const resultContainers = [
        document.getElementById('resultats'),
        document.getElementById('reference-table-container'),
        document.getElementById('mesures-container')
      ];
      
      resultContainers.forEach(container => {
        if (container) {
          container.style.maxHeight = 'none';
          container.style.overflow = 'visible';
          container.style.height = 'auto';
        }
      });
      
      // Forcer la visibilité des tables
      const tables = document.querySelectorAll('table, .technical-table, .results-table');
      tables.forEach(table => {
        table.style.display = 'block';
        table.style.overflowX = 'auto';
        table.style.width = '100%';
        table.style.marginBottom = '20px';
      });
      
      // Ajouter un espace en bas de page pour Android
      if (isAndroid) {
        const sections = document.querySelectorAll('.section-container');
        if (sections.length) {
          const lastSection = sections[sections.length - 1];
          lastSection.style.paddingBottom = '150px';
          lastSection.style.marginBottom = '150px';
        }
      }
    }
    
    // Exécuter immédiatement et après un délai pour s'assurer que tout est chargé
    forceFullDisplay();
    setTimeout(forceFullDisplay, 500);
    setTimeout(forceFullDisplay, 1500);
    
    // Réexécuter lors du redimensionnement ou changement d'orientation
    window.addEventListener('resize', forceFullDisplay);
    window.addEventListener('orientationchange', function() {
      setTimeout(forceFullDisplay, 300);
    });
    
    // Corriger après chargement de contenu dynamique
    document.addEventListener('contentLoaded', function() {
      setTimeout(forceFullDisplay, 300);
    });
    
    // Ajouter un bouton flottant pour remonter en haut (aide pour mobile)
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollTopButton';
    scrollButton.innerHTML = '↑';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '20px';
    scrollButton.style.right = '20px';
    scrollButton.style.zIndex = '9999';
    scrollButton.style.width = '50px';
    scrollButton.style.height = '50px';
    scrollButton.style.borderRadius = '50%';
    scrollButton.style.background = '#3498db';
    scrollButton.style.color = 'white';
    scrollButton.style.border = 'none';
    scrollButton.style.fontSize = '24px';
    
    scrollButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollButton);
    
    // Afficher/masquer le bouton de retour en haut en fonction du défilement
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
    });
    
    // Après tout chargement de page, s'assurer qu'on peut défiler
    window.addEventListener('load', function() {
      setTimeout(forceFullDisplay, 1000);
    });
  }
});
