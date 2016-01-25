//use npm modules

var express				  = require('express');
var app					    = express();
var bodyParser			= require('body-parser');
var methodOverride	= require('method-override');
var morgan          = require('morgan');
var db              = require('./config/db');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var session         = require('express-session');
var cookieParser    = require('cookie-parser')

var port = process.env.PORT || 3000

mongoose.connect(db.url);

app.use(bodyParser.json());

//why differentiate the following?:
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());
//app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

require('./config/passport')(passport); //uncomment later

app.use(cookieParser());

app.use(session({ secret: 'testsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./app/routes')(app, passport);

app.listen(port);

console.log('application has started on port ' + port);

