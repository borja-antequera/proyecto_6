
const Email = require('../config/emailConf');
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path');
var usersModel = require('../models/usersModel');


var emailController = {};


emailController.recover=  (req, res, next) => {
    usersModel.checkEmail(req.body.emailRecover, (err,resultado)=>{
        if(err) next();
        if(resultado == ''){
            req.flash('mailError', 'El mail no existe, inténtelo de nuevo')
            res.redirect('/users/login');

        }
        else{
            req.flash('mailSuccess', 'El mail se ha enviado correctamente');
            let message = {
                to: req.body.emailRecover,
                subject: 'Email de recuperacion de contraseña',
                html: '<p>Estimado/a '+resultado[0].usuario+':<br>Haga click en el enlace para recuperar su contraseña.</p><br>' +
                '<a href="http://localhost:3000/email/recover/'+resultado[0].hash+'">Recuperar contraseña de Geekshubs travels.</a>'
            }
            Email.transporter.sendMail(message, (error, info)=>{
                if (error){
                    next()
                }
                Email.transporter.close();

            })

            res.redirect('/users/login');
        }
    })
    
};
emailController.checkHash = (req, res, next) => {
    usersModel.checkHash(req.params.hash, (error, resultado) => {
        if (error) cb(error);
        if (resultado == '') {
            next()
        }
        res.render('users/recuperar', {
            title: 'recuperar contraseña',
            layout: 'layout',
            id: resultado[0].id

        })

    })
}

module.exports = emailController;