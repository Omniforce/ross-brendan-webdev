module.exports = function(app) {

	app.post('/api/user', createUser);
	app.get('/api/user', handleQueries);
	app.get('/api/user/:userId', findUserById);
	app.put('/api/user/:userId', updateUser);
	app.delete('/api/user/:userId', deleteUser);

	var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]

	function handleQueries(req, res) {
		if(req.query.username && req.query.password) {
			findUserByCredentials(req, res);
		} else if(req.query.username) {
			findUserByUsername(req, res);
		}
	}

	function createUser(req, res) {
		var user = req.body;

		user._id = new Date().getTime();
		users.push(user);

		res.send(user);
	}

	function findUserByUsername(req, res) {
		var username = req.query.username;

		var user = users.find(function(user) {
			return username == user.username;
		});

		res.send(user);
	}

	function findUserByCredentials(req, res) {
		var username = req.query.username;
		var password = req.query.password;

		var user = users.find(function(user) {
			return username == user.username && password == user.password;
		});
		
		if (user) { res.send(user); }
		else { res.status(400).send("User/Password combination not found"); }
	}

	function findUserById(req, res) {
		var userId = req.params.userId;

		var user = users.find(function(user) {
			return userId == user._id;
		});

		if (user) { res.send(user); }
		else { res.status(400).send("User not found"); }
	}

	function updateUser(req, res) {
		var userId = req.params.userId;
		var index = getIndexOfUser(userId);
		var user = req.body;

		if (index > -1) { users[index] = user; }

		res.send(user);
	}

	function deleteUser(req, res) {
		var userId = req.params.userId;
		var index = getIndexOfUser(userId);

		if (index > -1) { users.splice(index, 1); }

		res.end();
	}

	function getIndexOfUser(userId) {
		return users.findIndex(function(user) {
			return userId == user._id;
		});
	}
}