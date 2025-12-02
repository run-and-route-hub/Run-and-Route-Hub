import { expect, test } from '@playwright/test';

const baseURL = process.env.TEST_URL || 'http://localhost:3000';

test('test', async ({ page }) => {
  await page.goto(`${baseURL}/findbuddy`);
  await expect(
    page.getByRole('heading', { name: 'Find Running Buddy' }),
  ).toBeVisible();
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).fill('1');
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).fill('10');
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
