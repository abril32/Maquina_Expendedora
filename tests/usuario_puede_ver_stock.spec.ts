import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('Stock disponible: 5').click();
  await page.getByRole('button', { name: 'Añadir' }).nth(3).click();
  await page.getByRole('button', { name: 'Pagar Ahora' }).click();
});