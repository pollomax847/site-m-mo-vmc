/**
 * Module pour la méthodologie d'installation VMC
 */
(function() {
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  window.vmcContent['methodologie'] = {
    title: 'Méthodologie d\'Installation',
    content: `
      <div class="section-container">
        <h2 class="section-title">Méthodologie d'Installation VMC</h2>
        <p>Guide pas à pas pour la mise en œuvre d'une installation VMC conforme et performante.</p>

        <h3>1. Étude préalable</h3>
        <ul>
          <li>Identifier le type de bâtiment et le volume à ventiler</li>
          <li>Choisir le type de VMC adapté (simple flux, hygro, double flux, thermodynamique)</li>
          <li>Établir le plan de réseau de conduits et emplacement des bouches</li>
        </ul>

        <h3>2. Préparation et matériel</h3>
        <ul>
          <li>S'assurer de disposer des conduits, colliers, manchettes et gaines isolées</li>
          <li>Prévoir traversées étanches pour murs et planchers</li>
          <li>Vérifier compatibilité électrique et protections (disjoncteur dédié)</li>
        </ul>

        <h3>3. Installation aéraulique</h3>
        <ul>
          <li>Poser le caisson VMC sur supports anti‑vibratiles</li>
          <li>Raccorder les conduits en limitant les coudes et pertes de charge</li>
          <li>Respecter les diamètres recommandés et les longueurs maximales</li>
        </ul>

        <h3>4. Branchement électrique</h3>
        <ul>
          <li>Alimentation 230V protégée, câblage conforme aux normes</li>
          <li>Installer les commandes (horloge, by‑pass, hygrocontrôle) si présentes</li>
          <li>Vérifier la polarité, la terre et la continuité</li>
        </ul>

        <h3>5. Réglages et équilibrage</h3>
        <ul>
          <li>Régler les débits selon la réglementation et le type de logement</li>
          <li>Mesurer les pertes de charge et régler les volets/robinets d'équilibrage</li>
          <li>Effectuer un diagnostic acoustique et corriger les sources de bruit</li>
        </ul>

        <h3>6. Mise en service</h3>
        <ul>
          <li>Contrôler la conformité des débits avec un anémomètre</li>
          <li>Vérifier l'étanchéité des réseaux et l'absence de fuites</li>
          <li>Remettre la documentation et les recommandations d'entretien au client</li>
        </ul>

        <h3>7. Entretien recommandé</h3>
        <p>Nettoyage des bouches tous les 3 mois, vérification des entrées d'air tous les 6 mois, maintenance complète tous les 2–3 ans par un professionnel.</p>
      </div>
    `
  };

})();

// Export (progressive migration vers modules)
export const methodologie = window.vmcContent && window.vmcContent['methodologie'] ? window.vmcContent['methodologie'] : null;
