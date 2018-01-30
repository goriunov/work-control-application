
var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../main-config/main-config');
var User = require('../mongoose_model/user');
var TimeTable = require('../mongoose_model/timetable');




router.use(function(req ,res ,next){
    jwt.verify(req.query.token , config.jwtSecret , function(err ,response){
        if(err){
           return res.status(403).json({
                message: "You are not authorized",
                err: err
            });
        }
        next()
    });
});

router.get('/time-table' , function(req ,res ,next){
    var user = jwt.decode(req.query.token);
    var allMonth = ['January' , 'February' , 'March' , 'April' , 'May', 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
    var userTimeTable=[];

    // User.findById('586b251e7572f818fcd43c83')

    User.findById(user.docID)
        .populate('timeTable')
        .exec(function(err ,result){
            if(result.timeTable.length > 0) {
                var year = parseInt(result.timeTable[0].year);
                console.log(year);

                for (var i = 0; i < result.timeTable.length; i++) {
                    if (result.timeTable[i].year > year) {
                        year = result.timeTable[i].year;
                    }
                }
                for (var y = 0; y < 2; y++) {
                    year -= y;
                    for (var i = allMonth.length - 1; i >= 0; i--) {
                        for (var l = 31; l >= 1; l--) {
                            for (var j = result.timeTable.length-1; j >= 0; j--) {
                                if (year == result.timeTable[j].year) {
                                    if (result.timeTable[j].month == allMonth[i] && parseInt(result.timeTable[j].date.substring(0, 2)) == l) {
                                        userTimeTable.push(result.timeTable[j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }else{
                userTimeTable = [];
            }

            if(err){
                return res.status(500).json({
                    message: "You are not authorized",
                    err: err
                });
            }
            return res.status(200).json({
                message: "Success",
                timeTable: userTimeTable
            })
        });
});


router.post('/new-time-table' , function(req ,res  ,next){
    var user = jwt.decode(req.query.token);

    User.findById(user.docID, function(err , userInfo){
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
            'year': req.body.year,
            'user': user.docID
        });

        timeTable.save(function (err , response) {
            if(err){
                return res.status(403).json({
                    message: "Error, can not save",
                    err: err
                });
            }
            userInfo.timeTable.push(response);
            userInfo.save(function(err , response){
                if(err){
                    return res.status(403).json({
                        message: "Error, can not save",
                        err: err
                    });
                }
                return res.status(200).json({
                    message: "Success"
                });
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
        response.year = req.body.year;

        response.save(function(err ,done){
            if(err){
                return res.status(403).json({
                    message: "Error, could not save",
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
