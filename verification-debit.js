// Outil de vérification des débits VMC
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter le module de vérification des débits au contenu existant
  const vmcContent = window.vmcContent || {};
  
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
  
  // Module de vérification des débits
  vmcContent['verification-debit'] = {
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
  
  // Si le contenu est chargé, mettre à jour l'objet global
  if (window.vmcContent) {
    window.vmcContent['verification-debit'] = vmcContent['verification-debit'];
  }
  
  // Initialiser la page de vérification des débits si elle est chargée
  const contentLoaded = setInterval(() => {
    if (document.querySelector('.calculator-container')) {
      clearInterval(contentLoaded);
      initVerificationDebit();
    }
  }, 100);
  
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
    ajouterChampsMesure('cuisine');
    ajouterChampsMesure('salle-de-bain');
    ajouterChampsMesure('wc');
    
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
    typeLogement.addEventListener('change', updateReferenceTable);
    typeVMC.addEventListener('change', updateReferenceTable);
    
    btnAjouterPiece.addEventListener('click', () => {
      ajouterChampsMesure();
      // Lancer une vérification après ajout d'une pièce
      setTimeout(verifierConformite, 50);
    });
    
    btnConvert.addEventListener('click', () => {
      const value = parseFloat(valueToConvert.value);
      const from = fromUnit.value;
      const to = toUnit.value;
      const diam = parseFloat(diametreConversion.value);
      
      if (isNaN(value)) {
        conversionResult.innerHTML = '<p class="error">Veuillez entrer une valeur numérique valide.</p>';
        return;
      }
      
      let result;
      
      // Conversions de débit à vitesse et vice-versa nécessitent un diamètre
      if ((from === 'm3h' && to === 'ms') || (from === 'ms' && to === 'm3h')) {
        if (isNaN(diam) || diam <= 0) {
          conversionResult.innerHTML = '<p class="error">Diamètre invalide. Doit être supérieur à 0.</p>';
          return;
        }
        
        if (from === 'm3h' && to === 'ms') {
          result = conversions.m3h_to_ms(value, diam);
        } else {
          result = conversions.ms_to_m3h(value, diam);
        }
      } 
      // Conversions entre pression en Pa et mm CE
      else if ((from === 'pa' && to === 'mmce') || (from === 'mmce' && to === 'pa')) {
        if (from === 'pa' && to === 'mmce') {
          result = conversions.pa_to_mmce(value);
        } else {
          result = conversions.mmce_to_pa(value);
        }
      }
      // Pas de conversion nécessaire si même unité
      else if (from === to) {
        result = value;
      }
      else {
        conversionResult.innerHTML = '<p class="error">Conversion non disponible.</p>';
        return;
      }
      
      conversionResult.innerHTML = `<p>${value} ${getUniteAffichage(from)} = ${result.toFixed(2)} ${getUniteAffichage(to)}</p>`;
    });
    
    // Afficher/cacher le champ de diamètre en fonction de l'unité sélectionnée
    for (const unite of unites) {
      unite.addEventListener('change', function() {
        if (this.value === 'ms') {
          diametreContainer.classList.remove('hidden');
        } else {
          diametreContainer.classList.add('hidden');
        }
      });
    }
    
    fromUnit.addEventListener('change', updateConversionFields);
    toUnit.addEventListener('change', updateConversionFields);
    
    updateConversionFields();
    
    function updateConversionFields() {
      const from = fromUnit.value;
      const to = toUnit.value;
      
      if ((from === 'm3h' && to === 'ms') || (from === 'ms' && to === 'm3h')) {
        diametreConversionContainer.style.display = 'block';
      } else {
        diametreConversionContainer.style.display = 'none';
      }
      
      conversionResult.innerHTML = '';
    }
    
    function updateReferenceTable() {
      const logement = typeLogement.value;
      const vmc = typeVMC.value;
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
      
      // Mettre à jour les résultats après changement de référence
      verifierConformite();
    }
    
    function ajouterChampsMesure(type = null) {
      const div = document.createElement('div');
      div.className = 'mesure-item';
      
      let pieceOptions = `
        <option value="cuisine" ${type === 'cuisine' ? 'selected' : ''}>Cuisine</option>
        <option value="salle-de-bain" ${type === 'salle-de-bain' ? 'selected' : ''}>Salle de bain principale</option>
        <option value="wc" ${type === 'wc' ? 'selected' : ''}>WC</option>
        <option value="autre-sdb" ${type === 'autre-sdb' ? 'selected' : ''}>Autre salle d'eau</option>
      `;
      
      div.innerHTML = `
        <div class="mesure-row">
          <div class="form-group">
            <label>Pièce :</label>
            <select class="piece-type form-control auto-update">
              ${pieceOptions}
            </select>
          </div>
          <div class="form-group">
            <label>Débit mesuré :</label>
            <input type="number" class="debit-mesure form-control" step="0.01">
          </div>
          <button class="btn-remove">✕</button>
        </div>
        <div class="mesure-status"></div>
      `;
      
      div.querySelector('.btn-remove').addEventListener('click', function() {
        mesuresContainer.removeChild(div);
        verifierConformite();
      });
      
      mesuresContainer.appendChild(div);
    }
    
    function verifierConformite() {
      const logement = typeLogement.value;
      const vmc = typeVMC.value;
      const uniteSelectionnee = document.querySelector('input[name="unite"]:checked').value;
      const diametreValeur = parseFloat(diametre.value);
      
      const debits = debitsReglementaires[vmc][logement];
      const mesures = [];
      
      // Collecter toutes les mesures
      document.querySelectorAll('.mesure-item').forEach(item => {
        const piece = item.querySelector('.piece-type').value;
        const valeurInput = item.querySelector('.debit-mesure').value;
        const valeurMesure = valeurInput ? parseFloat(valeurInput) : null;
        const statusElement = item.querySelector('.mesure-status');
        
        // Effacer le statut précédent
        statusElement.innerHTML = '';
        
        if (valeurMesure !== null && !isNaN(valeurMesure)) {
          // Convertir en m³/h si nécessaire
          let valeurM3h = valeurMesure;
          
          if (uniteSelectionnee === 'ms') {
            if (isNaN(diametreValeur) || diametreValeur <= 0) {
              statusElement.innerHTML = '<p class="error">Diamètre invalide</p>';
              return;
            }
            valeurM3h = conversions.ms_to_m3h(valeurMesure, diametreValeur);
          }
          
          const pieceDebit = debits[piece];
          if (pieceDebit) {
            let etat;
            let message;
            
            if (valeurM3h < pieceDebit.min) {
              etat = 'error';
              message = 'DÉBIT INSUFFISANT';
            } else if (valeurM3h > pieceDebit.max) {
              etat = 'error';
              message = 'DÉBIT TROP ÉLEVÉ';
            } else {
              etat = 'success';
              message = 'CONFORME';
            }
            
            // Afficher le statut directement sous chaque mesure
            statusElement.innerHTML = `<p class="${etat}">${message} (Valeur: ${valeurM3h.toFixed(1)} m³/h, Requis: ${pieceDebit.min}-${pieceDebit.max} m³/h)</p>`;
          }
          
          mesures.push({
            piece,
            valeurOriginale: valeurMesure,
            valeurM3h,
            unite: uniteSelectionnee
          });
        }
      });
      
      if (mesures.length === 0) {
        resultats.innerHTML = '<p class="notice">Entrez des mesures pour voir les résultats.</p>';
        return;
      }
      
      // Analyser les résultats
      let resultsHTML = '<h3>Résultats de l\'analyse</h3>';
      let totalTropFaible = 0;
      let totalTropEleve = 0;
      let totalConforme = 0;
      
      resultsHTML += `
        <table class="results-table">
          <tr>
            <th>Pièce</th>
            <th>Mesure (${getUniteAffichage(uniteSelectionnee)})</th>
            <th>Débit (m³/h)</th>
            <th>Min requis</th>
            <th>Max requis</th>
            <th>État</th>
          </tr>
      `;
      
      mesures.forEach(mesure => {
        const pieceDebit = debits[mesure.piece];
        
        if (!pieceDebit) {
          resultsHTML += `
            <tr>
              <td>${getNomPiece(mesure.piece)}</td>
              <td>${mesure.valeurOriginale.toFixed(2)}</td>
              <td>${mesure.valeurM3h.toFixed(2)}</td>
              <td>-</td>
              <td>-</td>
              <td class="warning">Type de pièce non trouvé</td>
            </tr>
          `;
          return;
        }
        
        let etat;
        if (mesure.valeurM3h < pieceDebit.min) {
          etat = 'error';
          totalTropFaible++;
        } else if (mesure.valeurM3h > pieceDebit.max) {
          etat = 'error';
          totalTropEleve++;
        } else {
          etat = 'success';
          totalConforme++;
        }
        
        resultsHTML += `
          <tr>
            <td>${getNomPiece(mesure.piece)}</td>
            <td>${mesure.valeurOriginale.toFixed(2)}</td>
            <td>${mesure.valeurM3h.toFixed(2)}</td>
            <td>${pieceDebit.min}</td>
            <td>${pieceDebit.max}</td>
            <td class="${etat}">${getEtatMessage(etat, mesure.valeurM3h, pieceDebit.min, pieceDebit.max)}</td>
          </tr>
        `;
      });
      
      resultsHTML += '</table>';
      
      // Résumé global
      const totalMesures = mesures.length;
      const pourcentageConforme = (totalConforme / totalMesures) * 100;
      
      resultsHTML += `
        <div class="results-summary ${pourcentageConforme === 100 ? 'success' : pourcentageConforme >= 50 ? 'warning' : 'error'}">
          <h4>Résumé de l'installation</h4>
          <p>${totalConforme} sur ${totalMesures} points de mesure conformes (${pourcentageConforme.toFixed(0)}%)</p>
          <p>Diagnostic : ${getDiagnosticMessage(pourcentageConforme, totalTropFaible, totalTropEleve)}</p>
        </div>
      `;
      
      resultats.innerHTML = resultsHTML;
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
  }
});
