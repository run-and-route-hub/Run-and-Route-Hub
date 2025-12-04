import { test } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.goto(`${TEST_URL}/auth/signin`, { waitUntil: 'networkidle' });
  await page.locator('input[name="email"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  await page.goto(`${TEST_URL}/add-run`, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Add Run' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Morning Loop');
  await page.locator('text=Select Start and End Points on Map').click();
  await page.getByRole('heading', { name: 'Add Route' }).waitFor({ state: 'visible', timeout: 10000 });
});
