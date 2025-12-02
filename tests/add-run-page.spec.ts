import { expect, test } from '@playwright/test';

const baseURL = process.env.TEST_URL || 'http://localhost:3000';

test('test', async ({ page }) => {
  await page.goto(`${baseURL}/auth/signin`);
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Add Run' }).click();
  const addRunLink = page.getByRole('link', { name: 'Add Run' });
  await expect(addRunLink).toBeVisible({ timeout: 15000 });
  await addRunLink.click();
  const okButton = page.getByRole('button', { name: 'OK' }).nth(1);
  await expect(okButton).toBeVisible({ timeout: 15000 });
  await okButton.dblclick();
  await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.getByRole('button', { name: 'Move left' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Move right' }).click();
  await page.getByRole('button', { name: 'Move down' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).dblclick();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Morning Loop');
  await page.getByRole('button', { name: 'Select Start and End Points' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('link', { name: 'Add Run' }).click();
});
