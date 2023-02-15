
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors=require('cors')

//import routes
const productRoutes = require('./routes/product')

// route middlewares
app.use("./api/products", productRoutes)
app.use(express.json())
app.use(cors())

dotenv.config(); 

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { userUnifiedTopology: true, useNewUrlParser: true },
    ()=> console.log("connected to db")
)
// mongoose.set('strictQuery',true) //Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
app.listen(4000, () => console.log('server is up and running on port: 4000!'))