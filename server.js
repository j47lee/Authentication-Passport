var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

// bring in the database configuration to MongoLab
var configDB = require('./config/database')

mongoose.connect(configDB.url); //database connection

// require('./config/passport')(passport);

app.use(morgan('dev')); //log requests to console
app.use(cookieParser()); // reads cookies for authentication
app.use(bodyParser()); // retrieve info from html forms

app.set('view engine', 'ejs');

app.use(session({ secret : 'lakers' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Listening on Port', port);
