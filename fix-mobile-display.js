// Script de correction pour les problèmes d'affichage mobile

document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si nous sommes sur un appareil mobile
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
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
      const content = document.getElementById('content');
      if (content && (!content.children.length || content.innerHTML.trim() === '')) {
        console.log('Contenu vide détecté, tentative de récupération...');
        
        // Forcer le chargement du contenu par défaut si le contenu est vide
        if (window.vmcContent && window.vmcContent['verification-debit']) {
          content.innerHTML = window.vmcContent['verification-debit'].content;
          
          // Initialiser l'outil de vérification si présent
          if (typeof initVerificationDebit === 'function') {
            setTimeout(initVerificationDebit, 100);
          } else {
            // Tentative de déclenchement d'événement pour initialiser le contenu
            document.dispatchEvent(new CustomEvent('contentLoaded', { 
              detail: { section: 'verification-debit' } 
            }));
          }
        } else {
          // Message d'erreur si le contenu est introuvable
          content.innerHTML = `
            <div class="section-container">
              <h2 class="section-title">Problème de chargement</h2>
              <p>Le contenu n'a pas pu être chargé correctement. Essayez de recharger la page.</p>
              <button onclick="window.location.reload()" class="btn btn-primary">Recharger la page</button>
            </div>
          `;
        }
      }
    }
    
    // Vérifier après un court délai pour laisser le temps au contenu de se charger normalement
    setTimeout(checkContent, 1000);
    
    // Correction pour les problèmes de défilement
    function fixScrolling() {
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
  }
});
