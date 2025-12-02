import { expect, test } from '@playwright/test';

const baseURL = process.env.TEST_URL || 'http://localhost:3000';

test('test', async ({ page }) => {
  await page.goto(`${baseURL}/find-run`);
  const heading = page.getByRole('heading', { name: 'Find Run' });
  await heading.waitFor({ state: 'visible', timeout: 60000 });
  await expect(heading).toBeVisible();
  const difficulty = page.getByLabel('Difficulty Level:');
  await expect(difficulty).toBeVisible({ timeout: 15000 });
  await difficulty.selectOption('Easy');
  const minDistance = page.getByLabel('Minimum Distance:Any1 mile2');
  await expect(minDistance).toBeVisible({ timeout: 15000 });
  await minDistance.selectOption('1 mile');
  await page.getByLabel('Preferred Pace:').selectOption('Slow');
  await page.getByLabel('Difficulty Level:').selectOption('Moderate');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('3 miles');
  await page.getByLabel('Preferred Pace:').selectOption('Fast');
});
