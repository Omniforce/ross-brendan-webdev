var mongoose = require('mongoose');

module.exports = function() {
	var pageSchema = require('./page.schema.server.js')();
	var Page = mongoose.model('Page', pageSchema);

	var api = {

	};

	return api;
}