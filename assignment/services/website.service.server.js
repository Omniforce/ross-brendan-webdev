module.exports = function(app, model) {

	var Website = model.websiteModel;

	app.post('/api/user/:userId/website', createWebsite);
	app.get('/api/user/:userId/website', findAllWebsitesForUser);
	app.get('/api/website/:websiteId', findWebsiteById);
	app.put('/api/website/:websiteId', updateWebsite);
	app.delete('/api/website/:websiteId', deleteWebsite);

	function createWebsite(req, res) {
		var userId = req.params.userId;
		var website = req.body;

		Website.createWebsiteForUser(userId, website)
			.then(function(newWebsite) {
				res.send(newWebsite);
			}, function(err) {
				res.status(400).send("Unable to create new website");
			});
	}

	function findAllWebsitesForUser(req, res) {
		var userId = req.params.userId;

		Website.findAllWebsitesForUser(userId)
			.then(function(websites) {
				res.send(websites);
			}, function(err) {
				handleError(err, res);
			});
	}

	function findWebsiteById(req, res) {
		var websiteId = req.params.websiteId;

		Website.findWebsiteById(websiteId)
			.then(function(website) {
				if (website) { res.send(website); }
				else { res.status(400).send("Unable to find website"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function updateWebsite(req, res) {
		var websiteId = req.params.websiteId;
		var website = req.body;

		Website.updateWebsite(websiteId, website)
			.then(function(updatedWebsite) {
				if (updatedWebsite) { res.send(updatedWebsite); }
				else { res.status(400).send("Unable to update website"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function deleteWebsite(req, res) {
		var websiteId = req.params.websiteId;

		Website.deleteWebsite(websiteId)
			.then(function(deletedWebsite) {
				if (deletedWebsite) { res.send(deletedWebsite); }
				else { res.status(400).send("Unable to delete website"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function handleError(err, res) {
		console.log(err);
		res.status(400).send("Something seems to have gone wrong...");
	}
}