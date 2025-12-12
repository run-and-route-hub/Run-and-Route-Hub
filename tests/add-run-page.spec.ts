import { test } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/auth/signin`, { waitUntil: 'networkidle' });
  await page.locator('input[name="email"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(`${TEST_URL}`, { timeout: 10000 });
  await page.goto(`${TEST_URL}/add-run`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: 'Add Route' }).waitFor({ state: 'visible', timeout: 10000 });
});
