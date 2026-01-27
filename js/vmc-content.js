// Contenu des sections VMC
export const vmcContent = {
  'vmc-simple': {
    title: 'VMC Simple Flux',
    content: `
      <div class="section-container">
        <h2 class="section-title">VMC Simple Flux</h2>
        <p>La VMC simple flux est le système de ventilation le plus répandu dans les habitations. Elle extrait l'air vicié des pièces humides (cuisine, salle de bains, WC) vers l'extérieur.</p>
        
        <h3>Principe de fonctionnement</h3>
        <p>Un moteur unique aspire l'air par des bouches d'extraction situées dans les pièces humides. L'air neuf entre par des entrées d'air installées au niveau des fenêtres des pièces sèches (chambres, séjour).</p>
        
        <h3>Types d'installations</h3>
        <ul>
          <li>VMC simple flux autoréglable</li>
          <li>VMC simple flux hygroréglable A et B</li>
        </ul>
        
        <h3>Points techniques importants</h3>
        <ul>
          <li>Vérifier le bon positionnement des bouches d'extraction</li>
          <li>S'assurer que les entrées d'air sont correctement dimensionnées</li>
          <li>Contrôler l'étanchéité des conduits</li>
        </ul>
        
        <h3>Mesures et débits réglementaires</h3>
        <table class="technical-table">
          <tr>
            <th>Pièce</th>
            <th>Débit minimal (m³/h)</th>
            <th>Débit maximal (m³/h)</th>
          </tr>
          <tr>
            <td>Cuisine</td>
            <td>45</td>
            <td>135 (en vitesse de pointe)</td>
          </tr>
          <tr>
            <td>Salle de bains</td>
            <td>15</td>
            <td>30</td>
          </tr>
          <tr>
            <td>WC</td>
            <td>15</td>
            <td>30</td>
          </tr>
        </table>
        
        <h3>Dimensions standards</h3>
        <ul>
          <li>Diamètre des conduits : 80mm à 160mm en fonction du débit</li>
          <li>Entrées d'air : 30 m³/h par menuiserie dans les pièces principales</li>
          <li>Puissance moteur standard : 15W à 45W</li>
        </ul>
      </div>
    `
  },
  'vmc-double': {
    title: 'VMC Double Flux',
    content: `
      <div class="section-container">
        <h2 class="section-title">VMC Double Flux</h2>
        <p>La VMC double flux assure à la fois l'extraction de l'air vicié et l'insufflation d'air neuf filtré. Elle est équipée d'un échangeur thermique permettant de récupérer la chaleur de l'air extrait.</p>
        
        <h3>Principe de fonctionnement</h3>
        <p>Deux réseaux de conduits distincts : un réseau d'extraction pour les pièces humides et un réseau d'insufflation pour les pièces sèches. L'échangeur thermique permet de transférer la chaleur de l'air extrait vers l'air neuf entrant.</p>
        
        <h3>Avantages</h3>
        <ul>
          <li>Économies d'énergie significatives (jusqu'à 90% de la chaleur récupérée)</li>
          <li>Filtration de l'air entrant</li>
          <li>Confort thermique amélioré</li>
        </ul>
        
        <h3>Points techniques importants</h3>
        <ul>
          <li>Isoler les conduits d'insufflation pour éviter la condensation</li>
          <li>Vérifier l'équilibre des débits entre extraction et insufflation</li>
          <li>Entretenir régulièrement les filtres</li>
        </ul>
        
        <h3>Débits réglementaires</h3>
        <table class="technical-table">
          <tr>
            <th>Pièce</th>
            <th>Débit (m³/h)</th>
          </tr>
          <tr>
            <td>Cuisine</td>
            <td>45-135</td>
          </tr>
          <tr>
            <td>Salle de bains</td>
            <td>15-30</td>
          </tr>
          <tr>
            <td>Chambres</td>
            <td>30-60</td>
          </tr>
        </table>
      </div>
    `
  }
  // Ajouter d'autres sections selon les besoins
};