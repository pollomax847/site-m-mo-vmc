/**
 * Module menu mobile pour accéder facilement aux sections FAQ, Méthodologie et Dépannage
 */

(function() {
  // Attendre que le document soit chargé
  document.addEventListener('DOMContentLoaded', function() {
    // Attendre un peu pour s'assurer que les autres éléments sont chargés
    setTimeout(initMobileMenu, 300);
  });
  
  function initMobileMenu() {
    // Vérifier si le menu existe déjà pour éviter les doublons
    if (document.querySelector('.menu-button')) {
      return;
    }
    
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
    
    // S'assurer que le menu est inséré au début du body pour être bien positionné
    if (document.body.firstChild) {
      document.body.insertBefore(menuOverlay, document.body.firstChild);
      document.body.insertBefore(sideMenu, document.body.firstChild);
      document.body.insertBefore(menuButton, document.body.firstChild);
    } else {
      document.body.appendChild(menuButton);
      document.body.appendChild(sideMenu);
      document.body.appendChild(menuOverlay);
    }
    
    console.log('Menu mobile initialisé');
    
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
