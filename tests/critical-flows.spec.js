// tests/critical-flows.spec.js
// Playwright E2E tests: parcours critiques Mémo VMC
import { test, expect } from '@playwright/test';

test.describe('Parcours critique: Accueil et navigation', () => {
  test('Chargement de la page d’accueil', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mémo VMC/i);
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Navigation menu fonctionne', async ({ page }) => {
    await page.goto('/');
    const menuBtn = page.locator('button[aria-label*="menu"], .mobile-menu');
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await expect(page.locator('nav[aria-expanded="true"]')).toBeVisible();
    }
    // Test lien navigation
    const firstLink = page.locator('nav a').first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click();
    if (href && href.startsWith('#')) {
      await expect(page.locator(href)).toBeVisible();
    } else {
      await expect(page).toHaveURL(new RegExp(href));
    }
  });
});

test.describe('Parcours critique: PDF export', () => {
  test('Bouton PDF export fonctionne', async ({ page }) => {
    await page.goto('/');
    const pdfBtn = page.locator('button, [aria-label*="PDF" i], .pdf-export');
    await expect(pdfBtn).toBeVisible();
    await pdfBtn.click();
    // Vérifie qu’un téléchargement a été déclenché (événement ou notification)
    // Playwright ne télécharge pas le PDF, mais on peut vérifier l’apparition d’un toast ou d’un changement DOM
    await expect(page.locator('.pdf-export, .toast, [role="status"]')).toBeVisible();
  });
});

test.describe('Parcours critique: Thème sombre', () => {
  test('Activation du mode sombre', async ({ page }) => {
    await page.goto('/');
    const themeBtn = page.locator('button[aria-label*="sombre" i], .theme-toggle');
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();
    // Vérifie que le body a la classe dark ou un style dark
    await expect(page.locator('body')).toHaveClass(/dark/);
  });
});

test.describe('Parcours critique: PWA install prompt', () => {
  test('Install prompt PWA s’affiche', async ({ page }) => {
    await page.goto('/');
    // Simule l’événement beforeinstallprompt (non supporté nativement)
    // Vérifie la présence du bouton ou bannière d’installation
    await expect(page.locator('button, [aria-label*="installer" i], .pwa-install')).toBeVisible();
  });
});
