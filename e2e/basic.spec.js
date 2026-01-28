import { test, expect } from '@playwright/test';

test.describe('Mémo VMC - Tests Fonctionnels', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
    // Attendre un peu plus pour que le JS s'initialise
    await page.waitForTimeout(2000);
  });

  test('Page d\'accueil se charge correctement', async ({ page }) => {
    // Vérifier le titre
    await expect(page).toHaveTitle(/Mémo Technique VMC/);

    // Vérifier la présence du contenu principal
    await expect(page.locator('#main-content')).toBeVisible();

    // Vérifier le logo
    await expect(page.locator('#logo')).toBeVisible();

    // Vérifier la navigation
    await expect(page.locator('#mainMenu')).toBeVisible();
  });

  test('Navigation fonctionne correctement', async ({ page }) => {
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
    
    // Cliquer sur "Vérification des Débits"
    await page.click('a[href="#verification-debit"]');

    // Attendre que le contenu se charge (plus long pour le JS)
    await page.waitForSelector('.calculator-container', { timeout: 10000 });

    // Attendre que le contenu soit réellement chargé
    await page.waitForFunction(() => {
      const container = document.querySelector('.calculator-container');
      return container && container.innerHTML.includes('typeLogement');
    });

    // Vérifier que la section de calcul est visible
    await expect(page.locator('.calculator-container')).toBeVisible();

    // Vérifier que les champs de formulaire sont présents
    await expect(page.locator('#typeLogement')).toBeVisible();
    await expect(page.locator('#typeVMC')).toBeVisible();
  });

  test('Calculateur de débits fonctionne', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Remplir le formulaire
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');

    // Attendre que les champs de mesure soient présents
    await page.waitForSelector('.mesure-item');

    // Remplir les champs de mesure existants
    const firstMesureItem = page.locator('.mesure-item').first();
    await firstMesureItem.locator('.piece-type').selectOption('cuisine');
    await firstMesureItem.locator('.debit-mesure').fill('50');

    // Vérifier les résultats
    await expect(page.locator('#resultats')).toBeVisible();
  });

  test('Mode sombre/clair fonctionne', async ({ page }) => {
    // Vérifier le bouton de thème
    const themeButton = page.locator('#themeToggle');
    await expect(themeButton).toBeVisible();

    // Cliquer pour changer de thème
    await themeButton.click();

    // Vérifier que le thème a changé (attribut data-theme)
    await expect(page.locator('html[data-theme="dark"]')).toBeVisible();

    // Cliquer à nouveau pour revenir
    await themeButton.click();
    await expect(page.locator('html[data-theme="light"]')).toBeVisible();
  });

  test('Recherche fonctionne', async ({ page }) => {
    // Saisir un terme de recherche
    await page.fill('#searchInput', 'simple flux');
    await page.click('#searchButton');

    // Vérifier que des résultats apparaissent
    await expect(page.locator('#main-content')).toContainText('Simple Flux');
  });

  test('Accessibilité - Skip link fonctionne', async ({ page }) => {
    // Vérifier la présence du skip link
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeVisible();

    // Le skip link devrait être visible au focus clavier
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
  });

  test('Accessibilité - Navigation clavier', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Tester la navigation au clavier
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Vérifier qu'un élément a le focus
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Export PDF fonctionne', async ({ page }) => {
    // Aller à la section calcul
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');

    // Remplir un calcul simple
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    // Attendre que le bouton PDF apparaisse
    await page.waitForSelector('.export-pdf-btn');

    // Cliquer sur export PDF (mais ne pas télécharger réellement en test)
    // Pour les tests, on vérifie juste que le bouton existe et est cliquable
    const pdfButton = page.locator('.export-pdf-btn');
    await expect(pdfButton).toBeVisible();
    await expect(pdfButton).toBeEnabled();
  });

  test('Responsive design - Mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Vérifier que le menu hamburger est visible
      await expect(page.locator('#menuToggle')).toBeVisible();

      // Ouvrir le menu
      await page.click('#menuToggle');
      await expect(page.locator('#mainMenu')).toHaveClass(/active/);
    }
  });

  test('Performance - Page se charge rapidement', async ({ page }) => {
    // Mesurer le temps de chargement
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // La page devrait se charger en moins de 3 secondes
    expect(loadTime).toBeLessThan(3000);
  });

  test('SEO - Meta tags présents', async ({ page }) => {
    // Vérifier les meta tags essentiels
    const title = await page.title();
    expect(title).toContain('VMC');

    // Vérifier la meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /VMC/);

    // Vérifier Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /VMC/);
  });
});