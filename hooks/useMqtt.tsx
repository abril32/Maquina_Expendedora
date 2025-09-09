// hooks/useMqtt.tsx
import { useEffect, useState } from "react";
import { connect, MqttClient } from "mqtt";

export function useMqtt(brokerUrl: string, topic: string) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [message, setMessage] = useState<string>("Se pudo conectar");
  const [error, setError] = useState<string>("No se pudo conectar");

  useEffect(() => {
    const mqttClient = connect(brokerUrl);
    setClient(mqttClient);

    // Timeout manual de 5s
    const timeoutId = setTimeout(() => {
      if (!mqttClient.connected) {
        setError("⏳ No se pudo conectar al broker MQTT.");
        mqttClient.end();
      }
    }, 5000);

    mqttClient.on("connect", () => {
      console.log("✅ Conectado a MQTT");
      clearTimeout(timeoutId);
      mqttClient.subscribe(topic);
    });

    mqttClient.on("message", (t, msg) => {
      if (t === topic) {
        setMessage(msg.toString());
      }
    });

    mqttClient.on("error", (err) => {
      console.error("❌ Error de conexión:", err);
      setError("Error al conectar al broker.");
      mqttClient.end();
    });

    return () => {
      clearTimeout(timeoutId);
      mqttClient.end();
    };
  }, [brokerUrl, topic]);

  return { client, message, error };
}
