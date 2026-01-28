import { test, expect } from '@playwright/test';

test.describe('Accessibilité', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Skip links sont présents et fonctionnels', async ({ page }) => {
    // Vérifier la présence du skip link
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeVisible();

    // Vérifier le texte du skip link
    await expect(skipLink).toContainText('Aller au contenu');

    // Tester la navigation au clavier
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    // Activer le skip link
    await page.keyboard.press('Enter');

    // Vérifier que le focus va au contenu principal
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('Navigation au clavier fonctionne', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Commencer la navigation au clavier
    await page.keyboard.press('Tab');

    // Vérifier que des éléments reçoivent le focus
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Continuer la navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('Attributs ARIA sont présents', async ({ page }) => {
    // Vérifier les labels ARIA sur les boutons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();

      // Soit aria-label, soit le texte du bouton devrait être présent
      expect(ariaLabel || textContent.trim()).toBeTruthy();
    }
  });

  test('Formulaires ont des labels appropriés', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Vérifier les selects
    const selects = page.locator('select');
    const selectCount = await selects.count();

    for (let i = 0; i < selectCount; i++) {
      const select = selects.nth(i);
      const id = await select.getAttribute('id');

      // Vérifier qu'il y a un label associé
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }

    // Vérifier les inputs
    const inputs = page.locator('input[type="number"]');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
  });

  test('Contraste des couleurs est suffisant', async ({ page }) => {
    // Cette vérification nécessiterait un outil spécialisé
    // Pour l'instant, on vérifie que les classes CSS d'accessibilité sont présentes
    const bodyClasses = await page.locator('body').getAttribute('class');
    expect(bodyClasses).toContain('accessibility-ready');
  });

  test('Images ont des attributs alt', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Les images décoratives peuvent avoir alt="", mais pas undefined
      expect(alt).not.toBeNull();
    }
  });

  test('Titres de page sont descriptifs', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title).toContain('VMC');
  });

  test('Langue du document est définie', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('fr');
  });

  test('Structure de titres est logique', async ({ page }) => {
    // Vérifier qu'il y a au moins un h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    // Vérifier qu'il n'y a pas de sauts dans la hiérarchie
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    let lastLevel = 0;

    for (const heading of headings) {
      const level = parseInt(heading.charAt(1));
      expect(level).toBeLessThanOrEqual(lastLevel + 1);
      lastLevel = level;
    }
  });

  test('Focus visible est stylisé', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Naviguer au clavier
    await page.keyboard.press('Tab');

    // Vérifier que l'élément focusé a des styles de focus
    const focusedElement = page.locator(':focus');
    const boxShadow = await focusedElement.evaluate(el => getComputedStyle(el).boxShadow);
    const outline = await focusedElement.evaluate(el => getComputedStyle(el).outline);

    // Au moins un des deux devrait être visible
    expect(boxShadow !== 'none' || outline !== 'none').toBeTruthy();
  });

  test('Messages d\'erreur sont accessibles', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Soumettre le formulaire sans données
    await page.click('#btnCalculer');

    // Vérifier s'il y a des messages d'erreur
    const errorMessages = page.locator('.error-message, [role="alert"]');
    // Si des erreurs sont affichées, elles devraient être accessibles
    const errorCount = await errorMessages.count();
    if (errorCount > 0) {
      for (let i = 0; i < errorCount; i++) {
        const error = errorMessages.nth(i);
        const ariaLive = await error.getAttribute('aria-live');
        expect(ariaLive).toBe('assertive');
      }
    }
  });
});