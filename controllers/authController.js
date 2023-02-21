
const User = require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
    const {name,email,password}=req.body
    try {
        if(!(name&&email&&password))
           throw new Error("all fields Required")
        // const isRegistered = await User.find()
        // console.log(isRegistered)
        // console.log(isRegistered.find((data)=>data.email===email))
        // if (isRegistered.find((data)=>data.email===email))
        //     throw new Error('User already registered')
        // else {
        //     const register = await User({ name, email, password }).save();
        //     res.json(register)
        // }

        // await User.findOne({ email }, (err, user) => {
        //     if (err) {
        //         console.log("err", err)
        //         throw err
        //     }
        //     console.log("user",user)
        //     if (user) {
        //         throw new Error('user alredy Exist')
        //     }
        //     else {
        //         const register = User({ name, email, password }).save();
        //         res.json(register)
        //     }
        // })
        const oldUser=await User.findOne({email})
        if(oldUser)
           throw new Error("User is Already Registered")

        //Encrupt user password
        const encruptedPassword=await bcrypt.hash(password,10);
        console.log("password",encruptedPassword)

        const user=await User({
            name,
            email:email.toLowerCase(),
            password:encruptedPassword
        }).save();

        // const token=jwt.sign({user_id:user._id,email},
        //     process.env.TOKEN_KEY,{
        //         expiresIn:'2h'
        //     })
        // console.log(token)
        // //save user token
        // user.token=token

        //return new user
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
}

const login = async (req, res) => {
    try {
        const {email,password}=req.body;
        if(!(email&&password))
           throw new Error("email & password are required")
        
        const user=await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            console.log("valid user")
        }
        else
           throw new Error('Email or password is wrong') 
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
}

module.exports = {
    register,
    login
}