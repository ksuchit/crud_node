
const User = require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { duplicateEmailCheck } = require('../middleware/duplicateEmailCheck')
const { registration } = require('../validations/AuthValidation')

const register = async (req, res) => {
    try {
        const {name,email,password}=req.body
        if(!(name&&email&&password))
            throw new Error("all fields Required")
        
        const result = await registration.validate(req.body)
        console.log(result)
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
        // const oldUser=await User.findOne({email})
        console.log("regi", await duplicateEmailCheck(email))
        if(await duplicateEmailCheck(email))
           return res.json({message:"User is Already Registered"})

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
        
        if(!(await duplicateEmailCheck()))
            return res.json({message:'User is not registered'})

        let user = await User.findOne({ email })
        console.log(user)
        console.log("bcrypt compare",await bcrypt.compare(password,user.password))
        if(user && (await bcrypt.compare(password,user.password))){
            console.log("valid user")
        
        //generate JWT token
        const token=jwt.sign({user_id:user._id,email},
            process.env.PRIVATE_KEY,{
                expiresIn:'2h'
            })
        //save token
        const {password,...userData}=user._doc   
        console.log({userData,token})
        res.status(201).json({userData,token}) 
        }
        else
           throw new Error('Email or password is wrong') 
    } catch (error) {
    //    return res.status(400).send({message:'This is an error!'})
       return res.status(400).json({error:error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log("inside deleteuser",req.params.userId)
        const removedUser = await User.findByIdAndDelete(req.params.userId);
        console.log("removed user",removedUser)
        res.status(201).json(removedUser)
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
}

const changePassword = async (req,res) => {
    try {
        const { id, old_password, new_password } = req.body
        const user = await User.findOne({ _id: id })

        if (user && (await bcrypt.compare(old_password, user.password)))
            console.log('verified user')
        else
            throw new Error("password does not match with your old password")
        
        const encruptedPassword=await bcrypt.hash(new_password,10)
        const updatedUser = await User.findOneAndUpdate({ _id: id }, { password: encruptedPassword})
        console.log(updatedUser)
        res.status(202).json({message:"Password updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(422).json({message:error})
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await User.findOneAndUpdate({ email }, { name, email }, { new: true })
        if (!(user))
            return res.status(403).json({statuscode:403,message:"User not found"})
        
        console.log(user)
        res.status(202).json(user)
    } catch (error) {
        res.status(403).json(error)
    }
}

module.exports = {
    register,
    login,
    deleteUser,
    changePassword,
    updateUser
}