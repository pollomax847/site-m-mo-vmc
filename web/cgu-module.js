/**
 * Module pour les conditions générales d'utilisation
 * Version révisée pour éviter les conflits de variables
 */

(function() {
  // Définir le contenu dans le namespace vmcContent
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  // Utiliser l'espace de noms au lieu de déclarer une constante globale
  window.vmcContent.cgu = {
    title: 'Conditions Générales d\'Utilisation',
    content: `
      <div class="section-container">
        <h2 class="section-title">Conditions Générales d'Utilisation</h2>
        <p>Bienvenue sur Mémo VMC. En utilisant ce site, vous acceptez les conditions suivantes :</p>
        <ul>
          <li>Le contenu est fourni à titre informatif et ne remplace pas l'avis d'un professionnel.</li>
          <li>Nous ne sommes pas responsables des erreurs ou omissions dans les informations fournies.</li>
          <li>Vous êtes responsable de l'utilisation des informations présentes sur ce site.</li>
          <li>Le contenu est protégé par les droits d'auteur et ne peut être reproduit sans autorisation.</li>
        </ul>
        <p>Pour toute question, contactez-nous à <a href="mailto:memo.chaudiere@gmail.com">memo.chaudiere@gmail.com</a>.</p>
      </div>
    `
  };

  // Fonction pour initialiser la section CGU
  function initCGU() {
    document.addEventListener('contentLoaded', function(event) {
      if (event && event.detail && event.detail.section === 'cgu') {
        console.log('Initialisation de la section CGU');
        // Toute initialisation spécifique aux CGU peut être faite ici
      }
    });
  }

  // Initialiser le module de façon sécurisée
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initCGU, 1);
  } else {
    document.addEventListener("DOMContentLoaded", initCGU);
  }

  // Ajouter un event listener pour le menu mobile
  document.addEventListener('click', function(event) {
    // Vérifier si l'élément cliqué est un lien du menu mobile
    if (event.target && event.target.matches('[data-section]')) {
      const section = event.target.getAttribute('data-section');
      console.log('Menu mobile: demande de chargement de section:', section);
      
      // Si loadContent existe, l'utiliser
      if (typeof window.loadContent === 'function') {
        window.loadContent(section);
      }
      
      // Fermer le menu mobile
      const sideMenu = document.querySelector('.side-menu');
      const menuOverlay = document.querySelector('.menu-overlay');
      if (sideMenu) sideMenu.classList.remove('open');
      if (menuOverlay) menuOverlay.style.display = 'none';
    }
  }, true);
})();

// Export (progressive migration vers modules)
export const cgu = window.vmcContent && window.vmcContent.cgu ? window.vmcContent.cgu : null;