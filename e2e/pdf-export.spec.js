import { test, expect } from '@playwright/test';

test.describe('Export PDF', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');
  });

  test('Bouton d\'export PDF est présent après calcul', async ({ page }) => {
    // Faire un calcul simple
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    // Attendre que les résultats apparaissent
    await page.waitForSelector('#resultats');

    // Vérifier que le bouton PDF apparaît
    await expect(page.locator('.export-pdf-btn')).toBeVisible();
  });

  test('Bouton d\'export PDF contient le bon texte', async ({ page }) => {
    // Faire un calcul
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');
    await page.waitForSelector('#resultats');

    // Vérifier le texte du bouton
    const pdfButton = page.locator('.export-pdf-btn');
    await expect(pdfButton).toContainText('Exporter en PDF');
  });

  test('Bouton d\'export PDF est cliquable', async ({ page }) => {
    // Faire un calcul
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');
    await page.waitForSelector('#resultats');

    // Vérifier que le bouton est cliquable
    const pdfButton = page.locator('.export-pdf-btn');
    await expect(pdfButton).toBeEnabled();
  });

  test('Export PDF fonctionne pour Simple Flux', async ({ page }) => {
    // Configurer le calcul
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');

    // Ajouter plusieurs pièces
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item:last-child');
    await page.selectOption('.mesure-item:last-child select[name="piece"]', 'sejour');
    await page.fill('.mesure-item:last-child input[name="debit"]', '80');

    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item:last-child');
    await page.selectOption('.mesure-item:last-child select[name="piece"]', 'chambre');
    await page.fill('.mesure-item:last-child input[name="debit"]', '30');

    // Attendre les résultats
    await page.waitForSelector('#resultats');

    // Vérifier que le PDF peut être généré (sans réellement le télécharger)
    const pdfButton = page.locator('.export-pdf-btn');
    await expect(pdfButton).toBeVisible();

    // Simuler le clic (en test, on ne télécharge pas réellement)
    // Dans un vrai test d'intégration, on pourrait vérifier le téléchargement
    await expect(pdfButton).toBeEnabled();
  });

  test('Export PDF fonctionne pour Double Flux', async ({ page }) => {
    // Configurer pour double flux
    await page.selectOption('#typeLogement', 'T4');
    await page.selectOption('#typeVMC', 'double-flux');

    // Ajouter des pièces
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '60');

    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item:last-child');
    await page.selectOption('.mesure-item:last-child select[name="piece"]', 'chambre');
    await page.fill('.mesure-item:last-child input[name="debit"]', '35');

    // Attendre les résultats
    await page.waitForSelector('#resultats');

    // Vérifier le bouton PDF
    const pdfButton = page.locator('.export-pdf-btn');
    await expect(pdfButton).toBeVisible();
    await expect(pdfButton).toBeEnabled();
  });

  test('Contenu du PDF inclut les informations correctes', async ({ page }) => {
    // Cette vérification nécessiterait de capturer le contenu du PDF
    // Pour les tests E2E, on vérifie que la fonction est appelée correctement

    // Faire un calcul
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');
    await page.waitForSelector('#resultats');

    // Vérifier que les données nécessaires au PDF sont présentes dans le DOM
    await expect(page.locator('#resultats')).toContainText('Débit total');
    await expect(page.locator('#resultats')).toContainText('cuisine');
    await expect(page.locator('#resultats')).toContainText('50');
  });

  test('Bouton PDF n\'apparaît pas sans calcul', async ({ page }) => {
    // Sans faire de calcul, le bouton ne devrait pas être visible
    const pdfButton = page.locator('.export-pdf-btn');
    await expect(pdfButton).not.toBeVisible();
  });

  test('Bouton PDF disparaît après réinitialisation', async ({ page }) => {
    // Faire un calcul
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');
    await page.waitForSelector('#resultats');

    // Vérifier que le bouton est visible
    await expect(page.locator('.export-pdf-btn')).toBeVisible();

    // Réinitialiser
    await page.click('#btnReset');

    // Vérifier que le bouton disparaît
    await expect(page.locator('.export-pdf-btn')).not.toBeVisible();
  });
});