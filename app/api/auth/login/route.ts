import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; // tu conexión a Prisma

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Verificar si confirmó el correo
    if (!user.verified) {
      return NextResponse.json({ error: "Verifica tu correo antes de ingresar" }, { status: 401 });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Enviar respuesta
    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
