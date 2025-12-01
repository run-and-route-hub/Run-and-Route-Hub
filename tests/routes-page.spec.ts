import { test } from '@playwright/test';

test.use({ storageState: 'john-auth.json' });

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/routes');
  await page.getByRole('button', { name: 'OK' }).nth(1).click();
  await page.getByRole('button', { name: 'Zoom out' }).dblclick();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Move left' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Move left' }).click();
  await page.getByRole('button', { name: 'Move down' }).click();
  await page.getByRole('button', { name: 'Move down' }).click();
  await page.getByRole('button', { name: 'Move right' }).click();
  await page.getByRole('button', { name: 'Move down' }).click();
  await page.getByRole('link', { name: 'Routes' }).click();
});
