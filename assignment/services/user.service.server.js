var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, model) {

	var User = model.userModel;

    app.post  ('/api/login', passport.authenticate('local'), login);

	app.post('/api/user', createUser);
	app.get('/api/user', handleQueries);
	app.get('/api/user/:userId', findUserById);
	app.put('/api/user/:userId', updateUser);
	app.delete('/api/user/:userId', deleteUser);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use(new LocalStrategy(localStrategy));

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        User.findUserById(user._id)
            .then(function(user) {
                done(null, user);
            }, function(err) {
                done(err, null);
            });
    }

    function localStrategy(username, password, done) {
        User.findUserByCredentials(username, password)
            .then(function(user) {
                if (user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function(err) {
                return done(err, null);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.send(user);
    }

	function handleQueries(req, res) {
		if(req.query.username && req.query.password) {
			findUserByCredentials(req, res);
		} else if(req.query.username) {
			findUserByUsername(req, res);
		}
	}

	function createUser(req, res) {
		var user = req.body;

		User.createUser(user)
			.then(function(user) {
				res.send(user);
			}, function(err) {
				res.status(500).send("Unable to create new user");
			});
	}

	function findUserByUsername(req, res) {
		var username = req.query.username;

		User.findUserByUsername(username)
			.then(function(user) {
				if (user) { res.send(user); }
				else { res.status(500).send("Unable to find user with this username"); }
			}, function(err) {
				handleError(err, res)
			});
	}

	function findUserByCredentials(req, res) {
		var username = req.query.username;
		var password = req.query.password;

		User.findUserByCredentials(username, password)
			.then(function(user) {
				if (user) { res.send(user); }
				else { res.status(500).send("Unable to find username/password combination"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function findUserById(req, res) {
		var userId = req.params.userId;

		User.findUserById(userId)
			.then(function(user) {
				if (user) { res.send(user); }
				else { res.status(500).send("Unable to find user"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function updateUser(req, res) {
		var userId = req.params.userId;
		var user = req.body;

		User.updateUser(userId, user)
			.then(function(updatedUser) {
				if (updatedUser) { res.send(updatedUser); }
				else { res.status(500).send("Unable to update user"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function deleteUser(req, res) {
		var userId = req.params.userId;

		User.deleteUser(userId)
			.then(function(user) {
				if (user) { res.end(); }
				else { res.status(500).send("Unable to delete user"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function handleError(err, res) {
		console.log(err);
		res.status(500).send("Something seems to have gone wrong...");
	}
}
