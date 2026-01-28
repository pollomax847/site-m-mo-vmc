# Mémo Technique VMC

Documentation technique interactive pour les différents types d'installations VMC (Ventilation Mécanique Contrôlée).

## Fonctionnalités

- 🧮 **Calculateur de débits VMC** : Vérification des débits pour installations Simple Flux et Double Flux
- 📱 **Responsive Design** : Optimisé pour desktop, tablette et mobile
- 🌙 **Mode sombre/clair** : Thème adaptatif avec sauvegarde des préférences
- 📄 **Export PDF** : Génération de rapports PDF des calculs
- ♿ **Accessibilité** : Conformité WCAG 2.1 avec navigation clavier et lecteurs d'écran
- 🔍 **Recherche** : Recherche en temps réel dans le contenu
- 📊 **Analytics** : Suivi Google Analytics 4 avec respect RGPD
- ⚡ **Performance** : PWA avec service worker et cache offline
- 🧪 **Tests complets** : Tests unitaires et E2E avec Jest et Playwright

## Installation

```bash
# Cloner le repository
git clone <repository-url>
cd site-m-mo-vmc

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de développement Vite
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm start            # Serveur de production

# Tests
npm test             # Tests unitaires (Jest)
npm run test:e2e     # Tests E2E (Playwright)
npm run test:e2e:ui  # Tests E2E avec interface graphique
npm run test:e2e:headed  # Tests E2E en mode visible
```

## Tests E2E

Le projet inclut une suite complète de tests E2E avec Playwright qui couvre :

### Tests fonctionnels (`e2e/basic.spec.js`)
- Chargement de la page d'accueil
- Navigation entre sections
- Mode sombre/clair
- Recherche
- Accessibilité de base
- Performance de chargement
- SEO et meta tags

### Tests du calculateur (`e2e/calculator.spec.js`)
- Formulaire de base
- Ajout/suppression de pièces
- Calculs Simple Flux et Double Flux
- Validation des champs
- Sauvegarde/chargement des données
- Réinitialisation du formulaire

### Tests d'accessibilité (`e2e/accessibility.spec.js`)
- Skip links
- Navigation au clavier
- Attributs ARIA
- Labels de formulaires
- Contraste des couleurs
- Attributs alt des images
- Structure des titres
- Focus visible

### Tests PDF (`e2e/pdf-export.spec.js`)
- Bouton d'export après calcul
- Génération PDF Simple Flux
- Génération PDF Double Flux
- Contenu du PDF
- Comportement du bouton

### Tests performance (`e2e/performance.spec.js`)
- Temps de chargement
- Taille des bundles
- Optimisation des images
- Responsive design (desktop/tablet/mobile)
- Service Worker
- Cache des ressources

### Exécution des tests

```bash
# Tous les tests E2E
npm run test:e2e

# Tests avec navigateur visible (debug)
npm run test:e2e:headed

# Interface graphique Playwright (debug avancé)
npm run test:e2e:ui

# Tests spécifiques
npx playwright test e2e/calculator.spec.js
npx playwright test e2e/accessibility.spec.js --headed
```

### Configuration Playwright

La configuration se trouve dans `playwright.config.js` et inclut :
- Tests sur Chromium, Firefox et WebKit
- Émulation mobile (iPhone, Android)
- Captures d'écran en cas d'échec
- Rapports HTML détaillés

## Architecture

```
src/
├── js/
│   ├── theme-manager.js      # Gestion thème sombre/clair
│   ├── pdf-export.js         # Export PDF
│   ├── seo-manager.js        # SEO et meta tags
│   ├── analytics.js          # Google Analytics
│   └── ...
├── css/
│   ├── style.css            # Styles principaux
│   ├── mobile-fixes.css     # Responsive
│   └── ...
└── index.html               # Page principale

e2e/                         # Tests E2E
├── basic.spec.js
├── calculator.spec.js
├── accessibility.spec.js
├── pdf-export.spec.js
└── performance.spec.js
```

## Technologies utilisées

- **Vite** : Build tool et dev server
- **ES6 Modules** : Architecture modulaire
- **CSS Custom Properties** : Théming dynamique
- **Service Worker** : PWA et cache offline
- **Playwright** : Tests E2E cross-browser
- **Jest** : Tests unitaires
- **jsPDF + html2canvas** : Export PDF

## Déploiement

Le site est configuré pour le déploiement sur Vercel avec optimisation automatique.

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonction`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonction`)
5. Créer une Pull Request

## Licence

MIT