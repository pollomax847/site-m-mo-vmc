/**
 * Module pour les informations techniques générales
 */
(function() {
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  window.vmcContent['info'] = {
    title: 'Informations Techniques',
    content: `
      <div class="section-container">
        <h2 class="section-title">Informations Techniques</h2>
        <p>Ressources et repères techniques utiles pour la conception, l'installation et la maintenance des systèmes VMC.</p>

        <h3>Normes et références</h3>
        <ul>
          <li>Arrêté ventilation (exigences minimales pour les logements neufs)</li>
          <li>Normes NF EN relatives à la ventilation et qualité de l'air intérieur</li>
          <li>Recommandations ADEME, CEREMA et CSTB</li>
        </ul>

        <h3>Tableaux de débits réglementaires</h3>
        <p>Consulter la section <em>Vérification des Débits</em> pour les valeurs détaillées par type de logement et pièce.</p>

        <h3>Choix des composants</h3>
        <ul>
          <li>Choisir des conduits isolés pour les réseaux d'insufflation sur VMC double flux</li>
          <li>Privilégier des moteurs à faible consommation et rendement élevé</li>
          <li>Filtration : G4 minimum, F7 recommandé pour zones polluées</li>
        </ul>

        <h3>Entretien et sécurité</h3>
        <ul>
          <li>Remplacement des filtres selon fréquence constructeur</li>
          <li>Contrôle du fonctionnement du pressostat et du dispositif de sécurité (DSC)</li>
          <li>Mesure régulière des débits et inspection des bouches</li>
        </ul>

        <h3>Ressources & liens</h3>
        <ul>
          <li><a href="https://www.ademe.fr" target="_blank" rel="noopener">ADEME</a></li>
          <li><a href="https://www.cerema.fr" target="_blank" rel="noopener">CEREMA</a></li>
          <li><a href="https://www.uniclima.fr" target="_blank" rel="noopener">UNICLIMA</a></li>
        </ul>
      </div>
    `
  };

})();

// Export (progressive migration vers modules)
export const info = window.vmcContent && window.vmcContent['info'] ? window.vmcContent['info'] : null;
