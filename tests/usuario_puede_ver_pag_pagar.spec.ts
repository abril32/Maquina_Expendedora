import { test, expect } from '@playwright/test';

test('Yo como comprador, deseo entrar en la ecommerce web de la maquina expendedora para ver los productos disponibles.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'Gomitas ácidas' })).toBeVisible();
  await page.getByRole('heading', { name: 'Lata de refresco de cola 500ml' }).click();
});