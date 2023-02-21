
const User = require('../model/User')

const register = async (req, res) => {
    const {name,email,password}=req.body
    try {
        const isRegistered = await User.find()
        console.log(isRegistered)
        console.log(isRegistered.find((data)=>data.email===email))
        if (isRegistered.find((data)=>data.email===email))
            throw new Error('User already registered')
        else {
            const register = await User({ name, email, password }).save();
            res.json(register)
        }

        await User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.log("err", err)
                throw err
            }
            console.log("user",user)
            if (user) {
                throw new Error('user alredy Exist')
            }
            else {
                const register = User({ name, email, password }).save();
                res.json(register)
            }
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
}

const login = async (req, res) => {
    
}

module.exports = {
    register
}