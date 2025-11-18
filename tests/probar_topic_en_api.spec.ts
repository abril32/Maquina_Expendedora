import { test, expect } from '@playwright/test';

test('dada la faltante del topic mqtt, al postear en la ruta /api/expedir_producto, debe devolver 500 status', async ({ request }) => {
  const respuesta = await request.post(`http://localhost:3000/api/expedir_producto`, {
    data: {
      productos: [
        "gaseosa", 
        "papas fritas"
      ],
    }
  });
  expect(respuesta.status()).toBe(500);
});
