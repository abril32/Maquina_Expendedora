import { describe } from "node:test";
import { prisma } from "../../lib/prisma";
const productos = [
  {
    id: 1,
    name: "Papas Fritas Lays",
    description: "Bolsa de papas fritas crujientes",
    price: 900,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761682856/papas_w1nsgd.jpg",
    category: "snacks",
  },
  {
    id: 2,
    name: "Mogul Extreme",
    description: "Gomitas ácidas",
    price: 450,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761682738/gomitas_kjqile.jpg",
    category: "caramelos",
  },
  {
    id: 3,
    name: "Coca Cola",
    description: "Lata de refresco de cola 500ml",
    price: 650,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761682803/coca_fe7h8q.jpg",
    category: "bebidas",
  },
  {
    id: 4,
    name: "Alfajor Jorgito",
    description: "Alfajor de chocolate",
    price: 300,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761684329/alfajor_q7kkyf.webp",
    category: "caramelos",
  },
  {
    id: 5,
    name: "Sprite",
    description: "Botella de refresco de 600ml",
    price: 690,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761684513/sprite_lpvzd2.jpg",
    category: "bebidas",
  },
  {
    id: 6,
    name: "Chocolate Milka",
    description: "Barra de chocolate con leche",
    price: 1200,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1761684217/milka_zzirdf.jpg",
    category: "caramelos",
  },
]
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
    data: productos.map( (producto) => {
      return{
        id: producto.id,
        descricion: producto.description,
        precio: producto.price,
        imagen_descriptiva: producto.image,
      }
    })
  });

  console.log("Datos de prueba insertados correctamente.");
}

export default globalSetup;
