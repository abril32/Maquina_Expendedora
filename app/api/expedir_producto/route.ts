import mqtt from "mqtt";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Cargar las variables de entorno solo si no es Next.js
dotenv.config();

export async function POST() {
  const client = mqtt.connect(process.env.BROKER as string);

  client.on("connect", () => {
    console.log("Conectado al broker");
    
    client.subscribe(process.env.TOPIC as string, (err) => {
      if (!err) {
        client.publish(process.env.TOPIC as string, "Hello mqtt");
      } else {
        console.error("Error al suscribirse:", err);
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log(`Mensaje en ${topic}:`, message.toString());
    client.end();
  });

  return Response.json({ message: "Hola mundo" });
}

//mercado pago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export async function POST(req) {
  const body = await req.json();
  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items: [
        {
          title: body.title || 'Mi producto',
          quantity: 1,
          unit_price: 2000
        }
      ]
    }
  });

  return Response.json({ id: result.id });
}
