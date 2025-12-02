import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/routes');
  await page.getByRole('heading', { name: 'Routes' }).click();
  await page.getByRole('link', { name: 'Routes' }).click();
  await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
});
