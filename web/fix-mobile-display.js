/**
 * Correctifs pour l'affichage mobile
 */

(function() {
  // Attendre que le document soit complètement chargé
  function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
    
    // En cas de problème, réessayer au chargement complet
    window.addEventListener("load", fn);
  }
  
  docReady(function() {
    // Attendre encore un peu pour s'assurer que tout est chargé
    setTimeout(function() {
      if (!document.body) {
        console.error("document.body n'est pas disponible");
        return;
      }
      
      checkMobileMenu();
      fixMobileDisplay();
    }, 300);
  });
  
  function checkMobileMenu() {
    if (!document.body) return;
    
    if (window.innerWidth <= 768) {
      // Vérifier si le bouton de menu existe
      const menuButton = document.querySelector('.menu-button');
      if (!menuButton) {
        console.log("Initialisation du menu mobile...");
        
        // Si le fichier mobile-menu.js est déjà chargé
        if (typeof window.initMobileMenu === 'function') {
          window.initMobileMenu();
        }
      }
    }
  }
  
  function fixMobileDisplay() {
    if (!document.body) return;
    
    // Ajouter une classe pour les styles spécifiques mobile
    if (window.innerWidth <= 768) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
    
    // Corriger les problèmes de mise en page mobile
    fixMobileLayout();
  }
  
  function fixMobileLayout() {
    // Ajuster la hauteur des zones de défilement
    const scrollContainers = document.querySelectorAll('.scroll-container');
    scrollContainers.forEach(container => {
      container.style.maxHeight = (window.innerHeight - 150) + 'px';
    });
    
    // S'assurer que les boutons sont suffisamment grands pour les appareils tactiles
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
      if (window.innerWidth <= 768) {
        button.style.minHeight = '44px';
      }
    });
  }
  
  // Exécuter également lors du redimensionnement
  window.addEventListener('resize', function() {
    checkMobileMenu();
    fixMobileDisplay();
  });
})();