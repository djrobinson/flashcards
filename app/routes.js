var Card = require('./models/card');
	
	module.exports = function(app){
	
		app.get('/api/cards', function(req, res) {
			Card.find(function(err, cards) {
			
				if(err) 
					res.send(err);
				
				res.json(cards);
			});
		});

		app.post('/api/cards', function(req, res){
			Card.create({
				question : req.body.question,
				answer : req.body.answer
			}, function( err, cards ){
				if (err)
					res.send(err);

			
				Card.find(function(err, cards){
					if (err)
						res.send(err);

					res.json(cards);
				})
			})
		});
		
		
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});

		//app.get('/api/cards/:id')
	
	}	
