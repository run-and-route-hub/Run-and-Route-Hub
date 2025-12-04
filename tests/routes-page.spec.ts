import { test, expect } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/routes`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Routes' })).toBeVisible({ timeout: 10000 });
  await page.getByRole('link', { name: 'Routes' }).click();
  await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
});
