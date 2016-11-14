var express = require('express');
var router = express.Router();


router.get('/' , function(req ,res ,next){
    res.write('In work');
    res.end();
    console.log(typeof "lol");
});



module.exports = router;