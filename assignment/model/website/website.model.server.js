var mongoose = require('mongoose');

module.exports = function() {
	var websiteSchema = require('./website.schema.server.js')();
	var Website = mongoose.model('Website', websiteSchema);

	var api = {

	};

	return api;
}