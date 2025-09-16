import { test, expect } from '@playwright/test';

test('prueba comprar producto de 150', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^\$150Añadir al Carrito$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Pagar Ahora' }).click();
  await page.locator('div').filter({ hasText: /^Mercado PagoPaga con tu cuenta de Mercado Pago$/ }).nth(1).click();
  await page.locator('div').filter({ hasText: /^Mercado PagoPaga con tu cuenta de Mercado Pago$/ }).nth(1).click();
  await page.getByText('Selecciona tu método de pagoTarjeta de Crédito/DébitoVisa, Mastercard, American').click();
  await expect(page.getByLabel('Pagar con Mercado Pago')).toContainText('$150');
});