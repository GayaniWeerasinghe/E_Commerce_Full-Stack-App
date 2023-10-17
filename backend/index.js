const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')

const app = express()
// Allow requests from a specific origin
app.use(cors({
  origin: 'https://e-commerce-full-stack-app-g1ln-frontend.vercel.app',
}));
app.use(express.json({limit : '10mb'}))

const PORT = process.env.PORT || 8080

//mongodb connection
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to Database!"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//userModel
const userModel = mongoose.model("user", userSchema);

//api
app.get('/', (req,res)=> {
    res.send("Server is running")
})

//Signup api
app.post("/signup", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      res.send({ message: "Email is already registered!", alert: false });
    } else {
      const newUser = new userModel(req.body);
      const savedUser = await newUser.save();
      res.send({ message: "Successfully Registered", alert: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred", alert: false });
  }
});

//Login api
app.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      }
      res.send({ message: "Successfully Logged", alert: true ,data:dataSend});
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Email is not available, please sign up", alert: false });
  }
});


//Product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

// Product API
//Add products
app.post("/addProduct",async(req,res)=>{
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Product Added Successfully!"})
})

//View products
app.get("/products",async(req,res)=>{
  // console.log(req.body)
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

//Payment Gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/create-checkout-session",async(req,res)=>{

     try {
      
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1O1TPASJmqThaXjL0bfPgXfU"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "lkr",
                product_data : {
                  name : item.name,
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,
      }

      const session = await stripe.checkout.sessions.create(params)
      res.status(200).json(session.id)

     } catch (error) {
        res.status(error.statusCode || 500).json(error.message)
     }
     

})


app.listen(PORT, ()=>console.log("Server is running on port : " + PORT))
