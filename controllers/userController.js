var usersModel =require('.././models/usersModel');
var bcrypt = require('bcrypt-nodejs');
var usersModel =require('.././models/usersModel');

var userController = {};


userController.signUp = function (req, res, next) {
    if(req.session.username){
        res.redirect('/');
    }else{
        res.render('users/signup', {
            title: 'registro',
            layout: 'templates/default',
            errorUsuario: req.flash('errorUsuario'),
            errorEmail: req.flash('errorEmail')

        });
    }

}

userController.postSignUp = function (req, res, next){


    var hash = bcrypt.hashSync(req.body.password);

    var usuario = {
        nombre : req.body.nombre,
        email : req.body.email,
        password : req.body.password,
        hash : hash,
        isAdmin: 0
    };

    usersModel.signUp(usuario,function (err,resultado) {
        if (err){
            res.status(500).json(err);
        }else{
            //
            switch (resultado){
                case 1:
                    req.flash('errorUsuario','El usuario ya existe, inténtelo de nuevo')
                    res.redirect('/users/signup');
                    break;
                case 2:
                    req.flash('errorEmail','El email ya existe, inténtelo de nuevo')
                    res.redirect('/users/signup');
                    break;
                case 3:
                    req.flash('registroOk','Se ha registrado correctamente, ahora puede iniciar sesión')
                    res.redirect('/users/login');
                    break;
            }
        }
    })
};

userController.signIn = function (req, res, next) {

    if(req.session.username){
        res.redirect('/');
    }else{
        res.render('users/signin', {
            title: 'login',
            layout: 'templates/default',
            registroOk: req.flash('registroOk'),
            errorEmail: req.flash('errorEmail'),
            errorPassword: req.flash('errorPassword')
        });
    }
};

userController.postSignIn = function (req, res , next) {
    var usuario = {
        email: req.body.email,
        password: req.body.password
    }
    usersModel.login(usuario, function (err, resultado, usuarioRegistrado) {
        if (err) {
            res.status(500).json(err);
        } else {
            switch (resultado) {
                case 1:
                    req.flash('errorEmail', 'El email no existe')
                    res.redirect('/users/login');
                    break;
                case 2:
                    req.flash('errorPassword', 'El password es incorrecto')
                    res.redirect('/users/login');
                    break;
                case 3:
                    req.session.username = usuarioRegistrado.nombre;
                    req.session.isAdmin = usuarioRegistrado.isAdmin;
                    res.redirect('/');
                    break;
            }

        }
    });
};

userController.logOut= function (req, res, next){


    if(!req.session.username){
        res.redirect('/');
    }else{
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = userController;


