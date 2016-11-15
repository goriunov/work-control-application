var express = require('express');
var router = express.Router();
var User = require('../mongoose_model/user');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');


router.post('/registration' , function(req, res ,next){
    var user = new User({
        'email': req.body.email.toLowerCase(),
        'password': passwordHash.generate(req.body.password),
        'phoneNumber': req.body.phoneNumber,
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'admin': false
    });

    user.save(function(err , response){
        if(err){
            return res.status(400).json({
                message: 'Some thing went wrong !',
                err: err
            });
        }
        return res.status(200).json({
            message: 'Successful registration !'
        });
    });
});

router.post('/sign-in', function(req , res ,next){
    User.findOne({'email': req.body.email.toLowerCase()} , function(err , response){
        if(err){
            return res.status(400).json({
                message: 'Some thing went wrong !',
                err: err
            });
        }
        if(response == null){
            return res.status(403).json({
                message: 'Some thing went wrong !',
                err: 'Wrong password or email'
            });
        }
        if(!passwordHash.verify(req.body.password , response.password)){
            return res.status(403).json({
                message: 'Some thing went wrong !',
                err: 'Wrong password or email'
            });
        }
        var token = jwt.sign( {doc: response},'superSecretForNow');
        return res.status(200).json({
            message: 'Successful Authorization !',
            admin: response.admin,
            token: token
        });
    });

});

router.get('/if-online' , function(req ,res ,next){
    jwt.verify(req.query.token , 'superSecretForNow' , function(err , response){
        if(err) {
            return res.status(400).json({
                message: 'Some thing went wrong !',
                err: err
            });
        }
        if(response == null){
            return res.status(403).json({
                message: 'Not authorize',
                err: 'Not authorize'
            });
        }
        return res.status(200).json({
            message: 'Successful Authorization !',
            admin: response.admin
        });
    });
});


module.exports = router;