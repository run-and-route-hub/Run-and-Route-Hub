import { test } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/find-run`, { waitUntil: 'networkidle' });
  await page.locator('main').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('#difficulty').selectOption({ label: 'Easy' });
  await page.locator('#minDistance').selectOption({ label: '1 mile' });
  await page.locator('#pace').selectOption({ label: 'Slow' });
  await page.getByRole('heading', { name: 'Find Run' }).waitFor({ state: 'visible', timeout: 10000 });
});
