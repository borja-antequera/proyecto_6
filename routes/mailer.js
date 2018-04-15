var express = require('express');
var router = express.Router();
const emailController = require('../controllers/emailController');


router.post('/recover', (req, res, next)=>{
    emailController.recover(req, res, next);
});

router.get('/recover/:hash', (req, res, next)=>{
        emailController.checkHash(req, res, next);

})


module.exports = router;