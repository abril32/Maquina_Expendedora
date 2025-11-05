import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma"; // Asegurate de tener esto configurado

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear token de verificación
  const verificationToken = jwt.sign(
    { email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  // Guardar usuario
  await prisma.user.create({
    data: { email, password: hashedPassword, name, verificationToken },
  });

  // Enviar correo
  const transporter = nodemailer.createTransport({
    service: "gmail", // o tu proveedor SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${verificationToken}`;

  await transporter.sendMail({
    from: `"AutoStop" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verificá tu cuenta",
    html: `
      <h1>Bienvenido a AutoStop 🚗</h1>
      <p>Por favor verificá tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${verificationLink}">Verificar cuenta</a>
    `,
  });

  return NextResponse.json({ message: "Usuario registrado. Revisa tu correo." });
}
