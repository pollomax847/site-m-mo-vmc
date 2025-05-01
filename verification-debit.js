// Outil de vérification des débits VMC
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chargement du module de vérification des débits...');
  
  // Attendre que vmcContent soit disponible
  const checkVmcContent = () => {
    if (window.vmcContent) {
      console.log('Accès à vmcContent réussi');
      initVerificationDebitModule();
    } else {
      console.log('Attente de vmcContent...');
      setTimeout(checkVmcContent, 100); // Réessayer après 100ms
    }
  };
  
  checkVmcContent();
  
  function initVerificationDebitModule() {
    // S'assurer que vmcContent existe dans l'objet window
    if (!window.vmcContent) {
      console.error('vmcContent non disponible - création d\'un objet vide');
      window.vmcContent = {};
    }
    
    // Configuration des débits réglementaires par type de logement et type de VMC
    const debitsReglementaires = {
      'simple-flux': {
        'T1': {
          'cuisine': { min: 20, max: 75 },
          'salle-de-bain': { min: 15, max: 15 },
          'wc': { min: 15, max: 15 },
          'autre-sdb': { min: 0, max: 15 }
        },
        'T2': {
          'cuisine': { min: 30, max: 90 },
          'salle-de-bain': { min: 15, max: 15 },
          'wc': { min: 15, max: 15 },
          'autre-sdb': { min: 0, max: 15 }
        },
        'T3': {
          'cuisine': { min: 45, max: 105 },
          'salle-de-bain': { min: 30, max: 30 },
          'wc': { min: 15, max: 15 },
          'autre-sdb': { min: 15, max: 15 }
        },
        'T4': {
          'cuisine': { min: 45, max: 120 },
          'salle-de-bain': { min: 30, max: 30 },
          'wc': { min: 30, max: 30 },
          'autre-sdb': { min: 15, max: 15 }
        },
        'T5+': {
          'cuisine': { min: 45, max: 135 },
          'salle-de-bain': { min: 30, max: 30 },
          'wc': { min: 30, max: 30 },
          'autre-sdb': { min: 15, max: 15 }
        }
      },
      'hygro-a': {
        'T1': {
          'cuisine': { min: 10, max: 50 },
          'salle-de-bain': { min: 10, max: 40 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 0, max: 40 }
        },
        'T2': {
          'cuisine': { min: 10, max: 50 },
          'salle-de-bain': { min: 10, max: 40 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 0, max: 40 }
        },
        'T3': {
          'cuisine': { min: 15, max: 50 },
          'salle-de-bain': { min: 10, max: 40 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 10, max: 40 }
        },
        'T4': {
          'cuisine': { min: 20, max: 55 },
          'salle-de-bain': { min: 15, max: 45 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 15, max: 45 }
        },
        'T5+': {
          'cuisine': { min: 25, max: 60 },
          'salle-de-bain': { min: 15, max: 45 },
          'wc': { min: 10, max: 30 },
          'autre-sdb': { min: 15, max: 45 }
        }
      },
      'hygro-b': {
        'T1': {
          'cuisine': { min: 10, max: 50 },
          'salle-de-bain': { min: 5, max: 40 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 0, max: 40 }
        },
        'T2': {
          'cuisine': { min: 10, max: 50 },
          'salle-de-bain': { min: 5, max: 40 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 0, max: 40 }
        },
        'T3': {
          'cuisine': { min: 10, max: 45 },
          'salle-de-bain': { min: 5, max: 35 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 5, max: 35 }
        },
        'T4': {
          'cuisine': { min: 15, max: 45 },
          'salle-de-bain': { min: 5, max: 35 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 5, max: 35 }
        },
        'T5+': {
          'cuisine': { min: 15, max: 50 },
          'salle-de-bain': { min: 10, max: 40 },
          'wc': { min: 5, max: 30 },
          'autre-sdb': { min: 10, max: 40 }
        }
      },
      'double-flux': {
        'T1': {
          'cuisine': { min: 45, max: 120 },
          'salle-de-bain': { min: 15, max: 30 },
          'wc': { min: 15, max: 30 },
          'autre-sdb': { min: 0, max: 30 }
        },
        'T2': {
          'cuisine': { min: 45, max: 120 },
          'salle-de-bain': { min: 15, max: 30 },
          'wc': { min: 15, max: 30 },
          'autre-sdb': { min: 0, max: 30 }
        },
        'T3': {
          'cuisine': { min: 45, max: 135 },
          'salle-de-bain': { min: 15, max: 30 },
          'wc': { min: 15, max: 30 },
          'autre-sdb': { min: 15, max: 30 }
        },
        'T4': {
          'cuisine': { min: 45, max: 135 },
          'salle-de-bain': { min: 30, max: 30 },
          'wc': { min: 15, max: 30 },
          'autre-sdb': { min: 15, max: 30 }
        },
        'T5+': {
          'cuisine': { min: 45, max: 135 },
          'salle-de-bain': { min: 30, max: 30 },
          'wc': { min: 15, max: 30 },
          'autre-sdb': { min: 15, max: 30 }
        }
      },
      'vmc-gaz': {
        'T1': {
          'cuisine': { min: 45, max: 75, 'grand-debit': 90 },
          'salle-de-bain': { min: 15, max: 15, 'grand-debit': 15 },
          'wc': { min: 15, max: 15 },
          'autre-sdb': { min: 0, max: 15 }
        },
        'T2': {
          'cuisine': { min: 45, max: 90, 'grand-debit': 105 },
          'salle-de-bain': { min: 15, max: 15, 'grand-debit': 30 },
          'wc': { min: 15, max: 15 },
          'autre-sdb': { min: 0, max: 15 }
        },
        'T3': {
          'cuisine': { min: 45, max: 105, 'grand-debit': 120 },
          'salle-de-bain': { min: 15, max: 30, 'grand-debit': 45 },
          'wc': { min: 15, max: 15 },
          'autre-sdb': { min: 15, max: 15 }
        },
        'T4': {
          'cuisine': { min: 45, max: 120, 'grand-debit': 135 },
          'salle-de-bain': { min: 15, max: 30, 'grand-debit': 45 },
          'wc': { min: 30, max: 30 },
          'autre-sdb': { min: 15, max: 15 }
        },
        'T5+': {
          'cuisine': { min: 45, max: 135, 'grand-debit': 135 },
          'salle-de-bain': { min: 15, max: 30, 'grand-debit': 45 },
          'wc': { min: 30, max: 30 },
          'autre-sdb': { min: 15, max: 15 }
        }
      }
    };
    
    // Facteurs de conversion entre unités
    const conversions = {
      'm3h_to_ms': function(debit, diametre) {
        // Convertit m³/h en m/s (vitesse) en fonction du diamètre en mm
        const section = Math.PI * Math.pow((diametre / 1000) / 2, 2); // section en m²
        return debit / 3600 / section;
      },
      'ms_to_m3h': function(vitesse, diametre) {
        // Convertit m/s en m³/h en fonction du diamètre en mm
        const section = Math.PI * Math.pow((diametre / 1000) / 2, 2); // section en m²
        return vitesse * section * 3600;
      },
      'pa_to_mmce': function(pa) {
        // Convertit les Pascals en mm de colonne d'eau
        return pa / 9.81;
      },
      'mmce_to_pa': function(mmce) {
        // Convertit les mm de colonne d'eau en Pascals
        return mmce * 9.81;
      }
    };
    
    // Définir le contenu pour la section verification-debit
    window.vmcContent['verification-debit'] = {
      title: 'Vérification des Débits VMC',
      content: `
        <div class="section-container">
          <h2 class="section-title">Assistant de Vérification des Débits VMC</h2>
          <p>Cet outil vous permet de vérifier si les débits mesurés sur une installation VMC sont conformes aux exigences réglementaires selon le type de logement et le système VMC.</p>
          
          <div class="calculator-container">
            <div class="form-group">
              <label for="typeLogement">Type de logement :</label>
              <select id="typeLogement" class="form-control auto-update">
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3" selected>T3</option>
                <option value="T4">T4</option>
                <option value="T5+">T5 et plus</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="typeVMC">Type de VMC :</label>
              <select id="typeVMC" class="form-control auto-update">
                <option value="simple-flux">VMC Simple Flux Autoréglable</option>
                <option value="hygro-a">VMC Hygroréglable Type A</option>
                <option value="hygro-b">VMC Hygroréglable Type B</option>
                <option value="double-flux">VMC Double Flux</option>
                <option value="vmc-gaz">VMC Gaz</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Unité de mesure :</label>
              <div class="radio-group">
                <label><input type="radio" name="unite" value="m3h" checked class="auto-update"> m³/h</label>
                <label><input type="radio" name="unite" value="ms" class="auto-update"> m/s</label>
                <label><input type="radio" name="unite" value="pa" class="auto-update"> Pa</label>
                <label><input type="radio" name="unite" value="mmce" class="auto-update"> mm CE</label>
              </div>
            </div>
            
            <div id="diametre-container" class="form-group hidden">
              <label for="diametre">Diamètre du conduit (mm) :</label>
              <input type="number" id="diametre" class="form-control auto-update" value="125">
            </div>
            
            <h3>Mesures des débits</h3>
            <div id="mesures-container">
              <!-- Sera rempli dynamiquement -->
            </div>
            
            <button id="btnAjouterPiece" class="btn btn-secondary">+ Ajouter une pièce</button>
            
            <div id="resultats" class="results-container"></div>
          </div>
          
          <div class="reference-table">
            <h3>Tableau de référence des débits réglementaires</h3>
            <div id="reference-table-container">
              <!-- Sera rempli dynamiquement -->
            </div>
          </div>
          
          <!-- Intégration du module fenêtres -->
          <div class="windows-vmc-integration">
            <h3>Entrées d'Air des Fenêtres</h3>
            <p class="sync-info"><strong>Synchronisation automatique :</strong> Les entrées d'air sont automatiquement adaptées au type de logement sélectionné.</p>
            
            <div class="windows-container">
              <!-- Les entrées d'air seront ajoutées automatiquement -->
            </div>
            
            <div class="air-inlet-actions">
              <button id="btnAjouterFenetre" class="btn btn-secondary">+ Ajouter une entrée d'air supplémentaire</button>
            </div>
          </div>
          
          <div class="info-block">
            <h3>Conversion entre unités</h3>
            <div class="converter-container">
              <div class="form-group">
                <label for="valueToConvert">Valeur à convertir :</label>
                <input type="number" id="valueToConvert" class="form-control">
              </div>
              <div class="form-group">
                <label for="fromUnit">De :</label>
                <select id="fromUnit" class="form-control">
                  <option value="m3h">m³/h</option>
                  <option value="ms">m/s</option>
                  <option value="pa">Pa</option>
                  <option value="mmce">mm CE</option>
                </select>
              </div>
              <div class="form-group">
                <label for="toUnit">Vers :</label>
                <select id="toUnit" class="form-control">
                  <option value="m3h">m³/h</option>
                  <option value="ms">m/s</option>
                  <option value="pa">Pa</option>
                  <option value="mmce">mm CE</option>
                </select>
              </div>
              <div class="form-group" id="diametre-conversion-container">
                <label for="diametreConversion">Diamètre (mm) :</label>
                <input type="number" id="diametreConversion" class="form-control" value="125">
              </div>
              <button id="btnConvert" class="btn btn-secondary">Convertir</button>
              <div id="conversionResult" class="conversion-result"></div>
            </div>
          </div>
        </div>
      `
    };

    console.log('Module de vérification des débits chargé avec succès');
    
    // Initialiser la page de vérification des débits si elle est chargée
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail.section === 'verification-debit') {
        console.log('Initialisation de l\'outil de vérification des débits');
        setTimeout(function() {
          initVerificationDebit();
        }, 50);
      }
    });

    // Vérifier également si le contenu est déjà chargé
    const contentLoaded = setInterval(() => {
      if (document.querySelector('.calculator-container')) {
        clearInterval(contentLoaded);
        console.log('Container de calculatrice trouvé, initialisation...');
        initVerificationDebit();
      }
    }, 100);
    
    // Définissons la fonction initVerificationDebit correctement
    function initVerificationDebit() {
      const typeLogement = document.getElementById('typeLogement');
      const typeVMC = document.getElementById('typeVMC');
      const unites = document.getElementsByName('unite');
      const diametre = document.getElementById('diametre');
      const mesuresContainer = document.getElementById('mesures-container');
      const btnAjouterPiece = document.getElementById('btnAjouterPiece');
      const resultats = document.getElementById('resultats');
      const referenceTableContainer = document.getElementById('reference-table-container');
      const diametreContainer = document.getElementById('diametre-container');

      // Si les éléments ne sont pas encore chargés, on quitte la fonction
      if (!typeLogement || !typeVMC || !mesuresContainer || !resultats) {
        console.error("Les éléments du DOM ne sont pas encore disponibles");
        return;
      }

      console.log("Initialisation de l'interface de vérification des débits...");

      // Pour la conversion
      const valueToConvert = document.getElementById('valueToConvert');
      const fromUnit = document.getElementById('fromUnit');
      const toUnit = document.getElementById('toUnit');
      const diametreConversion = document.getElementById('diametreConversion');
      const btnConvert = document.getElementById('btnConvert');
      const conversionResult = document.getElementById('conversionResult');
      const diametreConversionContainer = document.getElementById('diametre-conversion-container');

      // Initialiser l'affichage
      updateReferenceTable();

      // Vider le conteneur de mesures existant
      mesuresContainer.innerHTML = '';

      // Ajouter les champs de mesure selon le type de logement
      ajouterChampsMesure();

      // Ajouter un événement sur le changement de type de logement
      typeLogement.addEventListener('change', function() {
        // Ajouter les nouvelles mesures selon le nouveau type de logement
        ajouterChampsMesure();
        // Mettre à jour le tableau de référence
        updateReferenceTable();
        // Vérifier la conformité
        verifierConformite();
      });

      // Attache les événements pour les mises à jour automatiques
      document.addEventListener('change', function(e) {
        if (e.target.classList.contains('auto-update') ||
            e.target.classList.contains('debit-mesure') ||
            e.target.classList.contains('piece-type')) {
          verifierConformite();
        }
      });

      document.addEventListener('input', function(e) {
        if (e.target.classList.contains('debit-mesure')) {
          verifierConformite();
        }
      });

      // Gestionnaires d'événements
      if (typeVMC) {
        typeVMC.addEventListener('change', function() {
          updateReferenceTable();
          verifierConformite(); // Ajouter cette ligne pour mettre à jour les résultats immédiatement
        });
      }

      if (btnAjouterPiece) {
        btnAjouterPiece.addEventListener('click', () => {
          ajouterChampsMesure();
          // Lancer une vérification après ajout d'une pièce
          setTimeout(verifierConformite, 50);
        });
      }

      if (btnConvert) {
        btnConvert.addEventListener('click', () => {
          if (!valueToConvert || !fromUnit || !toUnit || !conversionResult) {
            return;
          }
          
          const valeur = parseFloat(valueToConvert.value);
          if (isNaN(valeur)) {
            conversionResult.innerHTML = '<span class="error">Veuillez entrer un nombre valide</span>';
            return;
          }

          const from = fromUnit.value;
          const to = toUnit.value;
          let resultat;
          let unite = getUniteAffichage(to);

          // Conversion entre m³/h et m/s (nécessite un diamètre)
          if (from === 'm3h' && to === 'ms') {
            const diam = parseFloat(diametreConversion.value);
            if (isNaN(diam) || diam <= 0) {
              conversionResult.innerHTML = '<span class="error">Diamètre invalide</span>';
              return;
            }
            resultat = conversions.m3h_to_ms(valeur, diam);
          }
          else if (from === 'ms' && to === 'm3h') {
            const diam = parseFloat(diametreConversion.value);
            if (isNaN(diam) || diam <= 0) {
              conversionResult.innerHTML = '<span class="error">Diamètre invalide</span>';
              return;
            }
            resultat = conversions.ms_to_m3h(valeur, diam);
          }
          // Conversion entre Pa et mmCE
          else if (from === 'pa' && to === 'mmce') {
            resultat = conversions.pa_to_mmce(valeur);
          }
          else if (from === 'mmce' && to === 'pa') {
            resultat = conversions.mmce_to_pa(valeur);
          }
          // Même unité
          else if (from === to) {
            resultat = valeur;
          }
          else {
            conversionResult.innerHTML = '<span class="error">Conversion non supportée</span>';
            return;
          }
          
          conversionResult.innerHTML = `<strong>Résultat:</strong> ${valeur} ${getUniteAffichage(from)} = ${resultat.toFixed(2)} ${unite}`;
        });
      }

      // Afficher/cacher le champ de diamètre en fonction de l'unité sélectionnée
      if (unites) {
        for (const unite of unites) {
          unite.addEventListener('change', function() {
            if (this.value === 'ms') {
              diametreContainer.classList.remove('hidden');
            } else {
              diametreContainer.classList.add('hidden');
            }
            // Pour une meilleure expérience mobile, faire défiler jusqu'au tableau
            // après changement d'unité pour voir les résultats actualisés
            if (window.innerWidth <= 768) {
              setTimeout(() => {
                const tableRef = document.getElementById('reference-table-container');
                if (tableRef) {
                  tableRef.scrollIntoView({ behavior: 'smooth' });
                }
              }, 300);
            }
          });
        }
      }

      if (fromUnit && toUnit) {
        fromUnit.addEventListener('change', updateConversionFields);
        toUnit.addEventListener('change', updateConversionFields);
        updateConversionFields();
      }
    }

    function updateReferenceTable() {
      const referenceTableContainer = document.getElementById('reference-table-container');
      const typeLogement = document.getElementById('typeLogement');
      const typeVMC = document.getElementById('typeVMC');

      if (!referenceTableContainer || !typeLogement || !typeVMC) {
        console.error("Éléments manquants pour mettre à jour le tableau de référence");
        return;
      }

      const logement = typeLogement.value;
      const vmc = typeVMC.value;

      if (!debitsReglementaires[vmc] || !debitsReglementaires[vmc][logement]) {
        console.error(`Données de débit non trouvées pour VMC ${vmc} et logement ${logement}`);
        return;
      }

      const debits = debitsReglementaires[vmc][logement];
      let tableHTML = `
        <table class="technical-table">
          <tr>
            <th>Pièce</th>
            <th>Débit minimal (m³/h)</th>
            <th>Débit maximal (m³/h)</th>
            ${vmc === 'vmc-gaz' ? '<th>Grand débit (m³/h)</th>' : ''}
          </tr>
      `;

      for (const piece in debits) {
        tableHTML += `
          <tr>
            <td>${getNomPiece(piece)}</td>
            <td>${debits[piece].min}</td>
            <td>${debits[piece].max}</td>
            ${vmc === 'vmc-gaz' && debits[piece]['grand-debit'] ? `<td>${debits[piece]['grand-debit']}</td>` : vmc === 'vmc-gaz' ? '<td>-</td>' : ''}
          </tr>
        `;
      }

      tableHTML += '</table>';
      referenceTableContainer.innerHTML = tableHTML;
      console.log(`Tableau de référence mis à jour pour ${vmc} et ${logement}`);

      // Mettre à jour les résultats après changement de référence
      verifierConformite();
    }

    function updateConversionFields() {
      const fromUnit = document.getElementById('fromUnit');
      const toUnit = document.getElementById('toUnit');
      const diametreConversionContainer = document.getElementById('diametre-conversion-container');

      if (!fromUnit || !toUnit || !diametreConversionContainer) return;

      const from = fromUnit.value;
      const to = toUnit.value;

      if ((from === 'm3h' && to === 'ms') || (from === 'ms' && to === 'm3h')) {
        diametreConversionContainer.style.display = 'block';
      } else {
        diametreConversionContainer.style.display = 'none';
      }

      const conversionResult = document.getElementById('conversionResult');
      if (conversionResult) conversionResult.innerHTML = '';
    }

    function ajouterChampsMesure(type = null) {
      const typeLogement = document.getElementById('typeLogement');
      const typeLogementVal = typeLogement ? typeLogement.value : 'T3';
      const mesuresContainer = document.getElementById('mesures-container');

      console.log(`Ajout des champs de mesure pour le type de logement: ${typeLogementVal}`);

      // Vider le conteneur de mesures existant si aucun type spécifique n'est demandé
      if (!type) {
        mesuresContainer.innerHTML = '';
      }

      // Déterminer le nombre de bouches à ajouter selon le type de logement
      let piecesAAjouter = [];
      switch(typeLogementVal) {
        case 'T1':
          piecesAAjouter = ['cuisine', 'salle-de-bain', 'wc'];
          break;
        case 'T2':
          piecesAAjouter = ['cuisine', 'salle-de-bain', 'wc'];
          break;
        case 'T3':
          piecesAAjouter = ['cuisine', 'salle-de-bain', 'wc', 'autre-sdb'];
          break;
        case 'T4':
          piecesAAjouter = ['cuisine', 'salle-de-bain', 'wc', 'autre-sdb'];
          break;
        case 'T5+':
          piecesAAjouter = ['cuisine', 'salle-de-bain', 'wc', 'autre-sdb'];
          break;
        default:
          piecesAAjouter = ['cuisine', 'salle-de-bain', 'wc'];
      }

      // Si un type spécifique est demandé, ne créer que cette pièce
      if (type) {
        piecesAAjouter = [type];
      }

      console.log(`Pièces à ajouter: ${piecesAAjouter.join(', ')}`);

      // Ajouter chaque pièce
      piecesAAjouter.forEach(pieceType => {
        const item = document.createElement('div');
        item.className = 'mesure-item';

        const row = document.createElement('div');
        row.className = 'mesure-row';

        // Sélection du type de pièce
        const pieceGroup = document.createElement('div');
        pieceGroup.className = 'form-group';
        const pieceLabel = document.createElement('label');
        pieceLabel.textContent = 'Type de pièce:';
        const pieceSelect = document.createElement('select');
        pieceSelect.className = 'form-control piece-type auto-update';

        // Options types de pièces
        const options = [
          { value: 'cuisine', text: 'Cuisine' },
          { value: 'salle-de-bain', text: 'Salle de bain principale' },
          { value: 'wc', text: 'WC' },
          { value: 'autre-sdb', text: 'Autre salle d\'eau' }
        ];

        options.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.text;
          if (pieceType === opt.value) option.selected = true;
          pieceSelect.appendChild(option);
        });

        pieceGroup.appendChild(pieceLabel);
        pieceGroup.appendChild(pieceSelect);

        // Champ débit mesuré
        const debitGroup = document.createElement('div');
        debitGroup.className = 'form-group';
        const debitLabel = document.createElement('label');
        debitLabel.textContent = 'Débit mesuré:';
        const debitInput = document.createElement('input');
        debitInput.type = 'number';
        debitInput.className = 'form-control debit-mesure';
        debitInput.min = '0';
        debitInput.step = 'any';
        debitGroup.appendChild(debitLabel);
        debitGroup.appendChild(debitInput);

        // Bouton de suppression
        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn-remove';
        btnRemove.innerHTML = '&times;';
        btnRemove.style.minHeight = '44px'; // Taille minimale recommandée pour les éléments tactiles
        btnRemove.style.minWidth = '44px';
        btnRemove.addEventListener('click', function() {
          mesuresContainer.removeChild(item);
          verifierConformite();
        });

        // Status de la mesure (sera rempli par la vérification)
        const statusDiv = document.createElement('div');
        statusDiv.className = 'mesure-status';

        row.appendChild(pieceGroup);
        row.appendChild(debitGroup);
        row.appendChild(btnRemove);
        item.appendChild(row);
        item.appendChild(statusDiv);
        mesuresContainer.appendChild(item);
      });
    }

    function verifierConformite() {
      const resultats = document.getElementById('resultats');
      if (!resultats) return;

      const typeLogement = document.getElementById('typeLogement');
      const typeLogementVal = typeLogement ? typeLogement.value : 'T3';
      const typeVMC = document.getElementById('typeVMC');
      const typeVMCVal = typeVMC ? typeVMC.value : 'simple-flux';
      const uniteSelectionnee = document.querySelector('input[name="unite"]:checked').value;
      const diametre = document.getElementById('diametre');
      const diametreVal = diametre ? parseFloat(diametre.value) : 125;

      const referenceDebits = debitsReglementaires[typeVMCVal][typeLogementVal];
      const mesures = [];
      const itemsMesure = document.querySelectorAll('.mesure-item');

      itemsMesure.forEach(item => {
        const typePiece = item.querySelector('.piece-type').value;
        const debitInput = item.querySelector('.debit-mesure');
        let debitMesure = parseFloat(debitInput.value) || 0;

        // Conversion si nécessaire
        if (uniteSelectionnee === 'ms') {
          // Conversion m/s à m³/h
          debitMesure = conversions.ms_to_m3h(debitMesure, diametreVal);
        } else if (uniteSelectionnee === 'pa') {
          // Une conversion de Pa à m³/h nécessiterait une courbe caractéristique
          // Pour simplifier, on utilise une approximation
          debitMesure = Math.sqrt(debitMesure) * 10;
        } else if (uniteSelectionnee === 'mmce') {
          // Conversion mmCE à Pa puis à m³/h (approximation)
          const pa = conversions.mmce_to_pa(debitMesure);
          debitMesure = Math.sqrt(pa) * 10;
        }

        // Référence pour cette pièce
        const reference = referenceDebits[typePiece];
        if (!reference) {
          console.error(`Référence non trouvée pour pièce ${typePiece}`);
          return;
        }

        const min = reference.min;
        const max = reference.max;

        // Déterminer la conformité
        let etat = 'success';
        if (debitMesure < min || debitMesure > max) {
          etat = 'error';
        }

        mesures.push({
          type: typePiece,
          valeur: debitMesure,
          min: min,
          max: max,
          etat: etat
        });

        // Mise à jour du statut dans l'interface
        const statusDiv = item.querySelector('.mesure-status');
        if (statusDiv) {
          if (debitMesure === 0 || isNaN(debitMesure)) {
            statusDiv.innerHTML = '';
          } else {
            const message = getEtatMessage(etat, debitMesure, min, max);
            const messageClass = etat === 'success' ? 'success' : 'error';
            statusDiv.innerHTML = `<span class="${messageClass}">${message}</span>`;
          }
        }
      });

      // Générer le résumé
      let conformesCount = mesures.filter(m => m.etat === 'success').length;
      let pourcentageConformite = mesures.length > 0 ? Math.round((conformesCount / mesures.length) * 100) : 0;

      let tropFaible = mesures.filter(m => m.etat === 'error' && m.valeur < m.min).length;
      let tropEleve = mesures.filter(m => m.etat === 'error' && m.valeur > m.max).length;

      let resumeClass = 'success';
      if (pourcentageConformite < 70) resumeClass = 'error';
      else if (pourcentageConformite < 100) resumeClass = 'warning';

      let resumeHTML = `
        <table class="results-table">
          <tr>
            <th>Pièce</th>
            <th>Débit mesuré (m³/h)</th>
            <th>Débit min (m³/h)</th>
            <th>Débit max (m³/h)</th>
            <th>Etat</th>
          </tr>
      `;

      mesures.forEach(m => {
        if (m.valeur === 0 || isNaN(m.valeur)) return; // Ne pas inclure les mesures vides
        resumeHTML += `
          <tr class="${m.etat}">
            <td>${getNomPiece(m.type)}</td>
            <td>${m.valeur.toFixed(1)}</td>
            <td>${m.min}</td>
            <td>${m.max}</td>
            <td>${getEtatMessage(m.etat, m.valeur, m.min, m.max)}</td>
          </tr>
        `;
      });

      resumeHTML += `</table>`;

      if (mesures.length > 0 && mesures.filter(m => m.valeur > 0).length > 0) {
        const diagnosticMessage = getDiagnosticMessage(pourcentageConformite, tropFaible, tropEleve);
        resumeHTML += `
          <div class="results-summary ${resumeClass}">
            <h3>Conformité globale: ${pourcentageConformite}%</h3>
            <p><strong>Diagnostic:</strong> ${diagnosticMessage}</p>
          </div>
        `;
      }

      resultats.innerHTML = resumeHTML;
    }

    function getNomPiece(piece) {
      switch(piece) {
        case 'cuisine': return 'Cuisine';
        case 'salle-de-bain': return 'Salle de bain principale';
        case 'wc': return 'WC';
        case 'autre-sdb': return 'Autre salle d\'eau';
        default: return piece;
      }
    }

    function getUniteAffichage(unite) {
      switch(unite) {
        case 'm3h': return 'm³/h';
        case 'ms': return 'm/s';
        case 'pa': return 'Pa';
        case 'mmce': return 'mm CE';
        default: return unite;
      }
    }

    function getEtatMessage(etat, valeur, min, max) {
      if (etat === 'error') {
        if (valeur < min) return 'DÉBIT INSUFFISANT';
        if (valeur > max) return 'DÉBIT TROP ÉLEVÉ';
        return 'ERREUR';
      }
      return 'CONFORME';
    }

    function getDiagnosticMessage(pourcentage, tropFaible, tropEleve) {
      if (pourcentage === 100) return 'Installation conforme';
      if (pourcentage >= 80) return 'Installation globalement conforme avec quelques ajustements nécessaires';
      if (pourcentage >= 50) {
        if (tropFaible > tropEleve) return 'Débit global insuffisant - Vérifier le caisson VMC';
        return 'Déséquilibre dans la distribution des débits - Réglage des bouches nécessaire';
      }
      if (tropFaible > tropEleve) return 'Débit très insuffisant - Vérifier le dimensionnement de l\'installation';
      return 'Installation non conforme nécessitant une révision complète';
    }

    console.log("Interface de vérification des débits initialisée avec succès");

    /* Module Fenêtres - Intégration avec les entrées d'air pour VMC */
    function initWindowsModule() {
      const windowsContainer = document.querySelector('.windows-container');
      
      if (!windowsContainer) return;
      
      // Tableau des débits standards pour les entrées d'air par type de pièce
      const airInletFlows = {
        'salon': { standard: 30, hygro: '6-45' },
        'chambre': { standard: 15, hygro: '6-22' },
        'sejour': { standard: 30, hygro: '6-45' },
        'autre-piece': { standard: 15, hygro: '6-22' }
      };

      // Mettre à jour les options de module d'entrée d'air en fonction du type de pièce
      function updateAirInletOptions(windowItem) {
        const roomType = windowItem.querySelector('.window-room-type').value;
        const airInletType = windowItem.querySelector('.air-inlet-type').value;
        const airInletModuleSelect = windowItem.querySelector('.air-inlet-module');
        
        // Vider le select
        airInletModuleSelect.innerHTML = '';
        
        if (airInletType === 'standard') {
          // Pour les entrées autoréglables, on propose des valeurs fixes
          const standardValue = airInletFlows[roomType]?.standard || 15;
          
          [15, 22, 30, 45].forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = `${value} m³/h`;
            option.selected = (value === standardValue);
            airInletModuleSelect.appendChild(option);
          });
        } else {
          // Pour les entrées hygroréglables, on indique la plage
          const hygroRange = airInletFlows[roomType]?.hygro || '6-22';
          
          const option = document.createElement('option');
          option.value = hygroRange;
          option.textContent = `${hygroRange} m³/h (hygro)`;
          airInletModuleSelect.appendChild(option);
        }
        
        // Mettre à jour le débit affiché
        const airFlowValue = windowItem.querySelector('.air-flow-value');
        if (airFlowValue) {
          airFlowValue.textContent = airInletModuleSelect.value + ' m³/h';
        }
      }
      
      // Mettre à jour la qualité d'air et l'efficacité de la fenêtre
      function updateWindowAirQuality(windowItem) {
        const windowState = windowItem.querySelector('.window-state').value;
        const airInletModule = windowItem.querySelector('.air-inlet-module').value;
        const airFlowValue = windowItem.querySelector('.air-flow-value');
        const efficiencyFill = windowItem.querySelector('.progress-fill');
        const efficiencyPercent = windowItem.querySelector('.efficiency-percent');
        
        // Facteur d'efficacité basé sur l'état
        let efficiencyFactor = 1.0;
        switch(windowState) {
          case 'neuf': efficiencyFactor = 1.0; break;
          case 'bon': efficiencyFactor = 0.9; break;
          case 'moyen': efficiencyFactor = 0.7; break;
          case 'mauvais': efficiencyFactor = 0.5; break;
        }
        
        // Si c'est hygroréglable, on prend la valeur moyenne
        let airFlow = 0;
        if (airInletModule.includes('-')) {
          const [min, max] = airInletModule.split('-').map(Number);
          airFlow = (min + max) / 2;
        } else {
          airFlow = parseInt(airInletModule);
        }
        
        // Appliquer le facteur d'efficacité
        const effectiveAirFlow = airFlow * efficiencyFactor;
        
        // Mettre à jour l'affichage
        if (airInletModule.includes('-')) {
          airFlowValue.textContent = `${Math.round(effectiveAirFlow)} m³/h (moyenne)`;
        } else {
          airFlowValue.textContent = `${Math.round(effectiveAirFlow)} m³/h`;
        }
        
        // Mettre à jour la barre d'efficacité
        const efficiencyPercValue = Math.round(efficiencyFactor * 100);
        efficiencyFill.style.width = `${efficiencyPercValue}%`;
        efficiencyPercent.textContent = `${efficiencyPercValue}%`;
        
        // Définir la couleur selon l'efficacité
        if (efficiencyFactor < 0.6) {
          efficiencyFill.style.backgroundColor = '#dc3545';
        } else if (efficiencyFactor < 0.8) {
          efficiencyFill.style.backgroundColor = '#ffc107';
        } else {
          efficiencyFill.style.backgroundColor = '#28a745';
        }
        
        // Mise à jour du total de débit
        updateTotalAirFlow();
      }
      
      // Calculer et afficher le débit total d'entrée d'air
      function updateTotalAirFlow() {
        const windowItems = document.querySelectorAll('.window-item');
        let totalStandardFlow = 0;
        let totalHygroMinFlow = 0;
        let totalHygroMaxFlow = 0;
        
        windowItems.forEach(item => {
          try {
            // Vérifier que les éléments existent
            const airInletModuleEl = item.querySelector('.air-inlet-module');
            const windowStateEl = item.querySelector('.window-state');
            
            if (!airInletModuleEl || !windowStateEl) {
              console.warn('Élément manquant dans .window-item', item);
              return;
            }
            
            const airInletModule = airInletModuleEl.value;
            const windowState = windowStateEl.value;
            
            // Facteur d'efficacité basé sur l'état
            let efficiencyFactor = 1.0;
            switch(windowState) {
              case 'neuf': efficiencyFactor = 1.0; break;
              case 'bon': efficiencyFactor = 0.9; break;
              case 'moyen': efficiencyFactor = 0.7; break;
              case 'mauvais': efficiencyFactor = 0.5; break;
            }
            
            if (airInletModule.includes('-')) {
              // Entrée hygroréglable
              const [min, max] = airInletModule.split('-').map(Number);
              totalHygroMinFlow += min * efficiencyFactor;
              totalHygroMaxFlow += max * efficiencyFactor;
            } else {
              // Entrée autoréglable
              totalStandardFlow += parseInt(airInletModule) * efficiencyFactor;
            }
          } catch(err) {
            console.error('Erreur lors du calcul du débit:', err);
          }
        });
        
        // Afficher le résultat
        const summaryEl = document.querySelector('.air-inlets-summary');
        const summaryElement = summaryEl || createSummaryElement();
        
        if (totalHygroMinFlow > 0 || totalHygroMaxFlow > 0) {
          summaryElement.innerHTML = `
            <h4>Bilan entrées d'air:</h4>
            <table class="air-inlets-table">
              <tr>
                <td>Entrées autoréglables:</td>
                <td>${Math.round(totalStandardFlow)} m³/h</td>
              </tr>
              <tr>
                <td>Entrées hygroréglables:</td>
                <td>${Math.round(totalHygroMinFlow)} à ${Math.round(totalHygroMaxFlow)} m³/h</td>
              </tr>
              <tr class="total-row">
                <td>Débit total estimé:</td>
                <td>${Math.round(totalStandardFlow + totalHygroMinFlow)} à ${Math.round(totalStandardFlow + totalHygroMaxFlow)} m³/h</td>
              </tr>
            </table>
            <div class="compatibilite-vmc">Ce débit doit correspondre à la somme des débits d'extraction de votre VMC.</div>
          `;
        } else {
          summaryElement.innerHTML = `
            <h4>Bilan entrées d'air:</h4>
            <table class="air-inlets-table">
              <tr>
                <td>Entrées autoréglables:</td>
                <td>${Math.round(totalStandardFlow)} m³/h</td>
              </tr>
              <tr class="total-row">
                <td>Débit total:</td>
                <td>${Math.round(totalStandardFlow)} m³/h</td>
              </tr>
            </table>
            <div class="compatibilite-vmc">Ce débit doit correspondre à la somme des débits d'extraction de votre VMC.</div>
          `;
        }
        
        // Vérifier la compatibilité avec les débits d'extraction
        checkCompatibilityWithVMC(totalStandardFlow + (totalHygroMaxFlow > 0 ? totalHygroMinFlow : 0));
      }
      
      // Créer l'élément de sommaire s'il n'existe pas
      function createSummaryElement() {
        const summaryElement = document.createElement('div');
        summaryElement.className = 'air-inlets-summary';
        
        const windowsSection = document.querySelector('.windows-vmc-integration');
        if (windowsSection) {
          windowsSection.appendChild(summaryElement);
        }
        
        return summaryElement;
      }
      
      // Vérifier la compatibilité avec les débits d'extraction VMC
      function checkCompatibilityWithVMC(totalInletFlow) {
        // Récupérer le débit total d'extraction si disponible
        const typeLogement = document.getElementById('typeLogement')?.value || 'T3';
        const typeVMC = document.getElementById('typeVMC')?.value || 'simple-flux';
        
        // Obtenir les mesures des débits depuis les champs de mesure
        let extractionTotal = 0;
        const mesureItems = document.querySelectorAll('.mesure-item');
        
        mesureItems.forEach(item => {
          const debitInput = item.querySelector('.debit-mesure');
          if (debitInput && !isNaN(debitInput.value) && debitInput.value.trim() !== '') {
            extractionTotal += parseFloat(debitInput.value);
          }
        });
        
        // Si aucune mesure n'est disponible, utiliser des valeurs standards
        if (extractionTotal === 0) {
          switch(typeLogement) {
            case 'T1': extractionTotal = 75; break;
            case 'T2': extractionTotal = 90; break;
            case 'T3': extractionTotal = 105; break;
            case 'T4': extractionTotal = 120; break;
            case 'T5+': extractionTotal = 135; break;
            default: extractionTotal = 105;
          }
        }
        
        // Vérifier l'équilibre et afficher le message
        const compatElement = document.querySelector('.compatibilite-vmc');
        if (!compatElement) return;
        
        const difference = totalInletFlow - extractionTotal;
        const percentDifference = Math.abs(difference) / extractionTotal * 100;
        
        if (percentDifference <= 10) {
          compatElement.innerHTML = `<div class="status-indicator good"></div><strong>Équilibre correct :</strong> Le débit d'entrée d'air (${Math.round(totalInletFlow)} m³/h) est bien équilibré avec le débit d'extraction (${Math.round(extractionTotal)} m³/h).`;
        } else if (percentDifference <= 20) {
          compatElement.innerHTML = `<div class="status-indicator warning"></div><strong>Équilibre acceptable :</strong> Le débit d'entrée d'air (${Math.round(totalInletFlow)} m³/h) diffère de ${Math.round(percentDifference)}% du débit d'extraction (${Math.round(extractionTotal)} m³/h).`;
        } else {
          if (difference > 0) {
            compatElement.innerHTML = `<div class="status-indicator bad"></div><strong>Déséquilibre :</strong> Le débit d'entrée d'air (${Math.round(totalInletFlow)} m³/h) est trop important par rapport au débit d'extraction (${Math.round(extractionTotal)} m³/h). Cela peut réduire l'efficacité de la VMC.`;
          } else {
            compatElement.innerHTML = `<div class="status-indicator bad"></div><strong>Déséquilibre :</strong> Le débit d'entrée d'air (${Math.round(totalInletFlow)} m³/h) est insuffisant par rapport au débit d'extraction (${Math.round(extractionTotal)} m³/h). Risque de dépression et difficultés d'ouverture des portes.`;
          }
        }
      }
      
      // Ajouter une nouvelle fenêtre avec entrée d'air
      function addWindowWithAirInlet() {
        const windowItem = document.createElement('div');
        windowItem.className = 'window-item';
        
        windowItem.innerHTML = `
          <div class="window-row">
            <div class="form-group">
              <label>Type de pièce :</label>
              <select class="form-control window-room-type">
                <option value="salon">Salon</option>
                <option value="chambre">Chambre</option>
                <option value="sejour">Séjour</option>
                <option value="autre-piece">Autre pièce</option>
              </select>
            </div>
            <div class="form-group">
              <label>Type d'entrée d'air :</label>
              <select class="form-control air-inlet-type">
                <option value="standard">Autoréglable</option>
                <option value="hygro">Hygroréglable</option>
              </select>
            </div>
            <div class="form-group">
              <label>Module entrée d'air :</label>
              <select class="form-control air-inlet-module">
                <option value="15">15 m³/h</option>
                <option value="22">22 m³/h</option>
                <option value="30" selected>30 m³/h</option>
                <option value="45">45 m³/h</option>
              </select>
            </div>
            <div class="form-group">
              <label>État :</label>
              <select class="form-control window-state">
                <option value="neuf">Neuf</option>
                <option value="bon">Bon</option>
                <option value="moyen">Moyen</option>
                <option value="mauvais">Mauvais</option>
              </select>
            </div>
            <button class="btn-remove window-remove">&times;</button>
          </div>
          <div class="window-air-quality">
            <div class="air-efficiency">
              <label>Efficacité de l'entrée d'air :</label>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 100%"></div>
              </div>
              <span class="efficiency-percent">100%</span>
            </div>
            <p class="window-air-flow"><strong>Débit effectif : </strong><span class="air-flow-value">30 m³/h</span></p>
          </div>
        `;
        
        // Configurer les événements pour mettre à jour le débit affiché
        const roomTypeSelect = windowItem.querySelector('.window-room-type');
        const airInletTypeSelect = windowItem.querySelector('.air-inlet-type');
        const airInletModuleSelect = windowItem.querySelector('.air-inlet-module');
        const stateSelect = windowItem.querySelector('.window-state');
        
        roomTypeSelect.addEventListener('change', function() {
          updateAirInletOptions(windowItem);
          updateWindowAirQuality(windowItem);
        });
        
        airInletTypeSelect.addEventListener('change', function() {
          updateAirInletOptions(windowItem);
          updateWindowAirQuality(windowItem);
        });
        
        airInletModuleSelect.addEventListener('change', function() {
          updateWindowAirQuality(windowItem);
        });
        
        stateSelect.addEventListener('change', function() {
          updateWindowAirQuality(windowItem);
        });
        
        // Bouton de suppression
        windowItem.querySelector('.window-remove').addEventListener('click', () => {
          windowsContainer.removeChild(windowItem);
          updateTotalAirFlow();
        });
        
        // Ajouter au conteneur et mettre à jour les calculs
        windowsContainer.appendChild(windowItem);
        updateAirInletOptions(windowItem);
        updateWindowAirQuality(windowItem);
        updateTotalAirFlow();
      }
      
      // Synchroniser les entrées d'air avec le type de logement
      function synchronizeAirInletsWithHousingType() {
        const typeLogement = document.getElementById('typeLogement').value;
        
        // Configuration recommandée par type de logement
        const recommendedConfig = {
          'T1': [{ room: 'sejour', type: 'standard', module: '30' }],
          'T2': [
            { room: 'sejour', type: 'standard', module: '30' },
            { room: 'chambre', type: 'standard', module: '15' }
          ],
          'T3': [
            { room: 'sejour', type: 'standard', module: '30' },
            { room: 'chambre', type: 'standard', module: '15' },
            { room: 'chambre', type: 'standard', module: '15' }
          ],
          'T4': [
            { room: 'sejour', type: 'standard', module: '30' },
            { room: 'chambre', type: 'standard', module: '15' },
            { room: 'chambre', type: 'standard', module: '15' },
            { room: 'chambre', type: 'standard', module: '15' }
          ],
          'T5+': [
            { room: 'sejour', type: 'standard', module: '45' },
            { room: 'chambre', type: 'standard', module: '15' },
            { room: 'chambre', type: 'standard', module: '15' },
            { room: 'chambre', type: 'standard', module: '15' },
            { room: 'chambre', type: 'standard', module: '15' }
          ]
        };
        
        // Récupérer la configuration recommandée
        const config = recommendedConfig[typeLogement] || recommendedConfig['T3'];
        
        // Supprimer les entrées d'air existantes
        while (windowsContainer.firstChild) {
          windowsContainer.removeChild(windowsContainer.firstChild);
        }
        
        // Créer les nouvelles entrées d'air selon la configuration
        config.forEach(entry => {
          const windowItem = createWindowItem(entry.room, entry.type, entry.module);
          windowsContainer.appendChild(windowItem);
          updateAirInletOptions(windowItem);
          updateWindowAirQuality(windowItem);
        });
        
        // Mettre à jour le total
        updateTotalAirFlow();
        
        // Afficher un message d'information
        showConfigMessage(typeLogement);
      }
      
      // Fonction pour créer un élément d'entrée d'air
      function createWindowItem(room, inletType, module) {
        const windowItem = document.createElement('div');
        windowItem.className = 'window-item';
        
        windowItem.innerHTML = `
          <div class="window-row">
            <div class="form-group">
              <label>Type de pièce :</label>
              <select class="form-control window-room-type">
                <option value="salon"${room === 'salon' ? ' selected' : ''}>Salon</option>
                <option value="sejour"${room === 'sejour' ? ' selected' : ''}>Séjour</option>
                <option value="chambre"${room === 'chambre' ? ' selected' : ''}>Chambre</option>
                <option value="autre-piece"${room === 'autre-piece' ? ' selected' : ''}>Autre pièce</option>
              </select>
            </div>
            <div class="form-group">
              <label>Type d'entrée d'air :</label>
              <select class="form-control air-inlet-type">
                <option value="standard"${inletType === 'standard' ? ' selected' : ''}>Autoréglable</option>
                <option value="hygro"${inletType === 'hygro' ? ' selected' : ''}>Hygroréglable</option>
              </select>
            </div>
            <div class="form-group">
              <label>Module entrée d'air :</label>
              <select class="form-control air-inlet-module">
                <option value="15"${module === '15' ? ' selected' : ''}>15 m³/h</option>
                <option value="22"${module === '22' ? ' selected' : ''}>22 m³/h</option>
                <option value="30"${module === '30' ? ' selected' : ''}>30 m³/h</option>
                <option value="45"${module === '45' ? ' selected' : ''}>45 m³/h</option>
              </select>
            </div>
            <div class="form-group">
              <label>État :</label>
              <select class="form-control window-state">
                <option value="neuf">Neuf</option>
                <option value="bon" selected>Bon</option>
                <option value="moyen">Moyen</option>
                <option value="mauvais">Mauvais</option>
              </select>
            </div>
            <button class="btn-remove window-remove">&times;</button>
          </div>
          <div class="window-air-quality">
            <div class="air-efficiency">
              <label>Efficacité de l'entrée d'air :</label>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 90%"></div>
              </div>
              <span class="efficiency-percent">90%</span>
            </div>
            <p class="window-air-flow"><strong>Débit effectif : </strong><span class="air-flow-value">${module} m³/h</span></p>
          </div>
        `;
        
        // Configurer les événements
        const roomTypeSelect = windowItem.querySelector('.window-room-type');
        const airInletTypeSelect = windowItem.querySelector('.air-inlet-type');
        const airInletModuleSelect = windowItem.querySelector('.air-inlet-module');
        const stateSelect = windowItem.querySelector('.window-state');
        
        roomTypeSelect.addEventListener('change', function() {
          updateAirInletOptions(windowItem);
          updateWindowAirQuality(windowItem);
        });
        
        airInletTypeSelect.addEventListener('change', function() {
          updateAirInletOptions(windowItem);
          updateWindowAirQuality(windowItem);
        });
        
        airInletModuleSelect.addEventListener('change', function() {
          updateWindowAirQuality(windowItem);
        });
        
        stateSelect.addEventListener('change', function() {
          updateWindowAirQuality(windowItem);
        });
        
        // Bouton de suppression
        windowItem.querySelector('.window-remove').addEventListener('click', () => {
          windowsContainer.removeChild(windowItem);
          updateTotalAirFlow();
        });
        
        return windowItem;
      }
      
      // Afficher un message d'information sur la configuration
      function showConfigMessage(typeLogement) {
        // Supprimer le message existant
        const existingMessage = document.querySelector('.config-message');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        // Créer un nouveau message
        const configMsg = document.createElement('div');
        configMsg.className = 'config-message info-message';
        configMsg.innerHTML = `<strong>Configuration ${typeLogement}</strong> : Entrées d'air adaptées automatiquement au logement de type ${typeLogement}.`;
        
        // Ajouter le message
        const windowsSection = document.querySelector('.windows-vmc-integration');
        if (windowsSection) {
          windowsSection.insertBefore(configMsg, windowsSection.querySelector('.windows-container'));
        }
        
        // Masquer après 5 secondes
        setTimeout(() => {
          configMsg.style.opacity = '0';
          configMsg.style.transition = 'opacity 1s';
          setTimeout(() => configMsg.remove(), 1000);
        }, 5000);
      }
      
      // Initialiser le bouton d'ajout et le guide d'utilisation
      const btnAjouterFenetre = document.getElementById('btnAjouterFenetre');
      if (btnAjouterFenetre) {
        btnAjouterFenetre.addEventListener('click', addWindowWithAirInlet);
        
        // Ajouter une entrée d'air par défaut au chargement
        setTimeout(() => {
          // Vérifier si le conteneur est vide avant d'ajouter
          if (windowsContainer.children.length === 0) {
            addWindowWithAirInlet();
          }
        }, 300);
      }
      
      // Ajouter une connexion entre le type de logement et les entrées d'air
      const typeLogement = document.getElementById('typeLogement');
      if (typeLogement) {
        // Modifier le message de synchronisation pour indiquer que tout est automatique
        const synkInfo = document.querySelector('.sync-info');
        if (synkInfo) {
          synkInfo.innerHTML = '<strong>Synchronisation automatique :</strong> Les entrées d\'air sont automatiquement adaptées au type de logement sélectionné.';
        }
        
        // Synchroniser initialement après chargement complet
        setTimeout(synchronizeAirInletsWithHousingType, 500);
        
        // Synchroniser lors du changement de type de logement
        typeLogement.addEventListener('change', function() {
          // Attendre un peu pour s'assurer que le changement est bien pris en compte
          setTimeout(synchronizeAirInletsWithHousingType, 100);
        });
      }
    }
    
    // Créer un guide d'utilisation pour les entrées d'air
    function createEntriesAirGuide() {
      const guideElement = document.createElement('div');
      guideElement.className = 'air-inlets-guide';
      guideElement.innerHTML = `
        <h4>Guide d'utilisation</h4>
        <p>Pour un équilibre correct de votre système VMC :</p>
        <ol>
          <li>Ajoutez une entrée d'air pour chaque fenêtre des pièces principales (séjour, chambres)</li>
          <li>Sélectionnez le type de pièce et le module approprié (débit en m³/h)</li>
          <li>Vérifiez que le débit total des entrées d'air correspond au débit total d'extraction</li>
        </ol>
        <div class="info-note">
          <div class="info-icon">ℹ️</div>
          <div>
            <p><strong>Types d'entrées d'air :</strong></p>
            <ul>
              <li><strong>Autoréglable</strong> : Débit constant quelle que soit la dépression</li>
              <li><strong>Hygroréglable</strong> : Débit variable selon l'humidité relative</li>
            </ul>
          </div>
        </div>
      `;
      
      const windowsSection = document.querySelector('.windows-vmc-integration');
      if (windowsSection && !document.querySelector('.air-inlets-guide')) {
        windowsSection.insertBefore(guideElement, windowsSection.querySelector('.windows-container'));
      }
      
      return guideElement;
    }
    
    // Ajouter à l'initialisation du module
    document.addEventListener('contentLoaded', function(event) {
      if (event.detail.section === 'verification-debit') {
        setTimeout(() => {
          initWindowsModule();
          createEntriesAirGuide();
        }, 500);
      }
    });
    
    // Vérifier périodiquement si le contenu est déjà chargé
    const windowsModuleCheck = setInterval(() => {
      if (document.querySelector('.windows-container')) {
        clearInterval(windowsModuleCheck);
        initWindowsModule();
        createEntriesAirGuide();
      }
    }, 1000);
  }
});
