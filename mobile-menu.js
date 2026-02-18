/**
 * Module pour la gestion du menu mobile
 */
(function() {
  const DEBUG = !!window.DEBUG;
  const dlog = (...args) => { if (DEBUG) console.debug(...args); };
  dlog('Initialisation du menu mobile');

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
    // Supprimer tout menu mobile existant pour éviter les doublons
    document.querySelectorAll('.menu-button, .side-menu, .menu-overlay').forEach(el => el.remove());

    // Créer les éléments du menu
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.setAttribute('type', 'button');
    menuButton.setAttribute('aria-label', 'Menu principal');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'sideMenu');
    menuButton.innerHTML = '<span class="menu-icon">≡</span>';

    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.setAttribute('aria-hidden', 'true');
    sideMenu.setAttribute('role', 'navigation');
    sideMenu.setAttribute('aria-label', 'Menu principal');
    sideMenu.setAttribute('tabindex', '-1');

    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';

    // Structure du menu
    sideMenu.innerHTML = `
      <div class="side-menu-header">
        <h3>Menu VMC</h3>
      </div>
      <nav>
        <ul>
          <li><a href="web/index.html">Accueil</a></li>
          <li><a href="web/simple-flux.html">VMC Simple Flux</a></li>
          <li><a href="web/double-flux.html">VMC Double Flux</a></li>
          <li><a href="web/calculateur.html">Calculateur de débits</a></li>
        </ul>
        <hr style="margin:16px 0;opacity:0.2;">
        <ul>
          <li><a href="#" data-section="verification-debit">Vérification des Débits (app)</a></li>
          <li><a href="#" data-section="faq">FAQ VMC</a></li>
          <li><a href="#" data-section="methodologie">Méthodologie d'Installation</a></li>
          <li><a href="#" data-section="depannage">Guide de Dépannage</a></li>
          <li><a href="#" data-section="dsc-constructeurs">DSC par constructeur</a></li>
          <li><a href="#" data-section="info">Informations Techniques</a></li>
          <li><a href="#" data-section="cgu">Conditions d'utilisation</a></li>
        </ul>
      </nav>
    `;

    // Styles inline essentiels
    menuButton.style.cssText = 'position:fixed;top:18px;left:18px;width:54px;height:54px;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:white;border-radius:50%;border:none;box-shadow:0 4px 16px rgba(37,99,235,0.10);z-index:9999;display:flex;align-items:center;justify-content:center;font-size:32px;cursor:pointer;transition:background 0.18s,box-shadow 0.18s,transform 0.18s;outline:none;';
    sideMenu.style.cssText = 'position:fixed;top:0;left:0;width:85%;max-width:320px;height:100%;background:#fff;z-index:998;transform:translateX(-100%);transition:transform 0.22s cubic-bezier(.4,0,.2,1);box-shadow:4px 0 24px rgba(37,99,235,0.10);overflow-y:auto;padding:60px 0 20px;border-top-right-radius:18px;border-bottom-right-radius:18px;';
    menuOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(37,99,235,0.10);z-index:997;display:none;backdrop-filter:blur(1.5px);';

    // Focus visible style
    menuButton.addEventListener('focus', function(){menuButton.style.boxShadow='0 0 0 4px rgba(245,158,66,0.18)';});
    menuButton.addEventListener('blur', function(){menuButton.style.boxShadow='0 4px 16px rgba(37,99,235,0.10)';});
    menuButton.addEventListener('mousedown', function(){menuButton.style.transform='scale(0.97)';});
    menuButton.addEventListener('mouseup', function(){menuButton.style.transform='scale(1)';});
    menuButton.addEventListener('mouseleave', function(){menuButton.style.transform='scale(1)';});

    // Ajouter au DOM
    document.body.appendChild(menuButton);
    document.body.appendChild(sideMenu);
    document.body.appendChild(menuOverlay);

    dlog('Éléments du menu ajoutés au DOM');

    // Attacher les événements (fusionné ici)
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });
    menuOverlay.addEventListener('click', function() { closeMenu(); });
    // Liens internes (SPA/app)
    const menuLinks = sideMenu.querySelectorAll('a[data-section]');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const section = this.getAttribute('data-section');
        if (window.loadContent) window.loadContent(section);
        else document.dispatchEvent(new CustomEvent('sectionRequest', { detail: { section } }));
        closeMenu();
      });
    });
    // Liens vers pages web (navigation réelle)
    const pageLinks = sideMenu.querySelectorAll('a[href^="web/"]');
    pageLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // navigation réelle, pas d'e.preventDefault
        closeMenu();
      });
    });
    // Focus trap
    function getFocusable(root) {
      return Array.from(root.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled && el.getAttribute('aria-hidden') !== 'true');
    }
    function onKeyDown(e) {
      if (e.key === 'Escape' || e.key === 'Esc') { closeMenu(); return; }
      if (e.key === 'Tab' && sideMenu.classList.contains('open')) {
        const focusable = getFocusable(sideMenu);
        if (!focusable.length) { e.preventDefault(); return; }
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    function openMenu() {
      sideMenu.style.transform = 'translateX(0)';
      sideMenu.classList.add('open');
      sideMenu.setAttribute('aria-hidden', 'false');
      menuOverlay.style.display = 'block';
      menuButton.setAttribute('aria-expanded', 'true');
      setTimeout(()=>{sideMenu.style.boxShadow='8px 0 32px rgba(37,99,235,0.13)';},120);
      const firstLink = sideMenu.querySelector('a[data-section]');
      if (firstLink) firstLink.focus();
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeyDown);
    }
    function closeMenu() {
      sideMenu.style.transform = 'translateX(-100%)';
      sideMenu.classList.remove('open');
      sideMenu.setAttribute('aria-hidden', 'true');
      menuOverlay.style.display = 'none';
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
      setTimeout(()=>{sideMenu.style.boxShadow='4px 0 24px rgba(37,99,235,0.10)';},120);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    }
    // Exposer pour tests si besoin
    menuButton.openMenu = openMenu;
    menuButton.closeMenu = closeMenu;
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

    // Toggle menu au clic sur le bouton (gestion ARIA + focus)
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fermer le menu au clic sur l'overlay
    menuOverlay.addEventListener('click', function() { closeMenu(); });

    // Attacher des événements aux liens du menu
    const menuLinks = sideMenu.querySelectorAll('a[data-section]');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const section = this.getAttribute('data-section');
        if (window.DEBUG) console.debug('Menu mobile: clic sur section:', section);
        
        if (typeof window.loadContent === 'function') {
          window.loadContent(section);
        } else {
          const event = new CustomEvent('sectionRequest', { detail: { section: section } });
          document.dispatchEvent(event);
        }
        
        // Fermer le menu après sélection
        closeMenu();
      });
    });

    // Exposer pour tests si besoin
    menuButton.openMenu = openMenu;
    menuButton.closeMenu = closeMenu;

    dlog('Événements du menu attachés');
  }

  // Exposer la fonction toggleMenu globalement
  window.toggleMenu = function() {
    const sideMenu = document.querySelector('.side-menu');
    if (!sideMenu) return;
    const isOpen = sideMenu.classList.contains('open') || sideMenu.style.transform === 'translateX(0px)';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /* Focus trap: empêche le tabbing hors du menu quand il est ouvert */
  function trapFocus(container) {
    if (!container) return;
    const focusable = container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    function handleTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    container._trapFocusHandler = handleTab;
    document.addEventListener('keydown', handleTab);
  }

  function releaseFocus(container) {
    if (container && container._trapFocusHandler) {
      document.removeEventListener('keydown', container._trapFocusHandler);
      delete container._trapFocusHandler;
    }
  }

  function openMenu() {
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuButton = document.querySelector('.menu-button');
    if (sideMenu && menuOverlay) {
      sideMenu.style.transform = 'translateX(0)';
      sideMenu.classList.add('open');
      sideMenu.setAttribute('aria-hidden', 'false');
      menuOverlay.style.display = 'block';
      if (menuButton) menuButton.setAttribute('aria-expanded', 'true');
      const firstLink = sideMenu.querySelector('a[data-section]');
      if (firstLink) {
        firstLink.focus();
        trapFocus(sideMenu);
      }
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onMenuKeyDown);
    }
  }

  function onMenuKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeMenu();
    }
  }

  function closeMenu() {
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuButton = document.querySelector('.menu-button');
    if (sideMenu && menuOverlay) {
      releaseFocus(sideMenu);
      sideMenu.style.transform = 'translateX(-100%)';
      sideMenu.classList.remove('open');
      sideMenu.setAttribute('aria-hidden', 'true');
      menuOverlay.style.display = 'none';
      if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onMenuKeyDown);
    }
  }

})();
