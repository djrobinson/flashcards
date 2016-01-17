
//load mongoose and define model
var mongoose = require('mongoose');

module.exports = mongoose.model('Cards', {
	question : String,
	answer : String
});
