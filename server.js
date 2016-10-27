var express = require('express');
var body_parser = require('body-parser');
var compressor = require('compression');
var path = require('path');

var app = express();
var main_router = require('./routes/index');
var user_managment = require('./routes/user');

app.use(compressor());
// Add static files for front end;
// Add View engine for front end;

app.use(body_parser.json());



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


app.use('/user' , user_managment);
app.use('/' , main_router);

app.get('*' , function(req ,res ,next){
    res.write('Not such a page');
    res.end();
});

var port = 3000;
if (process.env.PORT) {
    port = process.env.PORT;
}

app.listen(port, function(){
    console.log('App is working on localhost:'+ port);
})

