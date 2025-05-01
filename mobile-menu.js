/**
 * Module menu mobile pour accéder facilement aux sections FAQ, Méthodologie et Dépannage
 * Version corrigée pour assurer le fonctionnement du bouton
 */

// S'exécute immédiatement et expose les fonctions nécessaires globalement
(function(global) {
  // Attendre que le document soit chargé
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // Si le DOM est déjà prêt
    setTimeout(init, 1);
  }
  
  // Aussi essayer lors du chargement complet de la page
  window.addEventListener('load', ensureMenuExists);
  
  // Variables pour référencer les éléments du menu
  let menuButton, sideMenu, menuOverlay;
  
  function init() {
    console.log("Initialisation du menu mobile");
    ensureMenuExists();
    setupEventListeners();
  }
  
  function ensureMenuExists() {
    // Vérifier si les éléments du menu existent déjà
    menuButton = document.querySelector('.menu-button');
    sideMenu = document.querySelector('.side-menu');
    menuOverlay = document.querySelector('.menu-overlay');
    
    // Créer les éléments manquants
    if (!menuButton) {
      createMenuButton();
    }
    
    if (!sideMenu) {
      createSideMenu();
    }
    
    if (!menuOverlay) {
      createMenuOverlay();
    }
    
    setupEventListeners();
  }
  
  function createMenuButton() {
    menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.setAttribute('aria-label', 'Menu principal');
    menuButton.innerHTML = '<span class="menu-icon">≡</span>';
    
    // Styles critiques en inline pour s'assurer du bon affichage
    menuButton.style.position = 'fixed';
    menuButton.style.top = '15px';
    menuButton.style.left = '15px';
    menuButton.style.width = '50px';
    menuButton.style.height = '50px';
    menuButton.style.backgroundColor = '#2196F3';
    menuButton.style.color = 'white';
    menuButton.style.borderRadius = '50%';
    menuButton.style.border = 'none';
    menuButton.style.zIndex = '2147483647';
    menuButton.style.display = 'flex';
    menuButton.style.alignItems = 'center';
    menuButton.style.justifyContent = 'center';
    menuButton.style.fontSize = '30px';
    menuButton.style.cursor = 'pointer';
    
    document.body.appendChild(menuButton);
  }
  
  function createSideMenu() {
    sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.setAttribute('aria-hidden', 'true');
    
    // Styles critiques
    sideMenu.style.position = 'fixed';
    sideMenu.style.top = '0';
    sideMenu.style.left = '0';
    sideMenu.style.width = '85%';
    sideMenu.style.maxWidth = '300px';
    sideMenu.style.height = '100%';
    sideMenu.style.backgroundColor = 'white';
    sideMenu.style.boxShadow = '2px 0 10px rgba(0,0,0,0.3)';
    sideMenu.style.zIndex = '2147483646';
    sideMenu.style.transform = 'translateX(-100%)';
    sideMenu.style.transition = 'transform 0.3s ease';
    sideMenu.style.overflowY = 'auto';
    sideMenu.style.padding = '60px 0 20px';
    
    // Structure du menu
    sideMenu.innerHTML = `
      <div class="side-menu-header" style="padding:0 20px 15px;margin-bottom:15px;border-bottom:1px solid #e1e1e1;">
        <h3 style="margin:0;color:#2196F3;font-size:20px;">Menu VMC</h3>
      </div>
      <nav>
        <ul style="list-style:none;padding:0 15px;margin:0;">
          <li style="margin-bottom:10px;"><a href="#" data-section="accueil" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Accueil</a></li>
          <li style="margin-bottom:10px;"><a href="#" data-section="verification-debit" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Vérification des Débits</a></li>
          <li style="margin-bottom:10px;"><a href="#" data-section="faq" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">FAQ VMC</a></li>
          <li style="margin-bottom:10px;"><a href="#" data-section="methodologie" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Méthodologie d'Installation</a></li>
          <li style="margin-bottom:10px;"><a href="#" data-section="depannage" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Guide de Dépannage</a></li>
          <li style="margin-bottom:10px;"><a href="#" data-section="info" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Informations Techniques</a></li>
          <li style="margin-bottom:10px;"><a href="#" data-section="cgu" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Conditions d'utilisation</a></li>
        </ul>
      </nav>
    `;
    
    document.body.appendChild(sideMenu);
  }
  
  function createMenuOverlay() {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    
    // Styles critiques
    menuOverlay.style.position = 'fixed';
    menuOverlay.style.top = '0';
    menuOverlay.style.left = '0';
    menuOverlay.style.width = '100%';
    menuOverlay.style.height = '100%';
    menuOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    menuOverlay.style.zIndex = '2147483645';
    menuOverlay.style.display = 'none';
    
    document.body.appendChild(menuOverlay);
  }
  
  function setupEventListeners() {
    // S'assurer que les éléments existent
    if (!menuButton || !sideMenu || !menuOverlay) return;
    
    // Supprimer les anciens écouteurs pour éviter les doublons
    const newMenuButton = menuButton.cloneNode(true);
    menuButton.parentNode.replaceChild(newMenuButton, menuButton);
    menuButton = newMenuButton;
    
    const newMenuOverlay = menuOverlay.cloneNode(true);
    menuOverlay.parentNode.replaceChild(newMenuOverlay, menuOverlay);
    menuOverlay = newMenuOverlay;
    
    // Ajouter les nouveaux écouteurs
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    
    menuOverlay.addEventListener('click', closeMenu);
    
    // Configurer les liens du menu
    const menuLinks = sideMenu.querySelectorAll('nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        
        // Si la fonction de chargement existe
        if (typeof loadContent === 'function') {
          loadContent(section);
        } else {
          // Fallback
          console.log('Chargement de section:', section);
          const event = new CustomEvent('sectionRequest', { 
            detail: { section: section } 
          });
          document.dispatchEvent(event);
        }
        
        // Fermer le menu
        closeMenu();
      });
    });
  }
  
  // Fonction pour ouvrir/fermer le menu - exposée globalement
  function toggleMenu() {
    console.log("Toggle menu appelé");
    
    // S'assurer que les éléments existent
    if (!menuButton || !sideMenu || !menuOverlay) {
      console.error("Éléments du menu non disponibles");
      ensureMenuExists();
      return;
    }
    
    const isOpen = sideMenu.classList.contains('open');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  function openMenu() {
    menuButton.classList.add('open');
    sideMenu.classList.add('open');
    sideMenu.style.transform = 'translateX(0)';
    menuOverlay.style.display = 'block';
    
    // Empêcher le défilement
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    menuButton.classList.remove('open');
    sideMenu.classList.remove('open');
    sideMenu.style.transform = 'translateX(-100%)';
    menuOverlay.style.display = 'none';
    
    // Réactiver le défilement
    document.body.style.overflow = '';
  }
  
  // Exposer les fonctions nécessaires globalement
  global.toggleMenu = toggleMenu;
  global.openMenu = openMenu;
  global.closeMenu = closeMenu;
  global.initMobileMenu = init;
  
})(typeof window !== 'undefined' ? window : this);
