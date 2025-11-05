import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return NextResponse.json({ error: "Token faltante" }, { status: 400 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({ where: { email: decoded.email } });

    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    await prisma.user.update({
      where: { email: decoded.email },
      data: { verified: true, verificationToken: null },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?verified=true`);
  } catch {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 });
  }
}
