import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // o tu conexión a Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const updates = req.body; // [{ id: 1, quantity: 2 }, ...]

    for (const item of updates) {
      await prisma.productos.update({
        where: { id: item.id },
        data: {
          cantidad_producto: {
            decrement: item.quantity,
          },
        },
      });
    }

    return res.status(200).json({ message: "Stock actualizado correctamente ✅" });
  } catch (error) {
    console.error("Error actualizando stock:", error);
    return res.status(500).json({ message: "Error actualizando stock", error });
  }
}
