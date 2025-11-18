import axios from "axios"
import { NextResponse } from "next/server"
import qs from "qs"
import { prisma } from "@/lib/prisma" 
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const data = qs.stringify({
  grant_type: "client_credentials",
});

const url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

//  Obtener Token de Acceso
export async function generaTokenAcceso(): Promise<string> {
  const respuesta = await axios.post(url, data, {
    headers,
    auth: {
      username: process.env.PAYPAL_CLIENT_ID!,
      password: process.env.PAYPAL_CLIENT_SECRET!,
    },
  });

  return respuesta.data.access_token;
}

//  WEBHOOK PAYPAL
export async function POST(req: any) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("data.id");
  const external_reference = searchParams.get("external_reference");

  if (!id) {
    return NextResponse.json(
      { message: "Missing payment ID" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await generaTokenAcceso();

    const response = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data } = response;

    console.log("Payment Data:", data);
    console.log("External Reference:", external_reference);

    const tokens = Number(data.purchase_units[0].description);
    const total_paid_amount = Number(data.purchase_units[0].amount.value);

    await createPurchase(tokens, total_paid_amount, external_reference as string);
    await addTokenToProfile(tokens, external_reference as string );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error fetching payment data:",
      error.response?.data || error.message
    );

    return NextResponse.json(
      { message: "Failed to fetch payment data" },
      { status: 500 }
    );
  }
}

//  Crear registro de compra
async function createPurchase(tokens: number, total_paid_amount: number, external_reference: string) {
  try {
    await prisma.payments.create({
      data: {
        tokens,
        total_paid_amount,
        external_reference,
      },
    });
  } catch (error) {
    console.error("Error inserting payment with Prisma:", error);
    throw new Error("Failed to save payment in database");
  }
}

//  Crear o actualizar perfil tokens
async function addTokenToProfile(tokens: number, external_reference: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { external_reference },
    });

    if (!profile) {
      //  Si no existe → crear perfil
      await prisma.profile.create({
        data: {
          tokens,
          external_reference,
        },
      });
      return;
    }

    //  Si existe → actualizar tokens
    await prisma.profile.update({
      where: { external_reference },
      data: {
        tokens: profile.tokens + tokens,
      },
    });
  } catch (error) {
    console.error("Error updating profile with Prisma:", error);
    throw new Error("Failed to update profile in database");
  }
}

// Endpoint test para ver token
export async function GET() {
  const token = await generaTokenAcceso();
  return NextResponse.json({ token });
}
