import { test, expect } from '@playwright/test';

test('al presionar el boton pagar ahora, se manda un msj al broker', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Añadir' }).nth(3).click();
  await page.getByRole('button', { name: 'Añadir' }).nth(3).click();
  await page.getByRole('button', { name: 'Añadir' }).nth(4).click();
  await page.getByRole('button', { name: 'Pagar Ahora' }).click();
});