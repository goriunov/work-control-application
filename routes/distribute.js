var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../main-config/main-config');
var User = require('../mongoose_model/user');

router.use(function(req ,res ,next){
    jwt.verify(req.query.token , config.jwtSecret , function(err ,response){
        if(err){
           return res.status(403).json({
                message: "You are not authorized",
                err: err
            });
        }
        next();
    });
});

router.get('/time-table' , function(req ,res ,next){
    var user = jwt.decode(req.query.token);
    User.findById(user.doc._id)
        .populate('timeTable')
        .exec(function(err ,result){
            if(err){
                return res.status(500).json({
                    message: "You are not authorized",
                    err: err
                });
            }
            return res.status(200).json({
                message: "Success",
                user: result
            })
        });

});

module.exports = router;
