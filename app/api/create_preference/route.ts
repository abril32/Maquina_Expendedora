import { MercadoPagoConfig, Preference } from 'mercadopago';

//mercado pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
});

export async function POST(req: { json: () => any; }) {
  const body = await req.json();
  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items: [
        {
          title: body.title || 'Mi producto',
          quantity: 1,
          unit_price: 2000,
          id:''
        }
      ]
    }
  });

  return Response.json(
    console.log("Access Token cargado:", process.env.TEST_ACCESS_TOKEN ? "✅ OK" : "❌ NO DEFINIDO")
);
  
}
