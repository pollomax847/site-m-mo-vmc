/**
 * Module pour les aérations de fenêtres
 * Ce module permet de gérer les entrées d'air des fenêtres en lien avec les systèmes VMC
 */

(function() {
  // Définir le contenu dans le namespace vmcContent
  if (typeof window.vmcContent === 'undefined') {
    window.vmcContent = {};
  }

  // Ajouter une section sur les aérations de fenêtres
  window.vmcContent['aerations-fenetres'] = {
    title: 'Entrées d\'air pour VMC',
    content: `
      <div class="section-container">
        <h2 class="section-title">Entrées d'air pour fenêtres compatibles VMC</h2>
        
        <div class="introduction">
          <p>Les entrées d'air sont des éléments essentiels pour assurer la circulation de l'air dans un logement équipé d'une VMC. Elles permettent d'introduire l'air neuf dans les pièces principales (séjour, chambres) pour remplacer l'air extrait par les bouches de la VMC dans les pièces humides.</p>
        </div>
        
        <h3>Types d'entrées d'air</h3>
        <div class="cards-container">
          <div class="info-card">
            <div class="card-header">Autoréglables</div>
            <div class="card-content">
              <p>Débit d'air constant quelles que soient les conditions extérieures (vent, pression).</p>
              <p><strong>Modules disponibles :</strong> 15, 22, 30, 45 m³/h</p>
              <p><strong>Compatible avec :</strong> VMC simple flux autoréglable, VMC gaz, VMC double flux mal équilibrée</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="card-header">Hygroréglables</div>
            <div class="card-content">
              <p>Débit variable en fonction du taux d'humidité de la pièce. S'ouvre davantage quand l'air est humide.</p>
              <p><strong>Plage de débit :</strong> 5-45 m³/h selon modèles</p>
              <p><strong>Compatible avec :</strong> VMC hygroréglable type A et B</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="card-header">Acoustiques</div>
            <div class="card-content">
              <p>Intègre un isolant phonique pour atténuer les bruits extérieurs.</p>
              <p><strong>Atténuation :</strong> jusqu'à 42 dB selon modèles</p>
              <p><strong>Compatible avec :</strong> Tous types de VMC, idéal en environnement bruyant</p>
            </div>
          </div>
        </div>
        
        <h3>Dimensionnement par type de pièce</h3>
        <table class="technical-table">
          <tr>
            <th>Type de pièce</th>
            <th>Surface</th>
            <th>Module recommandé</th>
            <th>Nombre d'entrées minimum</th>
          </tr>
          <tr>
            <td>Séjour / Salon</td>
            <td>&lt; 25 m²</td>
            <td>30 m³/h</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Séjour / Salon</td>
            <td>&gt; 25 m²</td>
            <td>45 m³/h (ou 2x22)</td>
            <td>1-2</td>
          </tr>
          <tr>
            <td>Chambre</td>
            <td>&lt; 15 m²</td>
            <td>15 m³/h</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Chambre</td>
            <td>&gt; 15 m²</td>
            <td>22 m³/h</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Bureau</td>
            <td>Toute surface</td>
            <td>15 m³/h</td>
            <td>1</td>
          </tr>
        </table>
        
        <h3>Installation et positionnement</h3>
        <div class="installation-guide">
          <div class="installation-image">
            <img src="images/installation-entree-air.jpg" alt="Schéma d'installation d'entrée d'air" onerror="this.onerror=null;this.src='';this.alt='Schéma non disponible';">
          </div>
          <div class="installation-steps">
            <ol>
              <li><strong>Hauteur de pose idéale :</strong> 1,80 à 2,20 m du sol pour éviter les courants d'air directs</li>
              <li><strong>Emplacement :</strong>
                <ul>
                  <li>Sur la menuiserie (traverse haute)</li>
                  <li>Sur le coffre de volet roulant</li>
                  <li>En traversée de mur (déconseillé car moins performant)</li>
                </ul>
              </li>
              <li><strong>Distance recommandée :</strong> au moins 50 cm entre l'entrée d'air et le plafond</li>
              <li><strong>Éviter la proximité :</strong> 
                <ul>
                  <li>Des sources de pollution</li>
                  <li>Des bouches d'extraction</li>
                  <li>Des zones où l'air est stagnant</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        
        <h3>Compatibilité avec types de menuiserie</h3>
        <div class="compatibility-table-container">
          <table class="technical-table">
            <tr>
              <th>Type de menuiserie</th>
              <th>Mortaise standard</th>
              <th>Solutions spécifiques</th>
            </tr>
            <tr>
              <td>PVC</td>
              <td>2 x (172 x 12) mm</td>
              <td>Entrées spéciales pour faible hauteur de profil</td>
            </tr>
            <tr>
              <td>Aluminium</td>
              <td>2 x (172 x 12) mm</td>
              <td>Adaptateurs pour profils étroits</td>
            </tr>
            <tr>
              <td>Bois</td>
              <td>250 x 15 mm ou 2 x (172 x 12) mm</td>
              <td>Versions en applique disponibles</td>
            </tr>
            <tr>
              <td>Coffre de volet roulant</td>
              <td>Dépend du modèle</td>
              <td>Kits spécifiques par fabricant</td>
            </tr>
          </table>
        </div>
        
        <div class="important-note">
          <h4>Important :</h4>
          <ul>
            <li>Ne jamais obstruer les entrées d'air (rideaux, meubles)</li>
            <li>Nettoyer régulièrement (2-3 fois par an) avec un chiffon humide</li>
            <li>Vérifier que le débit total des entrées d'air correspond au débit d'extraction de la VMC</li>
            <li>Les fenêtres équipées d'entrées d'air doivent être conformes à la norme NF EN 13141-1</li>
          </ul>
        </div>
        
        <h3>Calcul du débit total d'entrées d'air</h3>
        <div class="calculation-guide">
          <p>Pour un logement équipé d'une VMC, le débit total des entrées d'air doit correspondre au débit total d'extraction de la VMC :</p>
          
          <div class="formula-box">
            <p><strong>Débit total entrées d'air = débit total d'extraction</strong></p>
          </div>
          
          <p>Exemple pour un T3 avec VMC simple flux :</p>
          <ul>
            <li>Extraction cuisine : 45 m³/h</li>
            <li>Extraction salle de bain : 30 m³/h</li>
            <li>Extraction WC : 15 m³/h</li>
            <li><strong>Total extraction : 90 m³/h</strong></li>
          </ul>
          
          <p>Configuration entrées d'air recommandée :</p>
          <ul>
            <li>Séjour : 1 entrée de 45 m³/h</li>
            <li>Chambre 1 : 1 entrée de 30 m³/h</li>
            <li>Chambre 2 : 1 entrée de 15 m³/h</li>
            <li><strong>Total entrées : 90 m³/h</strong></li>
          </ul>
        </div>
        
        <h3>Références par marques</h3>
        <div class="brands-table-container">
          <table class="technical-table">
            <tr>
              <th>Fabricant</th>
              <th>Séries populaires</th>
              <th>Particularités</th>
            </tr>
            <tr>
              <td>Aldes</td>
              <td>EH, EHB, EHL, EHVS</td>
              <td>Large gamme, autoréglable et hygroréglable</td>
            </tr>
            <tr>
              <td>Aereco</td>
              <td>EHA, EHT, EMM</td>
              <td>Spécialiste des systèmes hygroréglables</td>
            </tr>
            <tr>
              <td>Anjos</td>
              <td>ISOLA 2, ISOLA HY</td>
              <td>Versions acoustiques performantes</td>
            </tr>
            <tr>
              <td>Atlantic</td>
              <td>EA, EH</td>
              <td>Compatibilité avec coffres de volets roulants</td>
            </tr>
            <tr>
              <td>Unelvent</td>
              <td>SATA, SASA</td>
              <td>Solutions pour rénovation</td>
            </tr>
          </table>
        </div>
        
        <div class="ventilation-tip">
          <h4>Conseils pour une ventilation optimale</h4>
          <ul>
            <li>Assurez-vous que toutes les entrées d'air sont de la même marque dans un même logement (cohérence de débit)</li>
            <li>Pour les VMC hygroréglables, utilisez exclusivement des entrées d'air compatibles avec votre système</li>
            <li>En cas de remplacement de fenêtres, choisissez des menuiseries avec entrées d'air intégrées</li>
            <li>Dans les régions froides, préférez des entrées d'air isolantes pour limiter les pertes thermiques</li>
            <li>En zone bruyante, installez des entrées d'air acoustiques classées 40 dB minimum</li>
          </ul>
        </div>
        
        <div class="diagram-section">
          <h4>Schéma de principe : Circuit d'air dans un logement</h4>
             <div class="warning-box">
               <h4>⚠️ Schéma indicatif seulement</h4>
               <p>Ce schéma simplifié illustre le principe général de circulation d'air. Il ne doit pas être utilisé pour des décisions techniques précises. Pour dimensionnement et câblage, référez-vous aux normes et aux documents techniques du projet.</p>
             </div>
                                                ▼
                                           Extérieur
          </pre>
        </div>
        
        <div class="resources-section">
          <h4>Ressources complémentaires</h4>
          <ul>
            <li><a href="#verification-debit">Outil de calcul des débits</a></li>
            <li><a href="#faq">FAQ sur la ventilation</a></li>
            <li><a href="#entretien">Guide d'entretien des entrées d'air</a></li>
          </ul>
        </div>
      </div>
    `
  };

  // Initialiser le module lorsque le DOM est chargé
  document.addEventListener('DOMContentLoaded', function() {
    // Si la fonction loadContent existe, ajouter une option au menu
    if (typeof loadContent === 'function') {
      const mainMenu = document.getElementById('mainMenu');
      if (mainMenu) {
        const menuItem = document.createElement('li');
        menuItem.innerHTML = '<a href="#aerations-fenetres">Entrées d\'air</a>';
        mainMenu.appendChild(menuItem);
      }
    }
    
    // Réagir aux événements de chargement de section
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail.section === 'aerations-fenetres') {
        console.log('Section aérations fenêtres chargée');
        
        // Initialiser des comportements spécifiques si nécessaire
        const tables = document.querySelectorAll('.technical-table');
        tables.forEach(table => {
          table.classList.add('responsive-table');
        });
      }
    });
  });
  
  // Ajouter au menu mobile également
  document.addEventListener('mobileMenuCreated', function() {
    const mobileMenu = document.querySelector('.side-menu nav ul');
    if (mobileMenu) {
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.innerHTML = '<a href="#" data-section="aerations-fenetres" style="display:block;padding:12px 15px;background-color:#f5f5f5;border-radius:8px;color:#333;text-decoration:none;font-weight:500;">Entrées d\'air</a>';
      mobileMenu.appendChild(mobileMenuItem);
    }
  });
})();
