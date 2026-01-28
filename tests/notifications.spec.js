// tests/notifications.spec.js
// Playwright E2E: Notifications et permissions
import { test, expect } from '@playwright/test';

test.describe('Notifications: permission et affichage', () => {
  test('Demande de permission notifications', async ({ page }) => {
    await page.goto('/');
    // Simule l’affichage du prompt de notification
    const notifBtn = page.locator('button, [aria-label*="notification" i], .notification-permission');
    await expect(notifBtn).toBeVisible();
    // Playwright ne gère pas le vrai prompt, mais on vérifie l’intention
  });
});
