
var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../main-config/main-config');
var User = require('../mongoose_model/user');// jscs:ignore
var TimeTable = require('../mongoose_model/timetabel');

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

router.post('/new-time-table' , function(req ,res  ,next){
    var user = jwt.decode(req.query.token);

    User.findById(user.doc._id , function(err , userInfo){
        if(err){
            return res.status(403).json({
                message: "Error occurred",
                err: err
            });
        }

        var timeTable = new TimeTable({
            'weekDay': req.body.weekDay,
            'date': req.body.date,
            'startTime' : req.body.startTime,
            'endTime': req.body.endTime,
            'month': req.body.month,
            'salary': req.body.salary,
            'user': user.doc._id
        });

        timeTable.save(function (err , response) {
            if(err){
                return res.status(403).json({
                    message: "Error, can not save",
                    err: err
                });
            }
            userInfo.timeTable.push(response);
            userInfo.save();
            return res.status(200).json({
                message: "Success"
            });
        });
    });
});

router.get('/single/:id' , function(req ,res ,next){
    TimeTable.findById(req.params.id , function(err , response){
        if(err){
            return res.status(404).json({
                message: "Error, not found",
                err: err
            });
        };
        return res.status(200).json({
            message: "Success",
            doc: response
        });
    });
});

router.post('/update' , function(req , res ,next){
    TimeTable.findById(req.body._id , function(err , response){
        response.weekDay = req.body.weekDay;
        response.date = req.body.date;
        response.startTime = req.body.startTime;
        response.endTime = req.body.endTime;
        response.month = req.body.month;
        response.salary = req.body.salary;

        response.save(function(err ,done){
            if(err){
                return res.status(403).json({
                    message: "Error, couuld not save",
                    err: err
                });
            };
            return res.status(200).json({
                message: "Success"
            });
        });
    })
});



module.exports = router;
