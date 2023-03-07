
const mongoose=require('mongoose')

const profile=new mongoose.Schema({
    image:String,
    age:Number,
    name:String
})

module.exports=mongoose.model('profile',profile)