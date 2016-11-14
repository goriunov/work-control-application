var express = require('express');
var router = express.Router();


router.get('/' , function(req ,res ,next){
    res.write('In work');
    res.end();
});



module.exports = router;