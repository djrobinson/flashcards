var Card = require('./models/card');

	module.exports = function(app, passport){

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

		app.get('/login', function(req, res){
			res.sendfile('./public/views/login.html', { message: req.flash('loginMessage') });
		})

		app.get('/edit', isLoggedIn, function(req, res){
			res.sendfile('./public/views/edit.html', { user: req.user });
		})

		app.get('/logout', function(req, res){
			req.logout();
			res.sendfile('./public/views/login.html');
		})

		app.get('/signup', function(req, res) {

        res.sendfile('./public/views/signup.html', { message: req.flash('signupMessage') });
    });

		app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html');
		});

	}

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}