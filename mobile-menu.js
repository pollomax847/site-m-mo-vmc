/**
 * Module pour la gestion du menu mobile
 */
(function() {
  console.log('Initialisation du menu mobile');

  // Fonction pour s'assurer que le document est prêt
  function whenReady(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(callback, 1);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
    window.addEventListener('load', callback);
  }

  // Initialisation du menu
  whenReady(function() {
    initMobileMenu();
  });

  function initMobileMenu() {
    // Vérifier si le menu existe déjà
    if (document.querySelector('.menu-button')) {
      attachMenuEvents();
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
          <li><a href="#" data-section="dsc-constructeurs">DSC par constructeur</a></li>
          <li><a href="#" data-section="info">Informations Techniques</a></li>
          <li><a href="#" data-section="cgu">Conditions d'utilisation</a></li>
        </ul>
      </nav>
    `;

    // Ajouter des styles inline importants pour garantir la visibilité
    menuButton.style.cssText = 'position:fixed;top:15px;left:15px;width:50px;height:50px;background:#2196F3;color:white;border-radius:50%;border:none;box-shadow:0 2px 5px rgba(0,0,0,0.3);z-index:9999;display:flex;align-items:center;justify-content:center;font-size:30px;cursor:pointer;';
    sideMenu.style.cssText = 'position:fixed;top:0;left:0;width:85%;max-width:300px;height:100%;background:white;z-index:998;transform:translateX(-100%);transition:transform 0.3s ease;box-shadow:2px 0 10px rgba(0,0,0,0.3);overflow-y:auto;padding:60px 0 20px;';
    menuOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:997;display:none;';

    // Ajouter au DOM
    document.body.appendChild(menuButton);
    document.body.appendChild(sideMenu);
    document.body.appendChild(menuOverlay);

    console.log('Éléments du menu ajoutés au DOM');
    
    // Attacher les événements
    attachMenuEvents();
    
    // Signaler que le menu mobile est créé
    document.dispatchEvent(new CustomEvent('mobileMenuCreated'));
  }

  function attachMenuEvents() {
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (!menuButton || !sideMenu || !menuOverlay) {
      console.error('Éléments du menu introuvables, impossible d\'attacher les événements');
      return;
    }

    // Toggle menu au clic sur le bouton
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Fermer le menu au clic sur l'overlay
    menuOverlay.addEventListener('click', closeMenu);

    // Attacher des événements aux liens du menu
    const menuLinks = sideMenu.querySelectorAll('a[data-section]');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const section = this.getAttribute('data-section');
        console.log('Menu mobile: clic sur section:', section);
        
        // Utiliser loadContent si disponible
        if (typeof window.loadContent === 'function') {
          window.loadContent(section);
        } else {
          // Fallback: créer un événement pour demander le chargement
          const event = new CustomEvent('sectionRequest', { 
            detail: { section: section } 
          });
          document.dispatchEvent(event);
        }
        
        // Fermer le menu après sélection
        closeMenu();
      });
    });

    console.log('Événements du menu attachés');
  }

  // Exposer la fonction toggleMenu globalement
  window.toggleMenu = function() {
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (sideMenu.style.transform === 'translateX(0px)') {
      closeMenu();
    } else {
      sideMenu.style.transform = 'translateX(0)';
      menuOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };

  function closeMenu() {
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (sideMenu && menuOverlay) {
      sideMenu.style.transform = 'translateX(-100%)';
      menuOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

})();
