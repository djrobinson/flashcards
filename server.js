//use npm modules

var express				  = require('express');
var app					    = express();
var bodyParser			= require('body-parser');
var methodOverride	= require('method-override');
var morgan          = require('morgan');
var db              = require('./config/db');
var mongoose        = require('mongoose');

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

require('./app/routes')(app);

app.listen(port);

console.log('application has started on port ' + port);

