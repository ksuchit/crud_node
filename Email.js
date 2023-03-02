const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'suchitkore1528@gmail.com',
        pass:'Suchit@1234'
    }
})

const message = {
    from: 'admin@gmail.com',
    to: 'sanketanandkar100@gmail.com',
    subject: 'Plan something interesting',
    text:'1.dinner 2.outing 3.fc'
}

const sendMail=transport.sendMail(message, (err,info) => {
    if (err)
        console.log(err)
    else
        console.log(info)
})

module.exports=sendMail