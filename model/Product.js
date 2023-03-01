const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type:String, required:true ,min:4},
    price: { type:Number, required:true ,min:100},
    image: { type:String, required:true },
    details:{ type:String, required:true }
})

module.exports = mongoose.model("Product", productSchema)
