import { Value } from "@radix-ui/react-select";
import { Description } from "@radix-ui/react-toast";
import axios from "axios"
import { Currency } from "lucide-react";
import qs from "qs"
import { preconnect } from "react-dom";
import { FunnelChart } from "recharts";

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const data = qs.stringify({
  grant_type: 'client_credentials',
});
const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
export async function generaTokenAcceso() {
const respuesta = await axios.post(url, data, {
  headers: headers,
  auth: {
    username: process.env.PAYPAL_CLIENT_ID || "user",
    password: process.env.PAYPAL_CLIENT_SECRET || "pass",
  },
})
  return respuesta.data.access_token
}


export async function crearOrden() {
  const access_token = generaTokenAcceso()

  const url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders'

  const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer' + access_token,
  }
/*  editar / cambiar a tsx */
  const data = qs.stringify{
    intent: 'CAPTURE',
    purchase_units= [
      {
        items: [
          {
            name: 'Pagar Ahora',
            Description: '',
            quantity: 1,
            unit_amount: {
              Currency_code: 'USD',
              Value: '400'
            }
          }
        ]
      }
    ]
  }
  const respuesta = await axios.post(url, headers
    
  )
}