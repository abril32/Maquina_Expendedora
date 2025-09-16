import { test, expect } from '@playwright/test';

test('el usuario puede ver las distintas imagenes', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('img', { name: 'Barrita Energética' }).click();
  await expect(page.getByRole('img', { name: 'Barrita Energética' })).toBeVisible();
  await page.getByRole('img', { name: 'Barrita Energética' }).click();
  await page.getByRole('img', { name: 'Patatas Fritas' }).click();
  await page.getByRole('img', { name: 'Refresco Cola' }).click();
  await page.getByRole('img', { name: 'Chocolate' }).click();
  await page.getByRole('img', { name: 'Ensalada César' }).click();
  await expect(page.getByRole('img', { name: 'Chocolate' })).toBeVisible();
  await page.getByRole('img', { name: 'Refresco Cola' }).click();
  await expect(page.getByRole('img', { name: 'Refresco Cola' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Barrita Energética' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Ensalada César' })).toBeVisible();
});