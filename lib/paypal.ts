import axios from "axios"
import qs from "qs"
import { preconnect } from "react-dom";

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
  console.log(respuesta.data);
}
