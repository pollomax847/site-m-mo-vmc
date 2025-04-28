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
      
      function updateConversionFields() {
        if (!fromUnit || !toUnit || !diametreConversionContainer) return;
        
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if ((from === 'm3h' && to === 'ms') || (from === 'ms' && to === 'm3h')) {
          diametreConversionContainer.style.display = 'block';
        } else {
          diametreConversionContainer.style.display = 'none';
        }
        
        if (conversionResult) conversionResult.innerHTML = '';
      }
      
      function updateReferenceTable() {
        if (!referenceTableContainer || !typeLogement || !typeVMC) {
          console.error("Éléments manquants pour mettre à jour le tableau de référence");
          return;
        }
        
        const logement = typeLogement.value;
        const vmc = typeVMC.value;
        
        // Vérification des données de débit
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
      
      function ajouterChampsMesure(type = null) {
        const typeLogement = document.getElementById('typeLogement');
        const typeLogementVal = typeLogement ? typeLogement.value : 'T3';
        
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
        
        // Vérifier la conformité après l'ajout des champs
        setTimeout(verifierConformite, 100);
      }
      
      function verifierConformite() {
        if (!resultats) return;
        
        const typeLogementVal = typeLogement ? typeLogement.value : 'T3';
        const typeVMCVal = typeVMC ? typeVMC.value : 'simple-flux';
        const uniteSelectionnee = document.querySelector('input[name="unite"]:checked').value;
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

      // Initialisation réussie
      console.log("Interface de vérification des débits initialisée avec succès");
    }
  }
});
