var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
	var websiteSchema = new Schema({
		_user:       { type: Schema.Types.ObjectId, ref: 'User' },
		name:        String,
		description: String,
	}, {
		timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
	});

	return websiteSchema;
}
