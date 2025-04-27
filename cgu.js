// Module des Conditions Générales d'Utilisation
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chargement du module CGU...');
  
  // S'assurer que vmcContent existe
  if (window.vmcContent) {
    // Ajouter la section CGU au contenu existant
    window.vmcContent['cgu'] = {
      title: 'Conditions Générales d\'Utilisation',
      content: `
        <div class="section-container">
          <h2 class="section-title">Conditions Générales d'Utilisation</h2>
          
          <div class="cgu-section">
            <h3>1. Présentation de l'application</h3>
            <p>L'application "Mémo VMC" est un outil technique destiné aux professionnels et particuliers souhaitant obtenir des informations sur les différents types de VMC, leurs caractéristiques et leur maintenance.</p>
            <p>Cette application est fournie à titre informatif et ne remplace en aucun cas l'expertise d'un professionnel certifié pour l'installation ou la maintenance d'un système VMC.</p>
          </div>
          
          <div class="cgu-section">
            <h3>2. Utilisation de l'application</h3>
            <p>L'utilisation de cette application est libre et gratuite. Les utilisateurs s'engagent à :</p>
            <ul>
              <li>Ne pas utiliser l'application à des fins illégales</li>
              <li>Ne pas tenter de compromettre la sécurité de l'application</li>
              <li>Ne pas reproduire ou distribuer le contenu sans autorisation</li>
            </ul>
          </div>
          
          <div class="cgu-section">
            <h3>3. Limitation de responsabilité</h3>
            <p>Les informations fournies par l'application "Mémo VMC" le sont à titre indicatif. Malgré le soin apporté à la collecte des informations et à la création des contenus, des erreurs, omissions ou inexactitudes peuvent survenir.</p>
            <p>En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive. Nous ne pourrons être tenus responsables des conséquences directes ou indirectes pouvant résulter de l'utilisation, la consultation ou l'interprétation des informations fournies.</p>
          </div>
          
          <div class="cgu-section">
            <h3>4. Données personnelles</h3>
            <p>L'application "Mémo VMC" ne collecte aucune donnée personnelle sur ses utilisateurs. Les préférences d'affichage sont stockées uniquement sur votre appareil via le stockage local du navigateur.</p>
          </div>
          
          <div class="cgu-section">
            <h3>5. Propriété intellectuelle</h3>
            <p>L'ensemble des contenus présents dans cette application (textes, images, schémas) est protégé par les lois relatives à la propriété intellectuelle.</p>
            <p>Toute reproduction totale ou partielle sans autorisation préalable est strictement interdite.</p>
          </div>
          
          <div class="cgu-section">
            <h3>6. Contact</h3>
            <p>Pour toute question ou signalement concernant l'application, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:memo.chaudiere@gmail.com">memo.chaudiere@gmail.com</a></p>
          </div>
          
          <div class="cgu-section">
            <h3>7. Modification des CGU</h3>
            <p>Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Il est recommandé de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.</p>
          </div>
          
          <div class="cgu-section">
            <h3>8. Droit applicable</h3>
            <p>Les présentes conditions générales d'utilisation sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relèvera des tribunaux français.</p>
          </div>
          
          <div class="cgu-section cgu-date">
            <p>Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      `
    };
    
    console.log('Module CGU chargé avec succès');
  } else {
    console.error('vmcContent non disponible - Module CGU non chargé');
  }
});
