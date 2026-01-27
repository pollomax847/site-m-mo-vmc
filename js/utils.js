// Utilitaires pour le DOM sécurisé
export const safeGetElementById = (id) => {
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

// Surcharger getElementById pour éviter les erreurs null
export const overrideGetElementById = () => {
  const originalGetElementById = document.getElementById;
  document.getElementById = function(id) {
    const element = originalGetElementById.call(document, id);
    return element || safeGetElementById(id);
  };
};