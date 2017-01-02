var express = require('express');
var router = express.Router();
var User = require('../mongoose_model/user');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('../main-config/main-config');


router.post('/registration' , function(req, res ,next){
    var user = new User({
        'email': req.body.email.toLowerCase(),
        'password': passwordHash.generate(req.body.password),
        'phoneNumber': req.body.phoneNumber,
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'break': '30',
        'rate': '15',
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
                message: 'Some thing went wr,ong !',
                err: 'Wrong password or email'
            });
        }
        var token = jwt.sign( {docID: response._id , admin: response.admin}, config.jwtSecret);
        return res.status(200).json({
            message: 'Successful Authorization !',
            admin: response.admin,
            user: response,
            token: token
        });
    });

});

router.get('/if-online' , function(req ,res ,next){
    jwt.verify(req.query.token , config.jwtSecret , function(err , response){
        if(err) {
            return res.status(403).json({
                message: 'Token is not authorized',
                err: err
            });
        }
        return res.status(200).json({
            message: 'Successful',
            admin: response.admin
        });
    });
});


module.exports = router;