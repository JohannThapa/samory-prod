import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
});

test('check that the login button is visible', async ({ page }) => {
  const loginButton = page.getByRole('button', { name: 'Login/Signup' });
  await expect(loginButton).toBeVisible();
});