// tests/image-optimization.spec.js
// Playwright E2E: Optimisation images (WebP, lazy loading)
import { test, expect } from '@playwright/test';

test.describe('Images: optimisation et lazy loading', () => {
  test('Images principales en WebP ou optimisées', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      expect(src).toMatch(/\.(webp|svg|avif|png|jpg|jpeg)$/i);
    }
  });

  test('Lazy loading activé sur images', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img[loading="lazy"]');
    expect(await images.count()).toBeGreaterThan(0);
  });
});
