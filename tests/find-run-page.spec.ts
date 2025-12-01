import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/find-run');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Find Run', exact: true }).click();
  await page.getByLabel('Difficulty Level:').selectOption('Easy');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('1 mile');
  await page.getByLabel('Preferred Pace:').selectOption('Slow');
  await page.getByLabel('Difficulty Level:').selectOption('Moderate');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('3 miles');
  await page.getByLabel('Preferred Pace:').selectOption('Fast');
  await page.getByLabel('Difficulty Level:').selectOption('Hard');
  await page.getByLabel('Preferred Pace:').selectOption('Moderate');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('5 miles');
  await page.getByRole('link', { name: 'Find Run', exact: true }).click();
});
