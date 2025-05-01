// Script de correction pour les problèmes d'affichage mobile

document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si nous sommes sur un appareil mobile
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('Appareil mobile détecté, application des correctifs d\'affichage...');
    
    // Correction pour iOS Safari et problème de viewport
    function fixIOSHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Assurer que le contenu est visible
      const content = document.getElementById('content');
      if (content) {
        content.style.minHeight = `${window.innerHeight * 0.7}px`;
        content.style.transform = 'translateZ(0)';
        content.style.willChange = 'transform';
      }
    }
    
    // Exécuter immédiatement et lors du redimensionnement
    fixIOSHeight();
    window.addEventListener('resize', fixIOSHeight);
    window.addEventListener('orientationchange', function() {
      // Petit délai pour laisser le temps au navigateur de s'ajuster
      setTimeout(fixIOSHeight, 100);
    });
    
    // Correction pour le contenu non affiché
    function checkContent() {
      // Vérifier si le contenu est chargé correctement
      const content = document.getElementById('content');
      if (content && content.offsetHeight === 0) {
        content.style.display = 'block';
        content.style.transform = 'translateZ(0)';
        content.style.willChange = 'transform';
      }
    }
    
    // Vérifier après un court délai pour laisser le temps au contenu de se charger normalement
    setTimeout(checkContent, 1000);
    
    // Correction pour les problèmes de défilement
    function fixScrolling() {
      // Correctif amélioré pour permettre le défilement complet sur Android
      if (isAndroid) {
        console.log('Correctifs spécifiques pour Android appliqués');
        
        // S'assurer que le body et html peuvent défiler correctement
        document.documentElement.style.height = 'auto';
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'visible';
        document.body.style.transform = 'translateZ(0)';
        document.body.style.willChange = 'transform';
        
        // Corriger le problème de défilement dans les calculateurs
        const calculators = document.querySelectorAll('.calculator-container');
        calculators.forEach(calc => {
          calc.style.maxHeight = 'none';
          calc.style.overflowY = 'visible';
          calc.style.transform = 'translateZ(0)';
          calc.style.willChange = 'transform';
        });
        
        // Corriger la hauteur pour la vérification des débits
        const fixVerificationDebitScroll = () => {
          const resultContainer = document.getElementById('resultats');
          const referenceContainer = document.getElementById('reference-table-container');
          
          if (resultContainer) {
            resultContainer.style.maxHeight = 'none';
            resultContainer.style.transform = 'translateZ(0)';
            resultContainer.style.willChange = 'transform';
          }
          
          if (referenceContainer) {
            referenceContainer.style.maxHeight = 'none';
            referenceContainer.style.overflowX = 'auto';
            referenceContainer.style.overflowY = 'visible';
            referenceContainer.style.transform = 'translateZ(0)';
            referenceContainer.style.willChange = 'transform';
          }
        };
        
        // Exécuter la correction après le chargement complet
        setTimeout(fixVerificationDebitScroll, 500);
        
        // Réexécuter après un changement de vue
        document.addEventListener('contentLoaded', function() {
          setTimeout(fixVerificationDebitScroll, 500);
        });
      }
      
      // Assurer un défilement fluide pour tous les appareils mobiles
      document.body.addEventListener('touchmove', function(e) {
        // Permettre le défilement normal
      }, { passive: true });
    }
    
    fixScrolling();
    
    // Assurer que le menu mobile se ferme correctement après sélection
    document.querySelectorAll('#mainMenu a').forEach(link => {
      link.addEventListener('click', function() {
        const menu = document.getElementById('mainMenu');
        if (menu) menu.classList.remove('active');
      });
    });
    
    // Ajouter un gestionnaire d'événements pour corriger le scroll après chargement du contenu
    document.addEventListener('contentLoaded', function() {
      setTimeout(fixScrolling, 300);
    });

    // Vérifier que le menu mobile s'affiche correctement
    function checkMobileMenu() {
      if (window.innerWidth <= 768) {
        // Vérifier si le bouton de menu existe
        const menuButton = document.querySelector('.menu-button');
        if (!menuButton) {
          console.log("Initialisation du menu mobile...");
          if (typeof initMobileMenu === 'function') {
            initMobileMenu();
          } else {
            // Si la fonction n'est pas disponible, charger le script
            const script = document.createElement('script');
            script.src = 'mobile-menu.js';
            document.head.appendChild(script);
          }
        } else {
          // S'assurer que le bouton est visible et au bon endroit
          menuButton.style.display = 'block';
          menuButton.style.position = 'fixed';
          menuButton.style.top = '15px';
          menuButton.style.left = '15px';
          menuButton.style.zIndex = '10000';
        }
      }
    }

    // Exécuter après un court délai pour s'assurer que la page est chargée
    setTimeout(checkMobileMenu, 1000);

    // Vérifier à nouveau lors du redimensionnement
    window.addEventListener('resize', checkMobileMenu);
  }
});