/* Lightweight DSC relay helper
   Provides a small interactive renderer/editor for relay terminal mappings.
   Usage: window.vmcDSCRelayHelper.render(selector, modelId)
   - selector: CSS selector of container element
   - modelId: identifier matching window.vmcDSCModels[modelId]

   This is an aid only — do NOT use as a substitute for manufacturer
   documentation. Always verify with the official manual before wiring.
*/
(function(){
  'use strict';
  function getModel(id){
    if(!window.vmcDSCModels) return null;
    return window.vmcDSCModels[id] || null;
  }

  function renderTable(container, model){
    var table = document.createElement('table');
    table.className = 'vmc-relay-table';
    var thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Borne</th><th>Étiquette</th><th>Fonction (suggestion)</th></tr>';
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    if(model && Array.isArray(model.terminals) && model.terminals.length){
      model.terminals.forEach(function(t){
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>'+(t.number||'—')+'</td>'+
                       '<td>'+(t.label||'—')+'</td>'+
                       '<td>'+(t.function||'—')+'</td>';
        tbody.appendChild(tr);
      });
    } else {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3">Aucune donnée modèle disponible. Utilisez l\'éditeur ci‑dessous.</td>';
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);
  }

  function renderEditor(container, modelId){
    var details = document.createElement('details');
    details.className = 'vmc-relay-editor';
    details.innerHTML = '<summary>Éditeur / Appliquer un mapping JSON</summary>'+
      '<p>Collez ici un objet JSON décrivant le modèle. Ex: { "terminals": [{"number":1,"label":"C","function":"commun"}, {"number":2,"label":"NO","function":"normalement ouvert"}] }</p>'+
      '<textarea style="width:100%;min-height:8rem" aria-label="Mapping JSON"></textarea>'+
      '<div style="margin-top:8px"><button class="vmc-apply">Appliquer</button> <button class="vmc-reset">Réinitialiser</button></div>';
    container.appendChild(details);
    var ta = details.querySelector('textarea');
    var btn = details.querySelector('.vmc-apply');
    var btnReset = details.querySelector('.vmc-reset');
    btn.addEventListener('click', function(){
      var raw = ta.value.trim();
      if(!raw) return alert('Collez du JSON valide pour appliquer.');
      try{
        var parsed = JSON.parse(raw);
        window.vmcDSCModels = window.vmcDSCModels || {};
        window.vmcDSCModels[modelId] = parsed;
        // re-render the container
        var parent = container.parentNode;
        container.innerHTML = '';
        render(container, modelId);
      }catch(e){
        alert('JSON invalide: '+e.message);
      }
    });
    btnReset.addEventListener('click', function(){
      ta.value = '';
    });
  }

  function render(containerSelector, modelId){
    var el = document.querySelector(containerSelector);
    if(!el) return console.warn('vmcRelayHelper: container not found', containerSelector);
    el.innerHTML = '';
    var note = document.createElement('div');
    note.className = 'vmc-relay-note';
    note.innerHTML = '<strong>Outil d\'aide branchement relais (indicatif)</strong><p>Ce tableau est fourni à titre informatif. Ne branchez rien sans vérifier le manuel constructeur et, si nécessaire, demander l\'avis d\'un électricien qualifié.</p>';
    el.appendChild(note);
    var model = getModel(modelId);
    renderTable(el, model);
    renderEditor(el, modelId);
  }

  // Expose API
  window.vmcDSCRelayHelper = {
    render: render,
    getModel: getModel
  };
})();
