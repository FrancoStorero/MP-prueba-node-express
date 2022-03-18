const express = require("express");
const app = express();
const port = '3700';
const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require("mercadopago");


//middleware
app.use(bodyParser.urlencoded({ extended: false }))

// Agregar credenciales
mercadopago.configure({
  //aca va le access token del vendedor
  access_token:
    "APP_USR-1431419109587254-030705-3ea5723f9bc4c07a108e5a0261e03a45-1085446906",
});


//routes

app.post("/checkout", (req, res) => {
    
    console.log(req.body);

  // Crear un objeto de preferencia (ver Documentacion las preferencias completas)
  let preference = {
    items: [
      {
        title: req.body.titulo,
        unit_price: parseInt(req.body.precio),
        quantity: 1,
      },
    ],
  };


  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

      //redireccionamiento a https://www.mercadopago.com.ar/checkout/v1/redirect?pref_...
      
      res.redirect(response.body.init_point)
      console.log(response.body.init_point);

    })
    .catch(function (error) {
      console.log(error);
    });
});

//server
app.listen(port, (req, res) => {
  console.log(`Estamos en el puerto ${port}`);
});
