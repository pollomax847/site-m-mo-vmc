# Exemple de configuration de tests et d’accessibilité pour site-m-mo-vmc

## 1. Tests automatisés avec Jest

### Installation (à faire dans le dossier web/)

```bash
npm init -y
npm install --save-dev jest
```

### Exemple de test (web/__tests__/calculateur.test.js)
```js
// Exemple de test unitaire pour une fonction de calcul
const { calculerDebit } = require('../dsc-constructeurs');

test('calcule le débit pour un T3 simple flux', () => {
  expect(calculerDebit('T3', 'simple-flux')).toBe(90); // valeur attendue à adapter
});
```

### Ajoutez dans package.json :
```json
"scripts": {
  "test": "jest"
}
```

## 2. Accessibilité automatisée avec axe-core

### Installation
```bash
npm install --save-dev axe-core jest-axe
```

### Exemple de test d’accessibilité (web/__tests__/accessibility.test.js)
```js
const { axe, toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);

const fs = require('fs');
const html = fs.readFileSync('../index.html', 'utf8');

test('la page d’accueil est accessible', async () => {
  const results = await axe(html);
  expect(results).toHaveNoViolations();
});
```

---

- Placez vos tests dans le dossier `web/__tests__/`.
- Lancez les tests avec `npm test`.
- Pour l’accessibilité, vous pouvez aussi utiliser Lighthouse dans Chrome DevTools.

Adaptez les exemples selon vos fonctions et votre structure.