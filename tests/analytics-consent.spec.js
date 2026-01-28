// tests/analytics-consent.spec.js
// Playwright E2E: Consentement analytics et tracking
import { test, expect } from '@playwright/test';

test.describe('Analytics: consentement et tracking', () => {
  test('Bannière de consentement affichée', async ({ page }) => {
    await page.goto('/');
    const consent = page.locator('.consent-banner, [aria-label*="consentement" i]');
    await expect(consent).toBeVisible();
  });

  test('Tracking désactivé sans consentement', async ({ page }) => {
    await page.goto('/');
    // Simule refus
    const refuseBtn = page.locator('button, [aria-label*="refuser" i], .consent-refuse').first();
    if (await refuseBtn.isVisible()) {
      await refuseBtn.click();
    }
    // Vérifie qu’aucun script analytics n’est injecté
    const ga = await page.locator('script[src*="googletagmanager"], script[src*="analytics"]').count();
    expect(ga).toBe(0);
  });

  test('Tracking activé après consentement', async ({ page }) => {
    await page.goto('/');
    // Simule acceptation
    const acceptBtn = page.locator('button, [aria-label*="accepter" i], .consent-accept').first();
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
    }
    // Vérifie qu’un script analytics est injecté
    const ga = await page.locator('script[src*="googletagmanager"], script[src*="analytics"]').count();
    expect(ga).toBeGreaterThan(0);
  });
});
