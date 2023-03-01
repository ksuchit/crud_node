
const mongoose = require('mongoose')

const users = new mongoose.Schema({
    name:{type:String,required:true,min:4,max:15},
    email:{type:String,required:true},
    password:{type:String,required:true,min:8}
})

module.exports=mongoose.model("user",users)