
const express = require('express');
const app = express();
require('dotenv').config() 
const mongoose = require('mongoose')
const cors=require('cors')
const bodyparser=require('body-parser')
const cookieParser = require('cookie-parser')

//import routes
const productRoutes = require('./routes/productRoutes')

// route middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

console.log('process.env.DB_CONNECT', process.env.DB_CONNECT)

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.DB_CONNECT,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    mongoose.set('strictQuery',true)
  } catch (e) {
    console.log("could not connect");
  }
  
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));

app.use("/api/products", productRoutes)
app.use(bodyparser.urlencoded())
app.use(bodyparser.json())
app.use((req, res, next) => {
// if(res.status(404))
//     console.log("page not found")

  res.status(404).send('page not found on server')
  res.status(500).send('internal server error 500')
})

// mongoose.set('strictQuery',true) //Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
app.listen(4000, () => console.log('server is up and running on port: 4000!'))