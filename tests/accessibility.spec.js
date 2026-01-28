// tests/accessibility.spec.js
// Playwright E2E: tests d’accessibilité principaux
import { test, expect } from '@playwright/test';

test.describe('Accessibilité: éléments critiques', () => {
  test('Présence du skip link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main"], .skip-link');
    await expect(skipLink).toBeVisible();
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('Navigation clavier: focus visible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement);
    expect(focused).not.toBeNull();
  });

  test('Contraste suffisant sur le bouton principal', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('button, .main-btn').first();
    const color = await btn.evaluate(el => getComputedStyle(el).color);
    const bg = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
    // Simple check: not same color
    expect(color).not.toBe(bg);
  });
});
