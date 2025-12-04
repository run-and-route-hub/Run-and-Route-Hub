import { test, expect } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/findbuddy`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Find Running Buddy' })).toBeVisible({ timeout: 10000 });
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).fill('1');
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).fill('10');
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Morning' }).click();
  await page.getByRole('button', { name: 'Flat' }).click();
});
