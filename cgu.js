// Module des Conditions Générales d'Utilisation
console.log('Chargement du module CGU...');

// Contenu des CGU
const cguContent = {
  title: 'Conditions Générales d\'Utilisation',
  content: `
    <div class="section-container">
      <h2 class="section-title">Conditions Générales d'Utilisation</h2>
      <div class="cgu-section">
        <h3>1. Acceptation des conditions</h3>
        <p>En utilisant cette application, vous acceptez les présentes conditions d'utilisation.</p>
      </div>
      
      <div class="cgu-section">
        <h3>2. Utilisation de l'application</h3>
        <p>Cette application est destinée à fournir des informations techniques sur les systèmes VMC.</p>
        <p>Les informations fournies sont à titre indicatif et doivent être vérifiées par un professionnel.</p>
      </div>
      
      <div class="cgu-section">
        <h3>3. Responsabilité</h3>
        <p>L'utilisation des informations se fait sous votre entière responsabilité.</p>
        <p>Nous ne pouvons garantir l'exactitude de toutes les informations présentées.</p>
      </div>
      
      <div class="cgu-section">
        <h3>4. Propriété intellectuelle</h3>
        <p>Le contenu de cette application est protégé par le droit d'auteur.</p>
      </div>
      
      <div class="cgu-section">
        <h3>5. Droit applicable</h3>
        <p>Les présentes conditions générales d'utilisation sont soumises au droit français.</p>
      </div>
    </div>
  `
};

// Exporter le contenu des CGU pour utilisation dans le menu uniquement
if (typeof window !== 'undefined') {
  window.vmcContent = window.vmcContent || {};
  window.vmcContent.cgu = cguContent;
}

console.log('Module CGU chargé avec succès');
