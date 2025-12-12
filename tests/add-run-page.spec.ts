import { test } from '@playwright/test';
import TEST_URL from './setup';

test('test', async ({ page }) => {
  await page.route('**/*maps.googleapis.com/**', route => route.abort());

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto(`${TEST_URL}/auth/signin`, { waitUntil: 'networkidle' });
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(`${TEST_URL}`, { timeout: 10000 });

  await page.goto(`${TEST_URL}/add-run`, { waitUntil: 'domcontentloaded' });

  await page.screenshot({ path: 'test-results/add-run-debug.png', fullPage: true });

  // Log the page HTML
  const html = await page.content();
  console.log('PAGE HTML:', html.substring(0, 1000));

  // Check what's actually visible
  const mainExists = await page.locator('main').count();
  console.log('Main element count:', mainExists);

  const h1Exists = await page.locator('h1').count();
  console.log('H1 element count:', h1Exists);

  if (h1Exists > 0) {
    const h1Text = await page.locator('h1').first().textContent();
    console.log('H1 text:', h1Text);
  }

  await page.getByRole('heading', { name: 'Add Route' }).waitFor({
    state: 'visible',
    timeout: 10000,
  });
});
