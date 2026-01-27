import { overrideGetElementById } from './js/utils.js';
import { vmcContent } from './js/vmc-content.js';
import { loadContent, initNavigation } from './js/navigation.js';
import { initSearch } from './js/search.js';
import './js/theme-manager.js';
import './js/seo-manager.js';
import './js/analytics.js';

document.addEventListener('DOMContentLoaded', function() {
  // Surcharger getElementById pour éviter les erreurs null
  overrideGetElementById();

  // Exposer le contenu globalement pour compatibilité
  window.vmcContent = vmcContent;
  window.loadContent = loadContent;

  // Initialiser la navigation
  initNavigation();

  // Initialiser la recherche
  initSearch();

  // Gestion de l'état en ligne/hors ligne
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Vérification initiale de l'état de connexion
  updateOnlineStatus();

  // Gestion des accordéons dans la section dépannage
  function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.classList.contains('active')) {
          content.classList.remove('active');
        } else {
          content.classList.add('active');
        }
      });
    });
  }

  // Fonction pour mettre à jour l'état de connexion
  function updateOnlineStatus() {
    const statusIndicator = document.getElementById('onlineStatus');
    if (statusIndicator) {
      if (navigator.onLine) {
        statusIndicator.textContent = 'En ligne';
        statusIndicator.className = 'online';
      } else {
        statusIndicator.textContent = 'Hors ligne';
        statusIndicator.className = 'offline';
      }
    }
  }

  // Initialiser les accordéons quand le contenu est chargé
  document.addEventListener('contentLoaded', function(e) {
    if (e.detail.section === 'depannage') {
      setupAccordion();
    }
  });
});
