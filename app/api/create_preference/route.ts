// // SDK de Mercado Pago
// import { MercadoPagoConfig, Preference } from 'mercadopago';
// // Agrega credenciales
// const client = new MercadoPagoConfig({ accessToken: 'APP_USR-3733029066978986-103121-c560d97529e325dcd4b8f25edcf96650-2959473187' });

// const preference = new Preference(client);

// preference.create({
//   body: {
//     items: [
//       {
//         title: 'Mi producto',
//         quantity: 1,
//         unit_price: 2000,
//       }
//     ],
//   }
// })
// .then(console.log)
// .catch(console.log);