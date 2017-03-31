var mongoose = require('mongoose');

var userSchema = require('./user.schema.server.js');
var User = mongoose.model('User', userSchema);

var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    findOrCreateUserByFacebookId: findOrCreateUserByFacebookId,
    updateUser: updateUser,
    deleteUser: deleteUser,
};

module.exports = api;

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

function findOrCreateUserByFacebookId(facebookId) {
    return User.findOrCreate({'facebook.id': facebookId});
}

function updateUser(userId, user) {
    return User.findByIdAndUpdate(userId, user, { new: true });
}

function deleteUser(userId) {
    return User.findByIdAndRemove(userId);
}
