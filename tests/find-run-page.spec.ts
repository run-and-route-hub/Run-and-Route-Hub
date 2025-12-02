import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto(`${process.env.TEST_URL}/find-run`);
  await page.getByLabel('Difficulty Level:').selectOption('Easy');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('1 mile');
  await page.getByLabel('Preferred Pace:').selectOption('Slow');
  await page.getByRole('heading', { name: 'Find Run' }).click();
});
