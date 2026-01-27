// Module de gestion du SEO dynamique
class SEOManager {
  constructor() {
    this.defaultMeta = {
      title: 'Mémo Technique VMC - Guide complet des systèmes de ventilation',
      description: 'Documentation technique complète pour les installations VMC. Calculs de débits, types de ventilation, conseils pratiques pour professionnels et particuliers.',
      keywords: 'VMC, ventilation mécanique contrôlée, débit, installation, technique, calcul, simple flux, double flux',
      image: '/logo.png',
      url: window.location.origin
    };
  }

  updateMeta(section = 'accueil') {
    const sectionData = this.getSectionData(section);
    const meta = { ...this.defaultMeta, ...sectionData };

    // Titre de la page
    document.title = meta.title;

    // Meta description
    this.updateMetaTag('description', meta.description);

    // Meta keywords
    this.updateMetaTag('keywords', meta.keywords);

    // Open Graph
    this.updateMetaTag('og:title', meta.title, 'property');
    this.updateMetaTag('og:description', meta.description, 'property');
    this.updateMetaTag('og:image', meta.image, 'property');
    this.updateMetaTag('og:url', meta.url + window.location.pathname, 'property');
    this.updateMetaTag('og:type', 'website', 'property');

    // Twitter Card
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', meta.title, 'name');
    this.updateMetaTag('twitter:description', meta.description, 'name');
    this.updateMetaTag('twitter:image', meta.image, 'name');

    // Structured Data (JSON-LD)
    this.updateStructuredData(meta, section);
  }

  updateMetaTag(name, content, attribute = 'name') {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  }

  updateStructuredData(meta, section) {
    // Supprimer l'ancien structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mémo Technique VMC",
      "description": meta.description,
      "url": meta.url,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "author": {
        "@type": "Organization",
        "name": "Mémo VMC"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mémo VMC"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  getSectionData(section) {
    const sectionMeta = {
      'accueil': {
        title: 'Mémo Technique VMC - Guide complet des systèmes de ventilation',
        description: 'Documentation technique complète pour les installations VMC. Calculs de débits, types de ventilation, conseils pratiques.',
        keywords: 'VMC, ventilation, technique, guide, calculs'
      },
      'verification-debit': {
        title: 'Calculateur de Débits VMC - Vérification des performances',
        description: 'Outil de calcul et vérification des débits VMC selon les normes. Simple flux, double flux, hygroréglable.',
        keywords: 'débit VMC, calcul débit, vérification, performance, norme'
      },
      'vmc-simple': {
        title: 'VMC Simple Flux - Principe et installation',
        description: 'Guide complet de la VMC simple flux : fonctionnement, types, dimensions, débits réglementaires.',
        keywords: 'VMC simple flux, autoréglable, hygroréglable, installation'
      },
      'vmc-double': {
        title: 'VMC Double Flux - Ventilation haute performance',
        description: 'Système VMC double flux : récupération de chaleur, filtration, économies d\'énergie.',
        keywords: 'VMC double flux, récupération chaleur, filtration, performance'
      }
    };

    return sectionMeta[section] || sectionMeta['accueil'];
  }
}

// Initialisation du SEO manager
document.addEventListener('DOMContentLoaded', () => {
  window.seoManager = new SEOManager();
  window.seoManager.updateMeta('accueil');
});

// Écouter les changements de section
document.addEventListener('contentLoaded', (event) => {
  if (window.seoManager) {
    window.seoManager.updateMeta(event.detail.section);
  }
});

export { SEOManager };