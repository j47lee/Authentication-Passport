var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var passport = require('passport');
var flash = require('connect-flash');

app.use('/assets', express.static(__dirname + '/public')); //setup public assets

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//set up database (convert standard MongoDB connection string format to the one that Mongoose expects)
var mongodbUri = require('./config/database').url;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri);
mongoose.connect(mongooseUri, function(err){
  if (err) {
    console.log('---There was an error connecting to the database!');
  }
});

require('./config/passport')(passport);

app.use(morgan('dev')); //log requests to console
app.use(cookieParser()); // reads cookies for authentication
app.use(bodyParser()); // retrieve info from html forms

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(session({ secret : 'lakers' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Listening on Port', port);
