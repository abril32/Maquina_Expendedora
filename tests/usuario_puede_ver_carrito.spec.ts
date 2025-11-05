import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Añadir' }).nth(2).click();
  await page.getByRole('button', { name: 'Añadir' }).nth(1).click();
  await expect(page.getByText('$1.100')).toBeVisible();
//   await page.getByText('Total:$').nth(5).click();
//   await expect(page.getByText('Total:$')).toBeVisible();
//   await expect(page.getByText('Tu PedidoLata de refresco de').nth(5)).toBeVisible();
});