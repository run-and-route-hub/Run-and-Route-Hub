import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto(`${process.env.TEST_URL}/routes`);
  await page.getByRole('heading', { name: 'Routes' }).click();
  await page.getByRole('link', { name: 'Routes' }).click();
  await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
});
