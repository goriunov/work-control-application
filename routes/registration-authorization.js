var express = require('express');
var router = express.Router();
var User = require('../mongoose_model/user');
var jwt = require('jsonwebtoken');
var passworHash = require('password-hash');


router.post('/registration' , function(req, res ,next){
    var user = new User({
        'email': req.body.email,
        'password': passworHash.generate(req.body.password),
        'phoneNumber': req.body.phoneNumber,
        'firstName': req.body.firstName,
        'lastName': req.body.lastName
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
    User.findOne({'email': req.body.email} , function(err , response){
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
        if(!passworHash.verify(req.body.password , response.password)){
            return res.status(403).json({
                message: 'Some thing went wrong !',
                err: 'Wrong password or email'
            });
        }
        var token = jwt.sign( {doc: response},'superSecretForNow');
        return res.status(200).json({
            message: 'Successful Authorization !',
            user: response,
            token: token
        });
    });

});


module.exports = router;