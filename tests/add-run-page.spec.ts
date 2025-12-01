import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Add Run' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Morning loop');
  await page.getByRole('button', { name: 'OK' }).nth(1).dblclick();
  await page.getByRole('button', { name: 'Select Start and End Points' }).click();
  await page.getByRole('button', { name: 'Toggle fullscreen view' }).click();
  await page.locator('.gm-style > div > div:nth-child(2)').click();
  await page.locator('.gm-style > div > div:nth-child(2)').click();
  await page.getByRole('button', { name: 'Toggle fullscreen view' }).click();
  await page.getByRole('button', { name: 'Create Route' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});
