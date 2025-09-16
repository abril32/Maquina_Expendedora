import { test, expect } from '@playwright/test';

test('comprar dos productos y contabilizarlo', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^\$180Añadir al Carrito$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^\$120Añadir al Carrito$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Pagar Ahora' }).click();
  await page.getByLabel('Pagar con Mercado Pago').getByText('$300', { exact: true }).click();
  await expect(page.getByLabel('Pagar con Mercado Pago')).toContainText('$300');
});