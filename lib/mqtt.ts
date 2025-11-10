import { PrismaClient } from "@prisma/client";
import mqtt, { MqttClient } from "mqtt";
import { FunnelChart } from "recharts";
const broker = process.env.BROKER;
const topic = process.env.TOPIC;

function obtenerConexionMQTT(broker: string | undefined) {
  if (!broker || !topic) {
    console.error("Falta broker o topic");
    return;
  }

  const cliente = global.mqtt_client || mqtt.connect(broker);
  cliente.on("connect", () => {
    console.log("✅ Conectado al broker MQTT");
    cliente.publish(topic, "API concetada al broker", { qos: 1 }, (err) => {
      if (err) {
        console.error("❌ Error al publicar:", err);
      } else {
        console.log("📤 Mensaje enviado al broker: API concetada al broker");
      }
    });
  });
  return cliente;
}

function enviarMensaje (){
    
}

declare global {
  var mqtt_client: MqttClient | undefined;
}

export const mqtt_client = obtenerConexionMQTT(broker);

if (process.env.NODE_ENV !== "production") global.mqtt_client = mqtt_client;
