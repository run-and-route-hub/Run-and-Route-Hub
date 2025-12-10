import { test } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/find-run`, { waitUntil: 'networkidle' });
  await page.locator('main').waitFor({ state: 'visible', timeout: 10000 });
  await page.getByRole('heading', { name: 'Find Run' }).waitFor({ state: 'visible', timeout: 10000 });
});
