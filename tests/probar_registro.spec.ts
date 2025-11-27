import { test, expect } from '@playwright/test';

test('testea si se puede registrar a la pagina web o no', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Cerrar Sesión' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('tes@gmail.com');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('button', { name: 'Regístrate' }).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('123');
  await page.getByRole('textbox').nth(2).press('Enter');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByRole('button', { name: 'Registrarse' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Registrarse' }).click();
});