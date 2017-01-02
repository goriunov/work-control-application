var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var timeTable = new Schema({
    'weekDay': {type : String , required: true},
    'date': {type: String , required: true},
    'startTime' : {type : String , required: true},
    'endTime': {type: String , required: true},
    'month': {type: String , required: true},
    'rate': {type: String , required: true},
    'user': {type: Schema.Types.ObjectId , ref: 'temp_user'}
});

module.exports = mongoose.model("TimeTable" , timeTable);