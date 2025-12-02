import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://your-vercel-domain.vercel.app/add', { waitUntil: 'domcontentloaded' });
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Add Run' }).click();
  const addRunLink = page.getByRole('link', { name: 'Add Run' });
  await addRunLink.waitFor({ state: 'visible', timeout: 60000 });
  await addRunLink.click();
  await page.getByRole('button', { name: 'OK' }).nth(1).dblclick();
  await page.getByRole('button', { name: 'Map camera controls' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).click();
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.getByRole('button', { name: 'Move left' }).click();
  await page.getByRole('button', { name: 'Move up' }).click();
  await page.getByRole('button', { name: 'Move right' }).click();
  await page.getByRole('button', { name: 'Move down' }).click();
  await page.getByRole('button', { name: 'Zoom out' }).dblclick();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Morning Loop');
  await page.getByRole('button', { name: 'Select Start and End Points' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('link', { name: 'Add Run' }).click();
});
