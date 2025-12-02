import { expect, test } from '@playwright/test';

const baseURL = process.env.TEST_URL || 'http://localhost:3000';

test('test', async ({ page }) => {
  await page.goto(`${baseURL}/findbuddy`);
  await expect(
    page.getByRole('heading', { name: 'Find Running Buddy' }),
  ).toBeVisible({ timeout: 15000 });
  const minPace = page.getByRole('spinbutton', { name: 'Min pace (minutes per' });
  await expect(minPace).toBeVisible({ timeout: 15000 });
  await minPace.fill('1');
  const maxPace = page.getByRole('spinbutton', { name: 'Max pace (minutes per' });
  await expect(maxPace).toBeVisible({ timeout: 15000 });
  await maxPace.fill('10');
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Tue' }).click();
  await page.getByRole('button', { name: 'Tue' }).click();
  await page.getByRole('button', { name: 'Wed' }).click();
  await page.getByRole('button', { name: 'Wed' }).click();
  await page.getByRole('button', { name: 'Thu' }).click();
  await page.getByRole('button', { name: 'Thu' }).click();
  await page.getByRole('button', { name: 'Fri' }).click();
  await page.getByRole('button', { name: 'Fri' }).click();
  await page.getByRole('button', { name: 'Sat' }).click();
  await page.getByRole('button', { name: 'Sat' }).click();
  await page.getByRole('button', { name: 'Sun' }).click();
  await page.getByRole('button', { name: 'Sun' }).click();
  await page.getByRole('button', { name: 'Morning' }).click();
  await page.getByRole('button', { name: 'Morning' }).click();
  await page.getByRole('button', { name: 'Afternoon' }).click();
  await page.getByRole('button', { name: 'Afternoon' }).click();
  await page.getByRole('button', { name: 'Evening' }).click();
  await page.getByRole('button', { name: 'Evening' }).click();
  await page.getByRole('button', { name: 'Flat' }).dblclick();
  await page.getByRole('button', { name: 'Hills' }).click();
  await page.getByRole('button', { name: 'Mixed' }).click();
  await page.getByRole('button', { name: 'Mixed' }).click();
  await page.getByRole('button', { name: 'Hills' }).click();
  await page.getByRole('button', { name: 'Flat' }).click();
});
