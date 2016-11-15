var express = require('express');
var bodyParser = require('body-parser');
var compressor = require('compression');
var mongoose = require('mongoose');
var config = require('./main-config/main-config')

var app = express();
var main  = require('./routes/index');
var reg_auth = require('./routes/registration-authorization');

mongoose.connect(config.dbUserName +':'+config.dbPassword+'@ds044679.mlab.com:44679/linker');
mongoose.Promise = global.Promise;

app.use(compressor());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/user' , reg_auth);
app.use('/' , main);


var port = 3000;
if (process.env.PORT) {
    port = process.env.PORT;
}
app.listen(port , function(){
    console.log('App is running on : http://localhost:' + port);
})




