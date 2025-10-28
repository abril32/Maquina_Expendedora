import { prisma } from "../../lib/prisma";

async function globalSetup() {
  console.log("Ejecutando globalSetup: Inicializando entorno de pruebas...");

  // 1. Limpia la base de datos existente.
  await prisma.productos.deleteMany();
  await prisma.user.deleteMany();

  // 2. Inserta datos de prueba.
  await prisma.user.createMany({
    data: [
      {
        email: "tes@gmail.com",
      },
      {
        email: "testo@gmail.com",
      },
    ],
  });

  await prisma.productos.createMany({
    data: [
      {
        descricion: "papas fritas",
        id: 1,
        precio: 350.3,
        imagen_descriptiva: "https://res.cloudinary.com/donns8by6/image/upload/v1761682856/papas_w1nsgd.jpg"
      },
      {
        descricion: "chocolate",
        id: 2,
        precio: 120.3,
        imagen_descriptiva: "https://res.cloudinary.com/donns8by6/image/upload/v1761684217/milka_zzirdf.jpg"
      },
    ],
  });

  console.log("Datos de prueba insertados correctamente.");
}

export default globalSetup;
