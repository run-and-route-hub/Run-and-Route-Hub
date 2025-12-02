import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/auth/signin');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  await page.goto('/add-run');
  await page.getByRole('link', { name: 'Add Run' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Morning Loop');
  await page.getByRole('button', { name: 'Select Start and End Points' }).click();
  await page.getByRole('heading', { name: 'Add Route' }).click();
});
