var Card = require('./models/card');
	
	module.exports = function(app){
	
		app.get('/api/nerds', function(req, res) {
			Card.find(function(err, cards) {
			
				if(err) 
					res.send(err);
				
				res.json(cards);
			});
		});
		
		
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});
	
	}
