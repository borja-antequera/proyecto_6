var express = require('express');
var router = express.Router();
var destinationsController = require('../controllers/destinationController');


router.get('/adminpanel', function(req, res, next) {
        destinationsController.getAllDestinations(req, res, next);
});

router.post('/adminpanel/crear', function(req, res, next) {

    destinationsController.createDestination(req, res, next);
});

router.get('/adminpanel/borrar/:id', function (req,res,next) {

    destinationsController.deleteDestination(req, res, next);
})



module.exports = router;