var destinationsModel = require('../models/destinationsModel');
var destinationsController = {};

destinationsController.getAllDestinations= (req, res, next)=> {
    console.log("Estoy entrando");
    destinationsModel.getAllDestinations((err,destinos)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.redirect('/');
            }else{
                if(req.session.isAdmin){
                    res.render('adminPanel',{
                        title: 'Panel de administrador',
                        layout: '../views/templates/default',
                        destinos: destinos,
                        correcto: req.flash('correcto'),
                        error: req.flash('error'),
                    })
                }else{
                    res.redirect('/');
                }
            }
        }
    })
};

destinationsController.createDestination = (req, res, next)=>{
    var destino={
        nombre_viaje: req.body.nombre,
        fechas: req.body.fecha,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        precio: req.body.precio,
        activo: req.body.activo
    }

    destinationsModel.createDestination(destino,(err,result)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.redirect('/');
            }else{
                if(req.session.isAdmin){
                    req.flash('correcto','Se ha creado el viaje correctamente!')
                    res.redirect('/admins/adminpanel');
                }else{
                    res.redirect('/');
                }
            }
        }
    })
};

destinationsController.deleteDestination = (req, res, next) =>{
    destinationsModel.deleteDestination(req.params.id, (err, result)=>{
        if(err){
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.redirect('/');
            }else{
                if(req.session.isAdmin){
                    req.flash('error','Se ha borrado el registro '+req.params.id+'!')
                    res.redirect('/admins/adminpanel');
                }else{
                    res.redirect('/');
                }
            }
        }
    })
};

module.exports = destinationsController;

