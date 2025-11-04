import { test, expect } from '@playwright/test';

test('usuario_puede_ver_pagina', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^\$450añadir$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^\$300añadir$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Pagar Ahora' }).click();
  await page.getByRole('dialog', { name: 'Pagar con Mercado Pago' }).click();
  await expect(page.getByRole('dialog', { name: 'Pagar con Mercado Pago' })).toBeVisible();
  await expect(page.getByLabel('Pagar con Mercado Pago')).toContainText('Pagar con Mercado PagoResumen del pedidoBarrita Energética x1$180Patatas Fritas x1$150Total:$330Selecciona tu método de pagoTarjeta de Crédito/DébitoVisa, Mastercard, American ExpressMercado PagoPaga con tu cuenta de Mercado PagoTransferencia BancariaTransferencia desde tu bancoPagar $330Tu pago está protegido por Mercado Pago. Transacción segura y encriptada.');
});