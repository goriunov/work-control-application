var express = require('express');
var router  = express.Router();

var jwt = require('jsonwebtoken');

router.get('/' , function(req ,res ,next){
    res.write('Still in work');
    res.end();
});


router.use('/' , function(req ,res ,next){
   jwt.verify(req.query.token , 'secret' , function(err , decoded){
       if(err){
           return res.status(401).json({
              message: 'You are not authorized' 
           });
       }
       next();
   });
});

router.get('get-data' , function(req ,res ,next){
    res.status(200).json({
       message: "You are authorized : )" 
    });
});


module.exports = router;