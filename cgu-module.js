/**
 * Module pour les conditions générales d'utilisation
 * Version améliorée pour éviter les conflits
 */

// Utiliser un IIFE avec une vérification de fenêtre pour éviter les conflits
(function(global) {
  // Vérifier si on peut accéder au contexte global
  if (!global) return;
  
  // Attendre que le DOM soit complètement chargé
  function whenDocumentReady(callback) {
    if (document.readyState !== 'loading') {
      setTimeout(callback, 1);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
    // Fallback si DOMContentLoaded ne se déclenche jamais
    global.addEventListener('load', callback);
  }
  
  // Fonction principale
  whenDocumentReady(function() {
    console.log('Initialisation du module CGU');
    
    // S'assurer que le namespace existe
    if (typeof global.vmcContent === 'undefined') {
      global.vmcContent = {};
    }

    // Définir le contenu seulement s'il n'existe pas déjà
    if (!global.vmcContent['cgu']) {
      global.vmcContent['cgu'] = {
        title: 'Conditions Générales d\'Utilisation',
        content: `
          <!-- Contenu des CGU -->
          <div class="cgu-container">
            <h2>Conditions Générales d'Utilisation</h2>
            <p>Bienvenue sur notre site. En utilisant ce site, vous acceptez les conditions générales d'utilisation suivantes :</p>
            <ul>
              <li>Le contenu du site est fourni à titre informatif uniquement.</li>
              <li>Nous nous réservons le droit de modifier ces conditions à tout moment.</li>
              <li>Vous êtes responsable de l'utilisation que vous faites des informations fournies.</li>
            </ul>
            <p>Merci de votre compréhension.</p>
          </div>
        `
      };
    }
    
    // Écouter les événements de chargement de contenu
    document.addEventListener('contentLoaded', function(event) {
      if (event && event.detail && event.detail.section === 'cgu') {
        console.log('Initialisation de la section CGU');
        // Initialisation spécifique ici si nécessaire
      }
    });

    // Ajouter un gestionnaire pour le bouton latéral
    const sideButton = document.querySelector('.side-button');
    if (sideButton) {
      sideButton.addEventListener('click', function() {
        console.log('Bouton latéral cliqué');
        // Logique supplémentaire pour le bouton latéral ici
      });
    }
    
    console.log('Module CGU prêt');
  });
})(typeof window !== 'undefined' ? window : null);