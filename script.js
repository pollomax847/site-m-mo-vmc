document.addEventListener('DOMContentLoaded', function() {
  // Créer une fonction sécurisée pour getElementById
  const safeGetElementById = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Élément avec ID "${id}" introuvable, création d'un élément temporaire.`);
      const tempElement = document.createElement('div');
      tempElement.id = id;
      tempElement.style.display = 'none';
      document.body.appendChild(tempElement);
      return tempElement;
    }
    return element;
  };

  // Optionnel: safe wrapper for getElementById to avoid runtime null errors
  // Disabled by default to avoid creating hidden elements unexpectedly.
  // To enable during debug: set `window.ENABLE_SAFE_GETELEMENT = true` before DOMContentLoaded.
  (function() {
    const enabled = !!window.ENABLE_SAFE_GETELEMENT;
    if (!enabled) {
      // keep original behavior
      return;
    }

    const originalGetElementById = document.getElementById;
    document.getElementById = function(id) {
      const element = originalGetElementById.call(document, id);
      return element || safeGetElementById(id);
    };
    console.info('DEBUG: safeGetElementById override enabled');
  })();

  // Contenu des sections VMC
  const vmcContent = {
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
            <li>Prévoir un espace suffisant pour l'installation du bloc double flux</li>
            <li>Entretien régulier des filtres obligatoire</li>
          </ul>
          
          <h3>Mesures et spécifications techniques</h3>
          <table class="technical-table">
            <tr>
              <th>Paramètre</th>
              <th>Valeurs standards</th>
            </tr>
            <tr>
              <td>Rendement échangeur</td>
              <td>70% à 95%</td>
            </tr>
            <tr>
              <td>Puissance consommée</td>
              <td>25W à 200W selon modèle</td>
            </tr>
            <tr>
              <td>Débit d'air traité</td>
              <td>50 à 300 m³/h selon surface habitable</td>
            </tr>
          </table>
          
          <h3>Dimensionnement</h3>
          <ul>
            <li>Diamètre des conduits d'insufflation: 75mm à 160mm</li>
            <li>Diamètre des conduits d'extraction: 80mm à 160mm</li>
            <li>Surface du module central: environ 600 x 600 mm</li>
            <li>Filtres : G4 à F7 (selon niveau de filtration requis)</li>
          </ul>
        </div>
      `
    },
    'vmc-hygro': {
      title: 'VMC Hygroréglable',
      content: `
        <div class="section-container">
          <h2 class="section-title">VMC Hygroréglable</h2>
          <p>La VMC hygroréglable adapte automatiquement le débit d'air en fonction du taux d'humidité dans les pièces, permettant une ventilation intelligente et économe en énergie.</p>
          
          <h3>Types de VMC hygroréglables</h3>
          <ul>
            <li>Hygroréglable type A : entrées d'air autoréglables et bouches d'extraction hygroréglables</li>
            <li>Hygroréglable type B : entrées d'air et bouches d'extraction hygroréglables</li>
          </ul>
          
          <h3>Avantages</h3>
          <ul>
            <li>Réduction des déperditions thermiques</li>
            <li>Adaptation automatique aux besoins</li>
            <li>Économies d'énergie</li>
          </ul>
          
          <h3>Points techniques importants</h3>
          <ul>
            <li>Vérifier la conformité des bouches d'extraction</li>
            <li>Respecter les débits minimums réglementaires</li>
            <li>Contrôler le bon fonctionnement des capteurs d'humidité</li>
          </ul>
          
          <h3>Plages de mesures et caractéristiques</h3>
          <table class="technical-table">
            <tr>
              <th>Paramètre</th>
              <th>Type A</th>
              <th>Type B</th>
            </tr>
            <tr>
              <td>Plage d'humidité de déclenchement</td>
              <td>30% à 65% HR</td>
              <td>30% à 65% HR</td>
            </tr>
            <tr>
              <td>Débit moyen cuisine</td>
              <td>35 à 40 m³/h</td>
              <td>10 à 45 m³/h</td>
            </tr>
            <tr>
              <td>Débit moyen salle de bain</td>
              <td>10 à 15 m³/h</td>
              <td>5 à 30 m³/h</td>
            </tr>
          </table>
          
          <h3>Économies d'énergie annuelles estimées</h3>
          <ul>
            <li>Type A : 5% à 10% par rapport à une VMC autoréglable</li>
            <li>Type B : 10% à 25% par rapport à une VMC autoréglable</li>
            <li>Débit global moyen réduit de 15% à 40% selon le type</li>
          </ul>
        </div>
      `
    },
    'vmc-thermo': {
      title: 'VMC Thermodynamique',
      content: `
        <div class="section-container">
          <h2 class="section-title">VMC Thermodynamique</h2>
          <p>La VMC thermodynamique combine les fonctions d'une VMC avec celles d'une pompe à chaleur, permettant de récupérer l'énergie contenue dans l'air extrait pour produire de l'eau chaude sanitaire.</p>
          
          <h3>Principe de fonctionnement</h3>
          <p>L'air extrait des pièces humides passe à travers un évaporateur qui capte ses calories. Cette énergie est ensuite transférée via un circuit frigorifique vers un ballon d'eau chaude sanitaire.</p>
          
          <h3>Avantages</h3>
          <ul>
            <li>Production d'eau chaude sanitaire économique</li>
            <li>Système 2-en-1: ventilation et production d'eau chaude</li>
            <li>COP (Coefficient de Performance) entre 3 et 4</li>
            <li>Économies d'énergie significatives</li>
          </ul>
          
          <h3>Spécifications techniques</h3>
          <table class="technical-table">
            <tr>
              <th>Paramètre</th>
              <th>Valeurs standards</th>
            </tr>
            <tr>
              <td>Volume ballon ECS</td>
              <td>150 à 300 litres</td>
            </tr>
            <tr>
              <td>Puissance électrique</td>
              <td>250 à 700W</td>
            </tr>
            <tr>
              <td>Temps de chauffe</td>
              <td>5 à 8 heures pour un ballon complet</td>
            </tr>
            <tr>
              <td>Température ECS maximale</td>
              <td>55 à 65°C</td>
            </tr>
          </table>
          
          <h3>Installation et dimensionnement</h3>
          <ul>
            <li>Hauteur sous plafond nécessaire: minimum 2,20m</li>
            <li>Volume de local minimum: 20m³ pour version sur air ambiant</li>
            <li>Diamètre des gaines: 125mm à 160mm</li>
            <li>Distance maximale entre bouches et groupe: 10m recommandé</li>
          </ul>
        </div>
      `
    },
    'vmc-gaz': {
      title: 'VMC Gaz',
      content: `
        <div class="section-container">
          <h2 class="section-title">VMC Gaz</h2>
          <p>La VMC Gaz est un système spécifique conçu pour les logements équipés d'appareils à gaz à circuit de combustion non étanche. Elle assure simultanément le renouvellement d'air du logement et l'évacuation des produits de combustion.</p>
          
          <div class="warning-box">
            <h3>⚠️ Attention : Système de sécurité obligatoire</h3>
            <p>La VMC Gaz nécessite un dispositif de sécurité collective (DSC) qui coupe l'alimentation en gaz en cas d'arrêt de la VMC pour éviter tout risque d'intoxication au monoxyde de carbone.</p>
          </div>
          
          <h3>Principe de fonctionnement</h3>
          <p>Le système comprend un réseau d'extraction spécifique avec deux modes de fonctionnement :</p>
          <ul>
            <li>Débit réduit en fonctionnement normal pour la ventilation du logement</li>
            <li>Grand débit lors de l'utilisation d'appareils à gaz raccordés</li>
          </ul>
          
          <h3>Éléments spécifiques</h3>
          <ul>
            <li>Caisson d'extraction 400°C/1h (résistant au feu)</li>
            <li>Dispositif de Sécurité Collective (DSC)</li>
            <li>Pressostat différentiel (contrôle de la dépression)</li>
            <li>Transformateur 230V/24V pour le circuit de sécurité</li>
            <li>Bouches d'extraction spécifiques avec débit de pointe automatique</li>
          </ul>
          
          <h3>Débits réglementaires (Arrêté du 24/03/1982 modifié)</h3>
          <table class="technical-table">
            <tr>
              <th>Pièce</th>
              <th>Débit de base (m³/h)</th>
              <th>Débit complémentaire (m³/h)</th>
            </tr>
            <tr>
              <td>Cuisine avec appareil à gaz raccordé</td>
              <td>20 à 45</td>
              <td>90 à 105 (en fonctionnement gaz)</td>
            </tr>
            <tr>
              <td>Salle de bains avec chauffe-eau gaz</td>
              <td>15 à 30</td>
              <td>15 à 30 (en fonctionnement gaz)</td>
            </tr>
            <tr>
              <td>WC</td>
              <td>15 à 30</td>
              <td>-</td>
            </tr>
          </table>
          
          <h3>Caractéristiques du caisson VMC Gaz</h3>
          <ul>
            <li>Certification CSTBat avec PV de résistance au feu 400°C/1h</li>
            <li>Dépression minimale en grand débit : 70 à 160 Pa selon installation</li>
            <li>Alimentation du caisson et DSC : 230V + terre obligatoire</li>
            <li>Circuit de commande du DSC : 24V alternatif</li>
          </ul>
          
          <h3>Contrôles obligatoires</h3>
          <ul>
            <li>Entretien obligatoire tous les ans (contrairement aux 3 ans pour VMC standard)</li>
            <li>Contrôle du DSC à chaque entretien avec simulation de panne</li>
            <li>Vérification des débits d'extraction en petite et grande vitesse</li>
            <li>Contrôle de la dépression au niveau des appareils à gaz raccordés</li>
          </ul>
          
          <h3>Normes et réglementations spécifiques</h3>
          <ul>
            <li>Arrêté du 30 mai 1989 : sécurité collective des installations</li>
            <li>NF DTU 68.3 P1-1-3 : installations de VMC Gaz</li>
            <li>NF DTU 61.1 : installations de gaz</li>
            <li>Norme XP E 51-795 : contrôle et entretien</li>
          </ul>
        </div>
      `
    },
    'reglementation': {
      title: 'Réglementation VMC',
      content: `
        <div class="section-container">
          <h2 class="section-title">Réglementation VMC</h2>
          <p>La ventilation des logements est encadrée par plusieurs textes réglementaires qui définissent les exigences minimales.</p>
          
          <h3>Textes de référence</h3>
          <ul>
            <li>Arrêté du 24 mars 1982 modifié: débits d'air minimaux et exigences générales</li>
            <li>RT 2012 et RE2020: performance énergétique des bâtiments</li>
            <li>DTU 68.3: conception et dimensionnement des installations</li>
            <li>Norme NF EN 14134: vérification des performances des systèmes</li>
          </ul>
          
          <h3>Débits minimaux réglementaires selon le type de logement</h3>
          <table class="technical-table">
            <tr>
              <th>Type de logement</th>
              <th>Cuisine</th>
              <th>SDB/Douche</th>
              <th>WC</th>
            </tr>
            <tr>
              <td>1 pièce principale</td>
              <td>75m³/h</td>
              <td>15m³/h</td>
              <td>15m³/h</td>
            </tr>
            <tr>
              <td>2 pièces principales</td>
              <td>90m³/h</td>
              <td>15m³/h</td>
              <td>15m³/h</td>
            </tr>
            <tr>
              <td>3 pièces principales</td>
              <td>105m³/h</td>
              <td>30m³/h</td>
              <td>15m³/h</td>
            </tr>
            <tr>
              <td>4 pièces principales</td>
              <td>120m³/h</td>
              <td>30m³/h</td>
              <td>30m³/h</td>
            </tr>
            <tr>
              <td>5 pièces principales</td>
              <td>135m³/h</td>
              <td>30m³/h</td>
              <td>30m³/h</td>
            </tr>
          </table>
          
          <h3>Contrôles obligatoires</h3>
          <ul>
            <li>Mesure des débits à la réception des travaux pour les bâtiments neufs</li>
            <li>Vérification de l'étanchéité des réseaux de classe A minimum</li>
            <li>Entretien obligatoire tous les 3 ans pour les VMC gaz</li>
          </ul>
        </div>
      `
    },
    'entretien': {
      title: 'Entretien et Maintenance',
      content: `
        <div class="section-container">
          <h2 class="section-title">Entretien et Maintenance des VMC</h2>
          <p>Un entretien régulier est essentiel pour garantir le bon fonctionnement et la durabilité de votre système VMC.</p>
          
          <h3>Fréquence d'entretien recommandée</h3>
          <table class="technical-table">
            <tr>
              <th>Élément</th>
              <th>Fréquence</th>
              <th>Opération</th>
            </tr>
            <tr>
              <td>Bouches d'extraction</td>
              <td>Tous les 3 mois</td>
              <td>Nettoyage à l'eau savonneuse</td>
            </tr>
            <tr>
              <td>Filtres (double flux)</td>
              <td>Tous les 3 à 6 mois</td>
              <td>Nettoyage ou remplacement</td>
            </tr>
            <tr>
              <td>Entrées d'air</td>
              <td>Tous les 6 mois</td>
              <td>Dépoussiérage</td>
            </tr>
            <tr>
              <td>Caisson VMC</td>
              <td>Tous les 2 ans</td>
              <td>Vérification et nettoyage</td>
            </tr>
            <tr>
              <td>Échangeur thermique</td>
              <td>Tous les ans</td>
              <td>Nettoyage soigneux</td>
            </tr>
          </table>
          
          <h3>Outils et produits nécessaires</h3>
          <ul>
            <li>Aspirateur avec embout souple</li>
            <li>Eau savonneuse (savon neutre)</li>
            <li>Chiffon microfibre</li>
            <li>Brosse souple</li>
            <li>Tournevis pour démontage</li>
          </ul>
          
          <h3>Signes de dysfonctionnement</h3>
          <ul>
            <li>Présence de moisissures sur les murs</li>
            <li>Condensation excessive sur les fenêtres</li>
            <li>Bruit anormal du caisson VMC</li>
            <li>Mauvaises odeurs persistantes</li>
            <li>Débit d'air insuffisant aux bouches d'extraction</li>
          </ul>
          
          <h3>Consommation électrique attendue</h3>
          <ul>
            <li>VMC simple flux: 15 à 45W (130-400 kWh/an)</li>
            <li>VMC double flux: 40 à 200W (350-1750 kWh/an)</li>
            <li>VMC hygroréglable: réduction de 15% par rapport à une autoréglable</li>
          </ul>
        </div>
      `
    },
    'depannage': {
      title: 'Méthodologie de Dépannage',
      content: `
        <div class="section-container">
          <h2 class="section-title">Méthodologie de Dépannage VMC</h2>
          <p>Suivez cette méthodologie progressive pour diagnostiquer et résoudre efficacement les problèmes de VMC.</p>
          
          <div class="depannage-organigramme">
            <h3>Organigramme de diagnostic</h3>
            <img src="organigramme-depannage.png" alt="Organigramme de dépannage VMC" class="full-width-img">
          </div>
          
          <div class="accordion">
            <div class="accordion-item">
              <button class="accordion-header">1. La VMC ne fonctionne pas du tout</button>
              <div class="accordion-content">
                <h4>Vérifications à effectuer</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> Présence d'alimentation électrique (disjoncteur)</li>
                  <li><input type="checkbox"> Interrupteur (si présent) en position marche</li>
                  <li><input type="checkbox"> Connexions électriques au niveau du groupe moteur</li>
                  <li><input type="checkbox"> Condensateur de démarrage du moteur</li>
                </ul>
                
                <h4>Solutions</h4>
                <ol>
                  <li>Réarmer le disjoncteur ou remplacer le fusible</li>
                  <li>Vérifier la tension d'alimentation (230V)</li>
                  <li>Contrôler et refaire les connexions électriques défectueuses</li>
                  <li>Remplacer le condensateur si défectueux</li>
                  <li>En dernier recours, remplacer le moteur</li>
                </ol>
              </div>
            </div>
            
            <div class="accordion-item">
              <button class="accordion-header">2. Débit d'air insuffisant</button>
              <div class="accordion-content">
                <h4>Vérifications à effectuer</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> État des bouches d'extraction (encrassement)</li>
                  <li><input type="checkbox"> État des entrées d'air (obstruction)</li>
                  <li><input type="checkbox"> État des filtres (VMC double flux)</li>
                  <li><input type="checkbox"> Étanchéité des conduits (fuites)</li>
                  <li><input type="checkbox"> Vitesse du moteur (petite/grande vitesse)</li>
                </ul>
                
                <h4>Solutions</h4>
                <ol>
                  <li>Nettoyer les bouches d'extraction</li>
                  <li>Nettoyer ou dégager les entrées d'air</li>
                  <li>Remplacer les filtres encrassés</li>
                  <li>Vérifier et étanchéifier les conduits</li>
                  <li>Vérifier la courroie de transmission (si présente)</li>
                </ol>
                
                <h4>Outils de mesure</h4>
                <ul>
                  <li>Anémomètre pour mesurer le débit réel (m³/h)</li>
                  <li>Manomètre pour mesurer la pression dans les conduits</li>
                </ul>
              </div>
            </div>
            
            <div class="accordion-item">
              <button class="accordion-header">3. Nuisances sonores</button>
              <div class="accordion-content">
                <h4>Types de bruits et causes possibles</h4>
                <table class="technical-table">
                  <tr>
                    <th>Type de bruit</th>
                    <th>Cause possible</th>
                    <th>Solution</th>
                  </tr>
                  <tr>
                    <td>Sifflement</td>
                    <td>Fuite d'air, dimensionnement inadéquat</td>
                    <td>Vérifier étanchéité, ajuster débit</td>
                  </tr>
                  <tr>
                    <td>Vibration</td>
                    <td>Fixation insuffisante, transmission de vibrations</td>
                    <td>Installer silent-blocs, renforcer fixations</td>
                  </tr>
                  <tr>
                    <td>Claquement</td>
                    <td>Volet anti-retour défectueux</td>
                    <td>Remplacer le clapet</td>
                  </tr>
                  <tr>
                    <td>Roulement</td>
                    <td>Roulements moteur usés</td>
                    <td>Remplacer les roulements ou le moteur</td>
                  </tr>
                </table>
                
                <h4>Solutions acoustiques</h4>
                <ul>
                  <li>Installer des pièges à sons sur les conduits principaux</li>
                  <li>Utiliser des conduits acoustiques isolés</li>
                  <li>Placer le caisson VMC sur supports anti-vibratiles</li>
                </ul>
              </div>
            </div>
            
            <div class="accordion-item">
              <button class="accordion-header">4. Problèmes spécifiques VMC Double Flux</button>
              <div class="accordion-content">
                <h4>Problème d'échange thermique</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> Encrassement de l'échangeur</li>
                  <li><input type="checkbox"> Bypass ouvert en permanence</li>
                  <li><input type="checkbox"> Déséquilibre des débits soufflage/extraction</li>
                </ul>
                
                <h4>Solutions</h4>
                <ol>
                  <li>Nettoyer l'échangeur thermique selon procédure fabricant</li>
                  <li>Vérifier le fonctionnement du bypass (été/hiver)</li>
                  <li>Régler l'équilibre des débits (extraction = soufflage ±5%)</li>
                </ol>
                
                <h4>Condensation excessive</h4>
                <ul>
                  <li>Vérifier l'évacuation des condensats (pente, siphon)</li>
                  <li>Contrôler l'isolation des conduits de soufflage</li>
                  <li>Ajuster l'humidistat si présent</li>
                </ul>
              </div>
            </div>
            
            <div class="accordion-item">
              <button class="accordion-header">5. Problèmes VMC Hygroréglable</button>
              <div class="accordion-content">
                <h4>Vérifications spécifiques</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> État des capteurs d'humidité</li>
                  <li><input type="checkbox"> Mouvements des volets d'ouverture</li>
                  <li><input type="checkbox"> Configuration correcte des bouches (correspondance pièce)</li>
                </ul>
                
                <h4>Test des bouches hygroréglables</h4>
                <ol>
                  <li>Bouche démontée: exposer à vapeur d'eau chaude et observer l'ouverture progressive</li>
                  <li>Vérifier l'absence de poussière sur le capteur à languette</li>
                  <li>Contrôler la mobilité du volet d'ouverture</li>
                </ol>
                
                <h4>Solutions en cas de dysfonctionnement</h4>
                <ul>
                  <li>Remplacer les bouches défectueuses (non réparables)</li>
                  <li>S'assurer que les piquages sont aux bons diamètres</li>
                  <li>Vérifier le module de gestion électronique si présent</li>
                </ul>
              </div>
            </div>
            
            <div class="accordion-item">
              <button class="accordion-header">6. Problèmes VMC Thermodynamique</button>
              <div class="accordion-content">
                <h4>Circuit frigorifique</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> Pression du fluide frigorigène</li>
                  <li><input type="checkbox"> Fonctionnement du compresseur</li>
                  <li><input type="checkbox"> État de l'évaporateur et du condenseur</li>
                </ul>
                
                <h4>Circuit eau chaude</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> Thermostat ballon ECS</li>
                  <li><input type="checkbox"> Anode sacrificielle (corrosion)</li>
                  <li><input type="checkbox"> Résistance électrique d'appoint</li>
                </ul>
                
                <h4>Solutions</h4>
                <p>La plupart des interventions sur le circuit frigorifique nécessitent un professionnel certifié manipulation des fluides frigorigènes:</p>
                <ol>
                  <li>Vérifier les codes erreurs sur le régulateur électronique</li>
                  <li>Contrôler les sondes de température (eau et air)</li>
                  <li>Nettoyer l'évaporateur si encrassé</li>
                  <li>Faire intervenir un frigoriste pour la partie circuit fermé</li>
                </ol>
              </div>
            </div>
            
            <div class="accordion-item">
              <button class="accordion-header">7. Problèmes VMC Gaz et dispositifs de sécurité</button>
              <div class="accordion-content">
                <h4>Diagnostic du Dispositif de Sécurité Collective (DSC)</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> Vérification de l'alimentation 230V du DSC</li>
                  <li><input type="checkbox"> Contrôle du transformateur 230V/24V</li>
                  <li><input type="checkbox"> État du relais de commande</li>
                  <li><input type="checkbox"> Fonctionnement du pressostat différentiel</li>
                  <li><input type="checkbox"> État des électrovannes de coupure gaz</li>
                </ul>
                
                <h4>Test de la chaîne de sécurité</h4>
                <ol>
                  <li>Contrôler la tension au secondaire du transformateur (24V ±10%)</li>
                  <li>Vérifier la continuité du circuit de commande en position normale</li>
                  <li>Tester le déclenchement du DSC par simulation d'arrêt VMC</li>
                  <li>Vérifier le réarmement manuel après déclenchement</li>
                </ol>
                
                <h4>Mesures et valeurs de référence</h4>
                <table class="technical-table">
                  <tr>
                    <th>Élément</th>
                    <th>Valeur normale</th>
                    <th>Action si défaut</th>
                  </tr>
                  <tr>
                    <td>Alimentation primaire transformateur</td>
                    <td>230V ±10%</td>
                    <td>Vérifier disjoncteur et câblage</td>
                  </tr>
                  <tr>
                    <td>Sortie secondaire transformateur</td>
                    <td>24V ±10%</td>
                    <td>Remplacer le transformateur</td>
                  </tr>
                  <tr>
                    <td>Résistance bobine relais DSC</td>
                    <td>Entre 80 et 200 ohms</td>
                    <td>Remplacer le relais</td>
                  </tr>
                  <tr>
                    <td>Dépression au pressostat</td>
                    <td>Minimum 20 Pa</td>
                    <td>Vérifier les prises de pression, tubes</td>
                  </tr>
                  <tr>
                    <td>Temps de déclenchement DSC</td>
                    <td>&#8804; 15 secondes</td>
                    <td>Remplacer le dispositif</td>
                  </tr>
                </table>
                
                <h4>Procédure de réarmement après déclenchement</h4>
                <ol>
                  <li>S'assurer que la VMC est bien en fonctionnement</li>
                  <li>Attendre au moins 30 secondes après rétablissement VMC</li>
                  <li>Appuyer sur le bouton de réarmement du DSC</li>
                  <li>Vérifier la réouverture des électrovannes gaz</li>
                  <li>Rallumer les appareils à gaz si nécessaire</li>
                </ol>
                
                <div class="warning-box">
                  <p><strong>Important</strong> : Le remplacement de tout composant du système de sécurité doit être effectué par un professionnel qualifié. Le DSC est un élément de sécurité critique dont dépend la vie des occupants.</p>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <button class="accordion-header">8. Problèmes électriques courants</button>
              <div class="accordion-content">
                <h4>Diagnostic des problèmes électriques</h4>
                <ul class="checklist">
                  <li><input type="checkbox"> Tension d'alimentation correcte (230V ±10%)</li>
                  <li><input type="checkbox"> État des fusibles et disjoncteurs de protection</li>
                  <li><input type="checkbox"> Continuité des câbles d'alimentation</li>
                  <li><input type="checkbox"> Fonctionnement des commutateurs de vitesse</li>
                  <li><input type="checkbox"> État des condensateurs de démarrage/fonctionnement</li>
                </ul>
                
                <h4>Contrôle des éléments électriques</h4>
                <table class="technical-table">
                  <tr>
                    <th>Élément</th>
                    <th>Mesure à effectuer</th>
                    <th>Valeur normale</th>
                  </tr>
                  <tr>
                    <td>Condensateur</td>
                    <td>Capacité (μF)</td>
                    <td>&#177;20% de la valeur nominale</td>
                  </tr>
                  <tr>
                    <td>Moteur (bobinage)</td>
                    <td>Résistance</td>
                    <td>20-100 Ω selon puissance</td>
                  </tr>
                  <tr>
                    <td>Courant consommé</td>
                    <td>Intensité (A)</td>
                    <td>Conforme plaque signalétique &#177;10%</td>
                  </tr>
                  <tr>
                    <td>Thermostat de sécurité</td>
                    <td>Continuité</td>
                    <td>Circuit fermé en fonctionnement normal</td>
                  </tr>
                </table>
                
                <h4>Résolution des problèmes de transformateur</h4>
                <ol>
                  <li>Vérifier l'absence de court-circuit au secondaire</li>
                  <li>Contrôler la présence de tension au primaire</li>
                  <li>Mesurer la tension au secondaire sous charge</li>
                  <li>Vérifier l'échauffement anormal (transformateur à remplacer si chaud)</li>
                </ol>
                
                <h4>Schéma électrique simplifié d'une VMC Gaz avec DSC</h4>
                <div class="diagram">
                  <pre>
 230V      N
  |        |
  |        |
  +-[Disj.]+
  |        |
  |        |
 ++-+    +-++
 |TR|    |   |
 ++-+    |   |
  |      |   |
  |      |VMC|
  |      |   |
 24V     |   |
  |      +-+-+
  |        |
 ++-+      |
 |  |      |
 |PS+------+
 |  |
 +--+
  |
  |
 +++
 |R|
 +++
  |
  |
 +++
 |EV|
 +-+
  </pre>
                  <p><small>TR: Transformateur, PS: Pressostat, R: Relais, EV: Électrovanne</small></p>
                </div>
              </div>
            </div>
          </div>
          
          <h3>Équipement de test spécifique VMC Gaz</h3>
          <ul>
            <li>Déprimomètre : mesure précise des dépressions (0-100 Pa minimum)</li>
            <li>Anémomètre à hélice ou fil chaud : mesure des débits aux bouches</li>
            <li>Multimètre avec fonction test de condensateur</li>
            <li>Détecteur de CO : vérification de l'absence de refoulement</li>
            <li>Contrôleur de DSC : simulation de panne de ventilation</li>
          </ul>
        </div>
      `
    },
    'faq': {
      title: 'FAQ',
      content: `
        <div class="section-container">
          <h2 class="section-title">Foire Aux Questions</h2>
          
          <div class="faq-item">
            <h3>À quelle fréquence faut-il entretenir une VMC ?</h3>
            <p>Il est recommandé de nettoyer les bouches d'extraction tous les 3 mois, de vérifier les entrées d'air tous les 6 mois et de faire une maintenance complète du système tous les 2 à 3 ans par un professionnel.</p>
          </div>
          
          <div class="faq-item">
            <h3>Comment savoir si ma VMC fonctionne correctement ?</h3>
            <p>Un test simple consiste à placer une feuille de papier contre la bouche d'extraction. Si elle reste "collée", votre VMC fonctionne. Vérifiez également l'absence de bruit anormal et de condensation excessive.</p>
          </div>
          
          <div class="faq-item">
            <h3>Est-il obligatoire d'avoir une VMC ?</h3>
            <p>Oui, depuis 1982, l'installation d'un système de ventilation est obligatoire dans les logements neufs (arrêté du 24 mars 1982 modifié).</p>
          </div>
          
          <div class="faq-item">
            <h3>Quelle VMC choisir pour une maison économe en énergie ?</h3>
            <p>La VMC double flux avec récupérateur de chaleur est la solution la plus efficace énergétiquement, bien que son coût d'installation soit plus élevé.</p>
          </div>
          
          <div class="faq-item">
            <h3>Sources d'information et références</h3>
            <p>Les informations techniques présentées dans cette application proviennent des sources suivantes :</p>
            <ul class="source-list">
              <li><a href="https://www.ademe.fr/expertises/batiment/elements-contexte/equipements-electriques/ventilation-mecanique-controlee-vmc" target="_blank">ADEME - Ventilation Mécanique Contrôlée</a></li>
              <li><a href="https://www.qualit-enr.org" target="_blank">Qualit'EnR - Documentation technique</a></li>
              <li><a href="https://www.effinergie.org" target="_blank">Effinergie - Normes et réglementations</a></li>
              <li><a href="https://www.cerema.fr/fr/activites/batiment-energie/batiment-energie-climat-qualite-air" target="_blank">CEREMA - Bâtiment énergie et qualité de l'air</a></li>
              <li><a href="https://www.rt-batiment.fr" target="_blank">RT Bâtiment - Réglementation thermique</a></li>
              <li><a href="https://cstb.fr" target="_blank">CSTB - Centre Scientifique et Technique du Bâtiment</a></li>
              <li><a href="https://www.uniclima.fr" target="_blank">UNICLIMA - Syndicat des industries thermiques, aérauliques et frigorifiques</a></li>
            </ul>
            <p>Les mesures de débit et caractéristiques techniques sont basées sur les normes en vigueur, notamment :</p>
            <ul class="source-list">
              <li>Arrêté du 24 mars 1982 modifié relatif à l'aération des logements</li>
              <li>NF DTU 68.3 - Travaux de bâtiment - Installations de ventilation mécanique</li>
              <li>Réglementation Thermique 2012 (RT 2012) et RE2020</li>
              <li>Norme NF EN 14134 - Ventilation des bâtiments - Essais de performances et contrôles d'installation</li>
            </ul>
            <p class="disclaimer">Note : Cette documentation est fournie à titre informatif et ne remplace pas les normes et réglementations officielles qui doivent être consultées pour toute installation professionnelle.</p>
          </div>
        </div>
      `
    },
    // Section de vérification de débit par défaut au cas où verification-debit.js n'est pas chargé
    'verification-debit': {
      title: 'Vérification des Débits VMC',
      content: `
        <div class="section-container">
          <h2 class="section-title">Chargement de l'outil de vérification...</h2>
          <p>Si cette page reste affichée, assurez-vous que le fichier verification-debit.js est bien chargé.</p>
        </div>
      `
    },
    'cgu': {
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
    }
  };

  // Exposer vmcContent pour qu'il soit accessible par d'autres scripts
  window.vmcContent = vmcContent;

  // Fonction pour charger le contenu - S'assurer qu'elle est globale
  function loadContent(section = 'verification-debit') {
    // Vérifier si la section existe avant de l'afficher
    if (!vmcContent[section]) {
      console.error(`Section "${section}" non trouvée dans le contenu disponible`);
      section = 'verification-debit';  // Section par défaut
    }
    
    // Nettoyer le contenu précédent
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.innerHTML = vmcContent[section].content;
    }
    
    // Mettre à jour le lien actif dans le menu
    document.querySelectorAll('#mainMenu a').forEach(menuLink => {
      menuLink.classList.remove('active');
      if (menuLink.getAttribute('href') === '#' + section) {
        menuLink.classList.add('active');
      }
    });

    // Déclencher un événement pour indiquer que le contenu a été chargé
    document.dispatchEvent(new CustomEvent('contentLoaded', { detail: { section } }));
  }

  // S'assurer que loadContent est accessible globalement
  window.loadContent = loadContent;

  // Attendre que la page soit complètement chargée
  window.addEventListener('load', function() {
    setTimeout(function() {
      loadContent('verification-debit');
    }, 200);
  });

  // Navigation
  document.querySelectorAll('#mainMenu a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('href').substring(1);
      loadContent(section);
      
      // Si on est en mode mobile, fermer le menu après la sélection
      if (window.innerWidth <= 768) {
        document.getElementById('mainMenu').classList.remove('active');
      }
    });
  });

  // Toggle menu mobile
  document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('mainMenu').classList.toggle('active');
  });

  // Gestion de l'état en ligne/hors ligne
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  function updateOnlineStatus() {
    const offlineStatus = document.getElementById('offline-status');
    if (navigator.onLine) {
      offlineStatus.classList.add('hidden');
    } else {
      offlineStatus.classList.remove('hidden');
    }
  }

  // Vérification initiale de l'état de connexion
  updateOnlineStatus();

  // Fonction de recherche
  document.getElementById('searchButton').addEventListener('click', function() {
    search();
  });

  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      search();
    }
  });

  function search() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) return;

    let resultsHtml = '<div class="section-container"><h2 class="section-title">Résultats de recherche</h2>';
    let foundResults = false;

    // Parcourir tout le contenu
    Object.keys(vmcContent).forEach(key => {
      const section = vmcContent[key];
      if (section.content.toLowerCase().includes(searchTerm)) {
        resultsHtml += `<div class="faq-item"><h3>${section.title}</h3>${section.content}</div>`;
        foundResults = true;
      }
    });

    if (!foundResults) {
      resultsHtml += '<p>Aucun résultat trouvé.</p>';
    }

    resultsHtml += '</div>';
    document.getElementById('content').innerHTML = resultsHtml;
  }

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

  // Observer pour initialiser les accordéons lorsque la section dépannage est chargée
  const contentObserver = new MutationObserver(() => {
    if (document.querySelector('.accordion')) {
      setupAccordion();

      // Initialiser les checkboxes interactives
      const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          // Sauvegarder l'état des checkboxes pour la session
          const checklistItem = this.parentElement;
          const checklistText = checklistItem.textContent.trim();
          localStorage.setItem('checkbox_' + checklistText, this.checked);
        });

        // Restaurer l'état des checkboxes s'il existe
        const checklistItem = checkbox.parentElement;
        const checklistText = checklistItem.textContent.trim();
        const savedState = localStorage.getItem('checkbox_' + checklistText);
        if (savedState === 'true') {
          checkbox.checked = true;
        }
      });
    }
  });

  contentObserver.observe(document.getElementById('content'), {
    childList: true,
    subtree: true
  });
});