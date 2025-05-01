/**
 * Module menu mobile pour accéder facilement aux sections FAQ, Méthodologie et Dépannage
 */

(function() {
  // S'assurer que le script s'exécute après le chargement complet du document
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initMobileMenu, 300);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initMobileMenu, 300);
    });
  }
  
  // Ajouter également un événement au chargement de la fenêtre pour plus de sécurité
  window.addEventListener('load', function() {
    if (!document.querySelector('.menu-button')) {
      setTimeout(initMobileMenu, 500);
    }
  });
  
  function initMobileMenu() {
    // Attendre que le body soit disponible
    if (!document.body) {
      console.log('Body non disponible, nouvel essai dans 200ms');
      setTimeout(initMobileMenu, 200);
      return;
    }

    // Vérifier si le menu existe déjà pour éviter les doublons
    if (document.querySelector('.menu-button')) {
      console.log('Menu mobile déjà initialisé');
      return;
    }
    
    console.log('Initialisation du menu mobile...');
    
    // Créer les éléments du menu
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.setAttribute('aria-label', 'Menu principal');
    menuButton.innerHTML = '<span class="menu-icon">≡</span>';
    
    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.setAttribute('aria-hidden', 'true');
    
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    
    // Structure du menu
    sideMenu.innerHTML = `
      <div class="side-menu-header">
        <h3>Menu VMC</h3>
      </div>
      <nav>
        <ul>
          <li><a href="#" data-section="accueil">Accueil</a></li>
          <li><a href="#" data-section="verification-debit">Vérification des Débits</a></li>
          <li><a href="#" data-section="faq">FAQ VMC</a></li>
          <li><a href="#" data-section="methodologie">Méthodologie d'Installation</a></li>
          <li><a href="#" data-section="depannage">Guide de Dépannage</a></li>
          <li><a href="#" data-section="info">Informations Techniques</a></li>
          <li><a href="#" data-section="cgu">Conditions d'utilisation</a></li>
        </ul>
      </nav>
    `;
    
    // Ajouter un style inline critique pour s'assurer que le bouton est visible immédiatement
    menuButton.style.position = 'fixed';
    menuButton.style.top = '15px';
    menuButton.style.left = '15px';
    menuButton.style.width = '50px';
    menuButton.style.height = '50px';
    menuButton.style.backgroundColor = '#2196F3';
    menuButton.style.color = 'white';
    menuButton.style.borderRadius = '50%';
    menuButton.style.border = 'none';
    menuButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    menuButton.style.zIndex = '10000';
    menuButton.style.display = 'flex';
    menuButton.style.alignItems = 'center';
    menuButton.style.justifyContent = 'center';
    menuButton.style.cursor = 'pointer';
    menuButton.style.fontSize = '30px';
    
    // Insérer les éléments dans le DOM
    try {
      if (document.body.firstChild) {
        document.body.insertBefore(menuOverlay, document.body.firstChild);
        document.body.insertBefore(sideMenu, document.body.firstChild);
        document.body.insertBefore(menuButton, document.body.firstChild);
      } else {
        document.body.appendChild(menuButton);
        document.body.appendChild(sideMenu);
        document.body.appendChild(menuOverlay);
      }
      
      console.log('Menu mobile ajouté au DOM');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du menu mobile:', error);
    }
    
    // Fonctionnalité d'ouverture/fermeture
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    
    menuOverlay.addEventListener('click', closeMenu);
    
    // Ajouter des gestionnaires d'événements pour les liens de navigation
    const menuLinks = sideMenu.querySelectorAll('nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        
        // Si la fonction de chargement de contenu existe, l'utiliser
        if (typeof loadContent === 'function') {
          loadContent(section);
        } else {
          // Fallback au cas où loadContent n'existe pas
          console.log('Chargement de section:', section);
          const event = new CustomEvent('sectionRequest', { detail: { section: section } });
          document.dispatchEvent(event);
        }
        
        // Fermer le menu après sélection
        closeMenu();
      });
    });
    
    // Fermer le menu quand l'orientation change (rotation d'écran)
    window.addEventListener('orientationchange', closeMenu);
  }
  
  function toggleMenu() {
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuButton && sideMenu && menuOverlay) {
      menuButton.classList.toggle('open');
      sideMenu.classList.toggle('open');
      menuOverlay.classList.toggle('open');
      
      // Empêcher le défilement du body quand le menu est ouvert
      document.body.style.overflow = sideMenu.classList.contains('open') ? 'hidden' : '';
    }
  }
  
  function closeMenu() {
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuButton && sideMenu && menuOverlay) {
      menuButton.classList.remove('open');
      sideMenu.classList.remove('open');
      menuOverlay.classList.remove('open');
      
      // Réactiver le défilement
      document.body.style.overflow = '';
    }
  }
})();
