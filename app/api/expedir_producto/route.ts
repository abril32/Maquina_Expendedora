import mqtt from "mqtt";

export async function POST() {
  const client = mqtt.connect("mqtt://localhost:1883");

  client.on("connect", () => {
    client.subscribe("maquina/estado", (err) => {
      if (!err) {
        client.publish("maquina/estado", "Hello mqtt");
      }
    });
  });

  client.on("message", (topic, message) => {
    // message is Buffer
    console.log(message.toString());
    client.end();
  });
  return Response.json({ message: "Hola mundo" });
}
