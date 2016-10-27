var express = require('express');
var router  = express.Router();

var jwt = require('jsonwebtoken');

//Mock data
var user = {
    email: '',
    password: ''
}

router.get('/' , function(req ,res ,next){
  res.write('Still in work 2');
    res.end();
});


router.get('/sign-in' , function(req ,res ,next){
    if(user.email == req.body.email && user.password == req.body.password){
        var token = jwt.sign({user: user},'secret');
        res.status(204).json({
            user: user,
            token: token
        });
    }else{
         res.status(401).json({
            message: 'Wrong email or password'
        });
    }
    
})

router.post('/regisration' , function(req ,res ,next){
    user.email = req.body.email;
    user.password = req.body.password;
    res.status(204).json({
            message:"You have been registrated, now try to sign in"
        });
});


module.exports = router;