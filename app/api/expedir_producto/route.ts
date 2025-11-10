import {mqtt_client} from "@/lib/mqtt"
import { NextResponse } from "next/server";
const topic = process.env.TOPIC;

export async function POST() {
  try {
    if(!topic) {
    return NextResponse.json({ error: "No esta definico el topic me mqtt" }, { status: 500 });
    }
      if(!mqtt_client) {
    return NextResponse.json({ error: "No tenemos un cliente mqtt" }, { status: 500 });
    }
    mqtt_client.publish(topic,"enviando mensaje a la maquina expendedora")
    return NextResponse.json({ success: true, message: "Mensaje 'comprar' enviado al broker ✅" });
  } catch (error) {
    console.error("Error al enviar mensaje MQTT:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
