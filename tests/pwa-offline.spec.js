// tests/pwa-offline.spec.js
// Playwright E2E: PWA et offline
import { test, expect } from '@playwright/test';

test.describe('PWA: fonctionnement hors-ligne', () => {
  test('Affichage d’un fallback offline', async ({ page, context }) => {
    await page.goto('/');
    // Simule la perte de connexion
    await context.setOffline(true);
    await page.reload();
    // Vérifie la présence d’un message offline ou fallback
    await expect(page.locator('.offline, [data-offline], [aria-label*="hors ligne" i]')).toBeVisible();
    await context.setOffline(false);
  });
});
