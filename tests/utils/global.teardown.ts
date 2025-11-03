import { describe } from "node:test";
import { prisma } from "../../lib/prisma";

async function globalTearDown() {
  console.log("Ejecutando globalSetup: Inicializando entorno de pruebas...");

  // 1. Limpia la base de datos existente.
  await prisma.productos.deleteMany();
  await prisma.user.deleteMany();
}
export default globalTearDown;
