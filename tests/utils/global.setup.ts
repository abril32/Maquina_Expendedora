import { describe } from "node:test";
import { prisma } from "../../lib/prisma";
const productos = [
  {
    id: 1,
    name: "Papas Fritas Lays",
    description: "Bolsa de papas fritas crujientes",
    price: 900,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1762290547/papas_p1rrbj.png",
    cantidad_producto: 5,
    category: "snacks",
  },
  {
    id: 2,
    name: "Mogul Extreme",
    description: "Gomitas ácidas",
    price: 450,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1762290653/gomitas_fbogvq.png",
    cantidad_producto: 3,
    category: "caramelos",
  },
  {
    id: 3,
    name: "Coca Cola",
    description: "Lata de refresco de cola 500ml",
    price: 650,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1762290747/coca_o73bxk.png",
    cantidad_producto: 6,
    category: "bebidas",
  },
  {
    id: 4,
    name: "Alfajor Jorgito",
    description: "Alfajor de chocolate",
    price: 300,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1762290303/alfajor_li7u92.png",
    cantidad_producto: 10,
    category: "caramelos",
  },
  {
    id: 5,
    name: "Sprite",
    description: "Botella de refresco de 600ml",
    price: 690,
    image: "https://res.cloudinary.com/donns8by6/image/upload/v1762290198/sprit_mxoous.png",
    cantidad_producto: 10,
    category: "bebidas",
  },
  {
    id: 6,
    name: "Chocolate Milka",
    description: "Barra de chocolate con leche",
    price: 1200,
    image: "https://res.clodescricionudinary.com/donns8by6/image/upload/v1762290427/milk_rwcnae.png",
    cantidad_producto: 4,
    category: "caramelos",
  },
]
async function globalSetup() {
  console.log("Ejecutando globalSetup: Inicializando entorno de pruebas...");

  // 1. Limpia la base de datos existente.
  await prisma.productos.deleteMany({});
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
        descripcion: producto.description,
        precio: producto.price,
        imagen_descriptiva: producto.image,
        cantidad_producto: producto.cantidad_producto,
        categoria: producto.category,
      }
    })
  });

  console.log("Datos de prueba insertados correctamente.");
}

export default globalSetup;
