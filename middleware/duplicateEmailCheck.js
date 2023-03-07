
const User=require('../model/User')

const duplicateEmailCheck= async(email)=>{

    console.log('inside duplicate email')
    const user= await User.findOne({email})
    console.log(user)
    if(user)
    return true
    else
    return false
}

module.exports={
    duplicateEmailCheck
}