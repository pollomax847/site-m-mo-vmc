// tests/seo.spec.js
// Playwright E2E: SEO et balises principales
import { test, expect } from '@playwright/test';

test.describe('SEO: balises et métadonnées', () => {
  test('Balises meta essentielles présentes', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toMatch(/VMC|ventilation/i);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBeTruthy();
  });

  test('Données structurées JSON-LD présentes', async ({ page }) => {
    await page.goto('/');
    const jsonLd = await page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeVisible();
    const content = await jsonLd.textContent();
    expect(content).toMatch(/WebSite|Organization/);
  });
});
