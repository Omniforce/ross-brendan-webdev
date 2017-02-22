var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
	var userSchema = new Schema({
		username:    String,
		password:    String,
		firstName:   String,
		lastName:    String,
		email:       String,
		phone:       String,
		websites:    [{ type: Schema.Types.ObjectId, ref: 'Website' }]
	}, {
		timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
	});

	return userSchema;
}