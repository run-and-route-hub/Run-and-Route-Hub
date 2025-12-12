import { test } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/review`, { waitUntil: 'networkidle' });
  await page.locator('main').waitFor({ state: 'visible', timeout: 10000 });
  await page.getByRole('heading', { name: 'Select a Route to Review' }).waitFor({ state: 'visible', timeout: 10000 });
});
