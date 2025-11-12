import {generaTokenAcceso } from "@/lib/paypal"
import { NextResponse } from "next/server";

export async function POST() {
   const token = generaTokenAcceso()
   console.log(token)
   return NextResponse.json({message: "token creado"})
}