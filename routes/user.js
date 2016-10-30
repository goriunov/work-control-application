var express = require('express');
var router  = express.Router();

var jwt = require('jsonwebtoken');

//Mock data
var email= '';
var password= '';

router.get('/' , function(req ,res ,next){
  res.write('Still in work 2');
    res.end();
});


router.get('/sign-in' , function(req ,res ,next){
    if(email == req.body.email && password == req.body.password){
        var token = jwt.sign({email: email, password: password},'secret');
        return res.status(200).json({
            email: email,
            password: password,
            token: token
        });
    }else{
         return res.status(401).json({
            message: 'Wrong email or password'
        });
    } 
})

router.post('/registration' , function(req ,res ,next){
    email = req.body.email;
    password = req.body.password;
    return res.status(200).json({
            message:"You have been registrated, now try to sign in"
        });
});


module.exports = router;