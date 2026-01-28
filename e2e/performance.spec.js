import { test, expect } from '@playwright/test';

test.describe('Performance et Responsive Design', () => {

  test('Page se charge rapidement', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // La page devrait se charger en moins de 3 secondes
    expect(loadTime).toBeLessThan(3000);

    // Vérifier que les ressources critiques sont chargées
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('Taille du bundle est optimisée', async ({ page }) => {
    // Intercepter les requêtes pour mesurer les tailles
    const requests = [];

    page.on('request', request => {
      requests.push(request);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Trouver les fichiers JS principaux
    const jsRequests = requests.filter(req =>
      req.url().includes('.js') &&
      !req.url().includes('node_modules') &&
      !req.url().includes('playwright')
    );

    // Vérifier qu'il y a des fichiers JS chargés
    expect(jsRequests.length).toBeGreaterThan(0);

    // Les fichiers JS devraient être minifiés (taille raisonnable)
    // Cette vérification est approximative
    for (const req of jsRequests) {
      if (req.url().includes('script.js') || req.url().includes('verification-debit.js')) {
        // Fichiers principaux devraient être < 50KB chacun
        const response = await req.response();
        if (response) {
          const contentLength = response.headers()['content-length'];
          if (contentLength) {
            expect(parseInt(contentLength)).toBeLessThan(50000);
          }
        }
      }
    }
  });

  test('Images sont optimisées', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Vérifier que les images ont des attributs de performance
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      // Vérifier loading="lazy" si applicable
      const loading = await img.getAttribute('loading');
      // Pas toutes les images ont lazy loading, mais c'est bien si présent

      // Vérifier les dimensions
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');

      // Les images devraient avoir des dimensions définies pour éviter le CLS
      if (width && height) {
        expect(parseInt(width)).toBeGreaterThan(0);
        expect(parseInt(height)).toBeGreaterThan(0);
      }
    }
  });

  test.describe('Responsive Design', () => {
    test('Desktop - Layout normal', async ({ page }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Vérifier que le menu principal est visible
      await expect(page.locator('#mainMenu')).toBeVisible();

      // Vérifier que le menu hamburger n'est pas visible
      await expect(page.locator('#menuToggle')).not.toBeVisible();

      // Vérifier la grille de contenu
      const mainContent = page.locator('#main-content');
      const boundingBox = await mainContent.boundingBox();
      expect(boundingBox?.width).toBeGreaterThan(800);
    });

    test('Tablet - Layout adapté', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Vérifier que le contenu s'adapte
      const mainContent = page.locator('#main-content');
      const boundingBox = await mainContent.boundingBox();
      expect(boundingBox?.width).toBeLessThanOrEqual(768);

      // Vérifier que les éléments sont encore accessibles
      await expect(page.locator('#mainMenu')).toBeVisible();
    });

    test('Mobile - Menu hamburger', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Vérifier que le menu hamburger est visible
      const menuToggle = page.locator('#menuToggle');
      await expect(menuToggle).toBeVisible();

      // Ouvrir le menu
      await menuToggle.click();

      // Vérifier que le menu se déroule
      await expect(page.locator('#mainMenu')).toHaveClass(/active/);

      // Fermer le menu
      await menuToggle.click();
      await expect(page.locator('#mainMenu')).not.toHaveClass(/active/);
    });

    test('Mobile - Calculateur fonctionne', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.click('a[href="#verification-debit"]');
      await page.waitForSelector('.calculator-container');

      // Vérifier que le calculateur est utilisable sur mobile
      await expect(page.locator('#typeLogement')).toBeVisible();
      await expect(page.locator('#typeVMC')).toBeVisible();

      // Tester un calcul simple
      await page.selectOption('#typeLogement', 'T2');
      await page.selectOption('#typeVMC', 'simple-flux');
      await page.click('#btnAjouterPiece');
      await page.waitForSelector('.mesure-item');
      await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
      await page.fill('.mesure-item input[name="debit"]', '45');

      // Vérifier que les résultats sont visibles
      await expect(page.locator('#resultats')).toBeVisible();
    });

    test('Mobile - Boutons tactiles adaptés', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.click('a[href="#verification-debit"]');
      await page.waitForSelector('.calculator-container');

      // Vérifier que les boutons ont une taille minimale pour les écrans tactiles
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();

      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const boundingBox = await button.boundingBox();

        if (boundingBox) {
          // Les boutons devraient faire au moins 44px de hauteur pour l'accessibilité tactile
          expect(boundingBox.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });

  test('Service Worker fonctionne', async ({ page }) => {
    // Vérifier que le service worker est enregistré
    const swRegistered = await page.evaluate(() => {
      return navigator.serviceWorker.controller !== null;
    });

    // Le service worker devrait être enregistré pour les PWA
    expect(swRegistered).toBeTruthy();
  });

  test('Cache fonctionne pour les ressources statiques', async ({ page }) => {
    // Première visite
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Mesurer le temps de chargement initial
    const startTime1 = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime1 = Date.now() - startTime1;

    // Deuxième visite (devrait être plus rapide grâce au cache)
    const startTime2 = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime2 = Date.now() - startTime2;

    // Le deuxième chargement devrait être plus rapide
    expect(loadTime2).toBeLessThanOrEqual(loadTime1);
  });
});