import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^\$160Añadir al Carrito$/ }).getByRole('button').click();
  await page.getByRole('img', { name: 'Refresco Cola' }).click();
  await page.locator('div').filter({ hasText: /^\$180Añadir al Carrito$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^\$160Quitar$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Pagar Ahora' }).click();
  await page.getByText('Mercado Pago', { exact: true }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Pagar $' }).click();
});