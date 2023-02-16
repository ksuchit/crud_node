
const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const cors=require('cors')
const bodyparser=require('body-parser')
const cookieParser = require('cookie-parser')

//import routes
const productRoutes = require('./routes/product')

// route middlewares

app.use(express.json())
app.use(cookieParser())
app.use(cors())





console.log(' process.env.DB_CONNECT', process.env.DB_CONNECT)
//connect to db
//    mongoose.connect(
//    
//     { userUnifiedTopology: true, useNewUrlParser: true },
//     ()=> console.log("connected to db")
// )
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.DB_CONNECT,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  } catch (e) {
    console.log("could not connect");
  }
  
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));

app.use(bodyparser.urlencoded())
app.use(bodyparser.json())


app.use("/api/products", productRoutes)

// app.get("/p:id", function(req, res) {
//     res.send("tagId is set to " + req);
//   });

// mongoose.set('strictQuery',true) //Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
app.listen(4000, () => console.log('server is up and running on port: 4000!'))