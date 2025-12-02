import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://your-vercel-domain.vercel.app/routes', { waitUntil: 'domcontentloaded' });
  await expect(
    page.getByRole('heading', { name: 'Routes' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).nth(1).dblclick();
  await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Move left' }).click();
  await page.getByRole('button', { name: 'Move down' }).click();
  await page.getByRole('button', { name: 'Move right' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('link', { name: 'Routes' }).click();
});
