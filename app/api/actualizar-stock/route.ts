import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const updates = await req.json(); // [{ id: 1, quantity: 2 }, ...]

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

    return NextResponse.json({ message: "Stock actualizado correctamente ✅" });
  } catch (error) {
    console.error("Error actualizando stock:", error);
    return NextResponse.json(
      { message: "Error actualizando stock", error },
      { status: 500 }
    );
  }
}
