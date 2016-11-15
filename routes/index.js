var express = require('express');
var router = express.Router();


router.get('/' , function(req ,res ,next){
    res.write('Website is in Work');
    res.end();
});



module.exports = router;