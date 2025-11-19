import { mqtt_client } from "@/lib/mqtt";
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

const topic = process.env.TOPIC;


export async function GET() {
    //evaluar conexion con el broker 
    if (!topic) {
          await prisma.alerts.create({data:{
            evento: "No es posible conectarse al servidor porque el topic esta mal."
          }})
          return NextResponse.json({ error: "No está definido el topic MQTT" }, { status: 500 });
        }
    
        if (!mqtt_client) {
          return NextResponse.json({ error: "No tenemos un cliente MQTT" }, { status: 500 });
        }
    //si la conexion es correcta, devolver status code 200 y un msj acorde
    //si la conexion no es correcta, devolver status code 500 y un msj acorde
}