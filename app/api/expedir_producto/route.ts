import { mqtt_client } from "@/lib/mqtt";
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

const topic = process.env.TOPIC;

// Timeout en milisegundos
const PUBLISH_TIMEOUT = 5000;

export async function POST() {
  try {
    if (!topic) {
      await prisma.alerts.create({data:{
        evento: "No es posible conectarse al servidor porque el topic esta mal."
      }})
      return NextResponse.json({ error: "No está definido el topic MQTT" }, { status: 500 });
    }

    if (!mqtt_client) {
      return NextResponse.json({ error: "No tenemos un cliente MQTT" }, { status: 500 });
    }

    // Wrap de publish con promesa + timeout
    const publishPromise = new Promise<void>((resolve, reject) => {
      mqtt_client?.publish(topic, "enviando mensaje a la máquina expendedora", (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const timeoutPromise = new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout de publicación MQTT")), PUBLISH_TIMEOUT)
    );

    // Se define el resultado final entre publish o timeout
    await Promise.race([publishPromise, timeoutPromise]);

    return NextResponse.json({ success: true, message: "Mensaje enviado al broker correctamente ✅" });

  } catch (error) {
    console.error("Error al enviar mensaje MQTT:", error);
    return NextResponse.json(
      { error: "Error al enviar MQTT: " + (error as Error).message },
      { status: 500 }
    );
  }
}
