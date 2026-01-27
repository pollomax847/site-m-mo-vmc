import { vmcContent } from './vmc-content.js';

// Fonction de recherche
export function search() {
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
  document.getElementById('main-content').innerHTML = resultsHtml;
}

// Initialisation de la recherche
export function initSearch() {
  document.getElementById('searchButton').addEventListener('click', function() {
    search();
  });

  document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      search();
    }
  });
}