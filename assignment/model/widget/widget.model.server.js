var mongoose = require('mongoose');

module.exports = function() {
	var widgetSchema = require('./widget.schema.server.js')();
	var Widget = mongoose.model('Widget', widgetSchema);

	var api = {

	};

	return api;
}