import axios from "axios";
import { NextResponse } from "next/server";
import qs from "qs";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const data = qs.stringify({
  grant_type: "client_credentials",
});

const url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

export async function generaTokenAcceso(): Promise<string> {
  const respuesta = await axios.post(url, data, {
    headers: headers,
    auth: {
      username: process.env.PAYPAL_CLIENT_ID || "user",
      password: process.env.PAYPAL_CLIENT_SECRET || "pass",
    },
  });

  return respuesta.data.access_token;
}

//
export async function POST(req:any) {
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
    // Fetch a new access token
    const accessToken = await generaTokenAcceso();

    // Fetch payment details from PayPal API
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

    const tokens = data.purchase_units[0].description;
    const total_paid_amount = data.purchase_units[0].amount.value;

    await createPurchase(tokens, total_paid_amount, external_reference);
    await addTokenToProfile(tokens, external_reference);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching payment data:",
      error.response?.data  as string || error.message as string
    );
    return NextResponse.json(
      { message: "Failed to fetch payment data" },
      { status: 500 }
    );
  }
}

// Function to create a purchase record
async function createPurchase(tokens: any, total_paid_amount:any , external_reference: any) {
  const supabase = createClient(); // Replace with your actual Supabase client setup

  const { error } = await supabase.from("payments").insert([
    {
      tokens,
      total_paid_amount,
      external_reference,
    },
  ]);

  if (error) {
    console.error("Error inserting data into Supabase:", error);
    throw new Error("Failed to save data to database");
  }
}

// Function to update profile tokens
async function addTokenToProfile(tokens:any , external_reference:any ) {
  const supabase = createClient(); // Replace with your actual Supabase client setup

  const parsedTokens = Number(tokens);

  // Fetch existing profile
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profile")
    .select("tokens")
    .eq("external_reference", external_reference)
    .single();

  if (fetchError) {
    if (fetchError.code === "PGRST116") {
      // Create a new profile
      const { error: insertError } = await supabase.from("profile").insert([
        {
          tokens: parsedTokens,
          external_reference,
        },
      ]);

      if (insertError) {
        console.error(
          "Error inserting new profile into Supabase:",
          insertError
        );
        throw new Error("Failed to create profile in database");
      }
      return;
    } else {
      console.error("Error fetching profile from Supabase:", fetchError);
      throw new Error("Failed to fetch profile from database");
    }
  }

  // Update existing profile
  const currentTokens = existingProfile.tokens || 0;
  const updatedTokens = currentTokens + parsedTokens;

  const { error: updateError } = await supabase
    .from("profile")
    .update({ tokens: updatedTokens })
    .eq("external_reference", external_reference);

  if (updateError) {
    console.error("Error updating profile in Supabase:", updateError);
    throw new Error("Failed to update profile in database");
  }
}
