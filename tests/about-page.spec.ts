import { test, expect } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/about`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'About Run & Route Hub' })).toBeVisible({ timeout: 10000 });
});
