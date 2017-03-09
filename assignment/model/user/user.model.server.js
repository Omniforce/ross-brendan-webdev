var mongoose = require('mongoose');

module.exports = function() {
	var userSchema = require('./user.schema.server.js')();
	var User = mongoose.model('User', userSchema);

	var api = {
		createUser: createUser,
		findUserById: findUserById,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials,
		updateUser: updateUser,
		deleteUser: deleteUser,
	};

	return api;

	function createUser(user) {
		var newUser = new User(user);
		return newUser.save();
	}

	function findUserById(userId) {
		return User.findById(userId);
	}

	function findUserByUsername(username) {
		return User.findOne({ username: username });
	}

	function findUserByCredentials(username, password) {
		return User.findOne({
			username: username,
			password: password
		});
	}

	function updateUser(userId, user) {
		return User.findByIdAndUpdate(userId, user, { new: true });
	}

	function deleteUser(userId) {
		return User.findByIdAndRemove(userId);
	}

	function addWebsite(userId, websiteId) {
		var change = { $push: { websites: websiteId } }
		return User.findByIdAndUpdate(userId, change, { new: true });
	}
}
