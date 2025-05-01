/**
 * Helpers de débogage et correctifs pour les erreurs courantes
 */

(function() {
  // Prévenir les erreurs avec les scripts bloqués par CORS
  window.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'SCRIPT') {
      console.log('Script loading error handled:', e.target.src);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
  
  // Gérer les références null pour getElementById
  const originalGetElementById = document.getElementById;
  document.getElementById = function(id) {
    const element = originalGetElementById.call(document, id);
    if (!element) {
      console.warn(`getElementById('${id}') returned null - creating placeholder`);
      const placeholder = document.createElement('div');
      placeholder.id = id;
      placeholder.style.display = 'none';
      document.body.appendChild(placeholder);
      return placeholder;
    }
    return element;
  };
  
  // Shim pour AdSense
  if (!window.adsbygoogle) {
    window.adsbygoogle = {
      loaded: true,
      push: function(obj) {
        console.log('AdSense mock called with:', obj);
      }
    };
  }
  
  // Récupérer les erreurs de préchargement pour les images
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.endsWith('logo-192.png') && entry.initiatorType === 'link') {
        console.log('Preload unused:', entry.name);
      }
    });
  });
  
  try {
    observer.observe({type: 'resource', buffered: true});
  } catch(e) {
    console.warn('PerformanceObserver not supported:', e);
  }
  
  console.log('Debug helpers loaded - handling CORS and null element errors');
})();
