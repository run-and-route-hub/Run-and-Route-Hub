import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/findbuddy');
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Min pace (minutes per' }).fill('5');
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).click();
  await page.getByRole('spinbutton', { name: 'Max pace (minutes per' }).fill('6');
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Wed' }).click();
  await page.getByRole('button', { name: 'Fri' }).click();
  await page.getByRole('button', { name: 'Morning' }).click();
  await page.getByRole('button', { name: 'Evening' }).click();
  await page.getByRole('button', { name: 'Flat' }).click();
  await page.getByRole('button', { name: 'Flat' }).click();
  await page.getByRole('button', { name: 'Hills' }).click();
  await page.getByRole('button', { name: 'Hills' }).click();
  await page.getByRole('button', { name: 'Evening' }).click();
  await page.getByRole('button', { name: 'Morning' }).click();
  await page.getByRole('button', { name: 'Wed' }).click();
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Fri' }).click();
  await page.getByRole('button', { name: 'Sun' }).click();
  await page.getByRole('button', { name: 'Sat' }).click();
  await page.getByRole('button', { name: 'Evening' }).click();
  await page.getByRole('button', { name: 'Evening' }).click();
});
