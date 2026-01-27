import { vmcContent } from './vmc-content.js';

// Fonction pour charger le contenu
export function loadContent(section = 'verification-debit') {
  // Vérifier si la section existe avant de l'afficher
  if (!vmcContent[section]) {
    console.error(`Section "${section}" non trouvée dans le contenu disponible`);
    section = 'verification-debit';  // Section par défaut
  }
  
  // Nettoyer le contenu précédent
  const contentDiv = document.getElementById('content');
  if (contentDiv) {
    contentDiv.innerHTML = vmcContent[section].content;
  }
  
  // Mettre à jour le lien actif dans le menu
  document.querySelectorAll('#mainMenu a').forEach(menuLink => {
    menuLink.classList.remove('active');
    if (menuLink.getAttribute('href') === '#' + section) {
      menuLink.classList.add('active');
    }
  });

  // Déclencher un événement pour indiquer que le contenu a été chargé
  document.dispatchEvent(new CustomEvent('contentLoaded', { detail: { section } }));
}

// Initialisation de la navigation
export function initNavigation() {
  // Attendre que la page soit complètement chargée
  window.addEventListener('load', function() {
    setTimeout(function() {
      loadContent('verification-debit');
    }, 200);
  });

  // Navigation
  document.querySelectorAll('#mainMenu a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('href').substring(1);
      loadContent(section);
      
      // Si on est en mode mobile, fermer le menu après la sélection
      if (window.innerWidth <= 768) {
        document.getElementById('mainMenu').classList.remove('active');
      }
    });
  });

  // Toggle menu mobile
  document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('mainMenu').classList.toggle('active');
  });
}