import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto(`${process.env.TEST_URL}/findbuddy`);
  await page.getByRole('heading', { name: 'Find Running Buddy' }).click();
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).fill('1');
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).fill('10');
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Morning' }).click();
  await page.getByRole('button', { name: 'Flat' }).click();
});
