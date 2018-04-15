const NodeMailer = require('nodemailer');
let email = {};


email.transporter = NodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'borjaantequera@hotmail.com',
            pass: 'hatfield78'
        },

    },
    {
        from: 'borjaantequera@gmail.com',
        headers: {}
    })


module.exports = email;