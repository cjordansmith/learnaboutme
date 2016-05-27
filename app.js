//  Required modules for LAM
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var passport = require("passport");
var session = require("express-session");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

var setUpPassport = require("./setuppassport");
//  Puts all routes in abother file
var routes = require('./routes');

//  Create express app
var app = express();

var gracefulShutdown;
var dbURI = 'mongodb://localhost/lam';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}

//  Connect to MongoDB server in the 'test' database
mongoose.connect(dbURI);
setUpPassport();

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

//  Set port for server to start on
app.set('port', process.env.PORT || 3000);

//  Tell Express where to look for views folder
// Define view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  Use Middleware's below
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

//  Start server on port listed above
app.listen(app.get('port'), function() {
  console.log("Server started on port " + app.get('port'));
});
