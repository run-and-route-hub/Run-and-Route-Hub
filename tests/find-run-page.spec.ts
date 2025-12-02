import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/find-run');
  await page.getByLabel('Difficulty:').selectOption('Easy');
  await page.getByLabel('Minimum Distance:').selectOption('1');
  await page.getByLabel('Preferred Pace:').selectOption('Slow');
  await page.getByRole('heading', { name: 'Find Run' }).click();
});
