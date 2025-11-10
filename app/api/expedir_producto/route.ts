import mqtt from "mqtt";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const broker = process.env.BROKER;
    const topic = process.env.TOPIC;

    if (!broker || !topic) {
      return NextResponse.json({ error: "Faltan variables de entorno BROKER o TOPIC" }, { status: 400 });
    }

    const client = mqtt.connect(broker);

    client.on("connect", () => {
      console.log("✅ Conectado al broker MQTT");
      client.publish(topic, "comprar", { qos: 1 }, (err) => {
        if (err) console.error("❌ Error al publicar:", err);
        else console.log("📤 Mensaje enviado al broker: comprar");
        client.end();
      });
    });

    return NextResponse.json({ success: true, message: "Mensaje 'comprar' enviado al broker ✅" });
  } catch (error) {
    console.error("Error al enviar mensaje MQTT:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
