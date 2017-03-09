var mongoose = require('mongoose');

module.exports = function() {
	var websiteSchema = require('./website.schema.server.js')();
	var Website = mongoose.model('Website', websiteSchema);

	var api = {
		createWebsiteForUser: createWebsiteForUser,
		findAllWebsitesForUser: findAllWebsitesForUser,
		findWebsiteById: findWebsiteById,
		updateWebsite: updateWebsite,
		deleteWebsite: deleteWebsite,
	};

	return api;

	function createWebsiteForUser(userId, website) {
		var newWebsite = new Website(website);
		newWebsite._user = userId;

		return newWebsite.save();
	}

	function findAllWebsitesForUser(userId) {
		return Website.find({ _user: userId });
	}

	function findWebsiteById(websiteId) {
		return Website.findById(websiteId);
	}

	function updateWebsite(websiteId, website) {
		return Website.findByIdAndUpdate(websiteId, website, { new: true });
	}

	function deleteWebsite(websiteId) {
		return Website.findByIdAndRemove(websiteId);
	}
}
