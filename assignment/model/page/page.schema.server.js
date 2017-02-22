var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Web

module.exports = function() {
	var pageSchema = new Schema({
		_website:    { type: Schema.Types.ObjectId, ref: 'Website' },
		name:        String,
		title:       String,
		description: String,
		widgets:     [{ type: Schema.Types.ObjectId, ref: 'Widget' }],
		dateCreated: Date
	}, {
		timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
	});

	return pageSchema;
}