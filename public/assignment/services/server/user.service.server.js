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
		
	}

	function createUser(req, res) {

	}

	function findUserByUsername(req, res) {
		
	}

	function findUserByCredentials(req, res) {
		
	}

	function findUserById(req, res) {
		
	}

	function updateUser(req, res) {
		
	}

	function deleteUser(req, res) {

	}
}