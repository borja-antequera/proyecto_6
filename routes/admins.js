var express = require('express');
var router = express.Router();
var destinationsController = require('../controllers/destinationController');
var userController = require('../controllers/userController');
const Multer = require('multer');
const upload =  require('../config/multer');


router.get('/adminpanel', function(req, res, next) {
        destinationsController.getAllDestinations(req, res, next);
});

router.post('/adminpanel/crear',upload.single('file'), function(req, res, next) {

    destinationsController.createDestination(req, res, next);
});

router.get('/adminpanel/borrar/:id', function (req,res,next) {

    destinationsController.deleteDestination(req, res, next);
});

//---adminusersPanel--


router.get('/userpanel', function(req, res, next) {
   userController.getAllUsers(req, res, next);
});

router.get('/userpanel/isAdmin/:id', function (req,res, next) {
    userController.darPermisos(req, res, next);

});

router.get('/userpanel/active/:id', function (req,res, next) {
    userController.activar(req, res, next);

});

router.get('/userpanel/borrarUser/:id', function (req,res, next) {
    userController.deleteUser(req, res, next);

});




module.exports = router;