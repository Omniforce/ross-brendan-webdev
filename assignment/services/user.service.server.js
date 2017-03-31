var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, model) {

    var User = model.userModel;

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);

	app.get('/api/user', findUserByUsername);
	app.get('/api/user/:userId', findUserById);
	app.put('/api/user/:userId', updateUser);
	app.delete('/api/user/:userId', deleteUser);

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/assignment/index.html#!/login' }),
        function(req, res) {
            res.redirect('/assignment/index.html#!/user/' + req.user._id);
        });

    var facebookConfig = {
        clientID     : "282818828807390",
        clientSecret : "c916da52e3cd052c1b768a23b4f836de",
        callbackURL  : 'http://localhost:3000/auth/facebook/callback'
    };

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

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
        User.findUserByUsername(username)
            .then(function(user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function(err) {
                return done(err, null);
            });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        User.findOrCreateUserByFacebookId(profile.id)
            .then(function(doc) {
                var user = doc.result;
                return done(null, user);
            }, function(err) {
                return done(err, null);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.send(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        User.createUser(user)
            .then(function(user) {
                if(user) {
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.send(user);
                        }
                    });
                }
            });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
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
