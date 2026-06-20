/**
 * Module CGU compatible avec l'espace de noms
 * @deprecated Utiliser cgu-module.js à la place
 */

(function() {
  // Éviter la redéclaration en vérifiant d'abord
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  // Vérifier si la section cgu existe déjà avant de la définir
  if (!window.vmcContent['cgu']) {
    window.vmcContent['cgu'] = {
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
    console.log('Module CGU chargé (version compatible avec espace de noms)');
  } else {
    console.log('Module CGU déjà chargé, évitement de la redéclaration');
  }
})();
