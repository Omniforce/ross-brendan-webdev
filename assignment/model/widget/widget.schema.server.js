var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
	var widgetSchema = new Schema({
		_page: { type: Schema.Types.ObjectId, ref: 'Page' },
		type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'] },
		name:        String,
		text:        String,
		placeholder: String,
		description: String,
		url:         String,
		width:       String,
		height:      String,
		rows:        Number,
		size:        Number,
		class:       String,
		icon:        String,
		deletable:   Boolean,
		formatted:   Boolean,
		dateCreated: Date
	}, {
		timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
	});

	return widgetSchema;
}