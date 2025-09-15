import mqtt from "mqtt";
import dotenv from "dotenv";

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
