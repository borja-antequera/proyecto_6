var express = require('express');
var hash= require('bcrypt-nodejs');
var router = express.Router();
var destinationsModel =require('.././models/destinationsModel');


/* GET home page. */
router.get('/', function(req, res, next) {
    destinationsModel.getAllDestinations((err,destinos)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.render('home',{
                    title: 'Home',
                    layout: '../views/templates/default',
                    destinos: destinos
                });
            }else{
                if(req.session.isAdmin){
                    res.render('home',{
                        title: 'Home',
                        layout: '../views/templates/default',
                        destinos: destinos,
                        isLogged: true,
                        isAdmin: true
                    });
                }else{
                    res.render('home',{
                        title: 'Home',
                        layout: '../views/templates/default',
                        destinos: destinos,
                        isLogged: true,
                    });
                }
            }

        }
    })
});





module.exports = router;


