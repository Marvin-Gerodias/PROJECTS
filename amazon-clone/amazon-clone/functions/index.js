//EXPRESS app hosted on a cloud funtion
const functions = require("firebase-functions");
const express = require("express");
// const cors = require("cors");
const stripe = require("stripe")('sk_test_51ITEFzHUcOuXHEqyykegldZGNzrsE95hquFxtzxrIQoJTntvgSZQMzvMUYgylzQAFAvLFMPWQ9cPpUDNff3BJsdP001fprBTLK');

//API

//App config
const app = express();

//middlewares
// app.use(cors({origin: true}));
app.use(express.json());

//api routes
app.get('/', (request, response) => response.status(200).send('Hello World!'));
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received >>>>>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd",
    });
    // OK -Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

//listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/clone-fe45f/us-central1/api
