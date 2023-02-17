const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type:String, required:true },
    price: { type:Number, required:true },
    image: { type:String, required:true },
    details:{ type:String, required:true }
})

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password:{ type:Number, required:true}
})

module.exports = mongoose.model("Product", productSchema)
