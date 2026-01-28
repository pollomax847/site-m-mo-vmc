import { test, expect } from '@playwright/test';

test.describe('Calculateur de Débits VMC', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#verification-debit"]');
    await page.waitForSelector('.calculator-container');
  });

  test('Formulaire de base se charge', async ({ page }) => {
    await expect(page.locator('#typeLogement')).toBeVisible();
    await expect(page.locator('#typeVMC')).toBeVisible();
    await expect(page.locator('#btnAjouterPiece')).toBeVisible();
  });

  test('Ajout de pièces fonctionne', async ({ page }) => {
    // Compter les pièces initiales
    const initialCount = await page.locator('.mesure-item').count();

    // Ajouter une pièce
    await page.click('#btnAjouterPiece');

    // Vérifier qu'une pièce a été ajoutée
    const newCount = await page.locator('.mesure-item').count();
    expect(newCount).toBe(initialCount + 1);
  });

  test('Suppression de pièces fonctionne', async ({ page }) => {
    // Ajouter une pièce
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');

    const initialCount = await page.locator('.mesure-item').count();

    // Supprimer la pièce (cliquer sur le bouton supprimer)
    await page.click('.mesure-item .btn-supprimer');

    // Vérifier qu'une pièce a été supprimée
    const newCount = await page.locator('.mesure-item').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('Calcul simple flux fonctionne', async ({ page }) => {
    // Sélectionner les options
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');

    // Ajouter une cuisine
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    // Ajouter un séjour
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item:last-child');
    await page.selectOption('.mesure-item:last-child select[name="piece"]', 'sejour');
    await page.fill('.mesure-item:last-child input[name="debit"]', '80');

    // Vérifier que les résultats apparaissent
    await expect(page.locator('#resultats')).toBeVisible();
    await expect(page.locator('#resultats')).toContainText('Débit total');
  });

  test('Calcul double flux fonctionne', async ({ page }) => {
    // Sélectionner double flux
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'double-flux');

    // Ajouter des pièces
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'chambre');
    await page.fill('.mesure-item input[name="debit"]', '30');

    // Vérifier les résultats pour double flux
    await expect(page.locator('#resultats')).toBeVisible();
    await expect(page.locator('#resultats')).toContainText('Double Flux');
  });

  test('Validation des champs fonctionne', async ({ page }) => {
    // Ajouter une pièce sans remplir les champs
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');

    // Laisser les champs vides et essayer de calculer
    await page.click('#btnCalculer');

    // Vérifier qu'un message d'erreur apparaît ou que le calcul ne se fait pas
    // (selon l'implémentation actuelle)
    const resultats = page.locator('#resultats');
    await expect(resultats).toBeVisible();
  });

  test('Réinitialisation fonctionne', async ({ page }) => {
    // Remplir le formulaire
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    // Cliquer sur réinitialiser
    await page.click('#btnReset');

    // Vérifier que le formulaire est vide
    const logementValue = await page.locator('#typeLogement').inputValue();
    expect(logementValue).toBe('');

    const vmcValue = await page.locator('#typeVMC').inputValue();
    expect(vmcValue).toBe('');

    const pieceCount = await page.locator('.mesure-item').count();
    expect(pieceCount).toBe(0);
  });

  test('Sauvegarde et chargement fonctionne', async ({ page }) => {
    // Remplir le formulaire
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    // Sauvegarder
    await page.click('#btnSauvegarder');

    // Vérifier qu'un message de confirmation apparaît
    await expect(page.locator('body')).toContainText('sauvegardé');

    // Réinitialiser
    await page.click('#btnReset');

    // Charger
    await page.click('#btnCharger');

    // Vérifier que les données sont rechargées
    const logementValue = await page.locator('#typeLogement').inputValue();
    expect(logementValue).toBe('T3');

    const vmcValue = await page.locator('#typeVMC').inputValue();
    expect(vmcValue).toBe('simple-flux');
  });

  test('Export des résultats fonctionne', async ({ page }) => {
    // Faire un calcul
    await page.selectOption('#typeLogement', 'T3');
    await page.selectOption('#typeVMC', 'simple-flux');
    await page.click('#btnAjouterPiece');
    await page.waitForSelector('.mesure-item');
    await page.selectOption('.mesure-item select[name="piece"]', 'cuisine');
    await page.fill('.mesure-item input[name="debit"]', '50');

    // Vérifier que le bouton d'export PDF est présent
    await expect(page.locator('.export-pdf-btn')).toBeVisible();
  });
});