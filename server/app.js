// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const stripe = require("stripe")(process.env.STRIPE_SECRET);

// app.use(express.json());
// app.use(cors());

// // checkout api
// app.post("/api/create-checkout-session",async(req,res)=>{
//     const {products} = req.body;


//     const lineItems = products.map((product)=>({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:product.dish,
//                 images:[product.imgdata]
//             },
//             unit_amount:product.price * 100,
//         },
//         quantity:product.qnty
//     }));

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types:["card"],
//         line_items:lineItems,
//         mode:"payment",
//         success_url:"http://localhost:3000/sucess",
//         cancel_url:"http://localhost:3000/cancel",
//     });

//     res.json({id:session.id})
 
// })


// app.listen(7000,()=>{
//     console.log("server start")
// })

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
    const { products, customerName, customerAddress } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.dish,
                images: [product.imgdata]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        billing_address_collection: 'auto', // Collect billing address automatically
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'DE'] // Allow shipping address only from these countries
        },
        customer_email: 'customer@example.com', // You can set this dynamically from customer input
        metadata: {
            customer_name: customerName, // Pass customer name as metadata
            customer_address: customerAddress // Pass customer address as metadata
        }
    });

    res.json({ id: session.id });
});

app.listen(7000, () => {
    console.log("server start")
});
