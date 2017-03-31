var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var findOrCreate = require('findorcreate-promise');

var userSchema = new Schema({
    username:    String,
    password:    String,
    firstName:   String,
    lastName:    String,
    email:       String,
    phone:       String,
    facebook: {
        id:    String,
        token: String
    }
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
});

userSchema.plugin(findOrCreate);

module.exports = userSchema;
