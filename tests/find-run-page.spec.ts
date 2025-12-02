import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://your-vercel-domain.vercel.app/find-run', { waitUntil: 'domcontentloaded' });
  const heading = page.getByRole('heading', { name: 'Find Run' });
  await heading.waitFor({ state: 'visible', timeout: 60000 });
  await expect(heading).toBeVisible();
  await page.getByLabel('Difficulty Level:').selectOption('Easy');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('1 mile');
  await page.getByLabel('Preferred Pace:').selectOption('Slow');
  await page.getByLabel('Difficulty Level:').selectOption('Moderate');
  await page.getByLabel('Minimum Distance:Any1 mile2').selectOption('3 miles');
  await page.getByLabel('Preferred Pace:').selectOption('Fast');
});
