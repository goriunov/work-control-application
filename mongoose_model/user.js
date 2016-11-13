var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
    'email': {type: String ,required: true ,unique: true},
    'password': {type: String , required: true},
    'phoneNumber': {type: Number , required: true},
    'firstName': {type: String , required: true},
    'lastName':{type: String , required :true}
});


module.exports = mongoose.model('temp_user' ,user);

