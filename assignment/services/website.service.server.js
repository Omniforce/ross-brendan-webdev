module.exports = function(app) {

	app.post('/api/user/:userId/website', createWebsite);
	app.get('/api/user/:userId/website', findAllWebsitesForUser);
	app.get('/api/website/:websiteId', findWebsiteById);
	app.put('/api/website/:websiteId', updateWebsite);
	app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ]

	function createWebsite(req, res) {
		var userId = req.params.userId;
		var website = req.body;

		website._id = new Date().getTime();
		website.developerId = userId;
		websites.push(website);

		res.send(website);
	}

	function findAllWebsitesForUser(req, res) {
		var userId = req.params.userId;

		var websitesForUser = websites.filter(function(website) {
			return userId == website.developerId;
		});

		res.send(websitesForUser);
	}

	function findWebsiteById(req, res) {
		var websiteId = req.params.websiteId;

		var website = websites.find(function(website) {
			return websiteId == website._id;
		});

		res.send(website);
	}

	function updateWebsite(req, res) {
		var websiteId = req.params.websiteId;
		var index = getIndexOfWebsite(websiteId);
		var website = req.body;

		if (index > -1) { websites[index] = website; }
		res.send(website)
	}

	function deleteWebsite(req, res) {
		var websiteId = req.params.websiteId;
		var index = getIndexOfWebsite(websiteId);

		if (index > -1) { websites.splice(index, 1); }
		res.end();
	}

	function getIndexOfWebsite(websiteId) {
		return websites.findIndex(function(website) {
			return websiteId == website._id;
		});
	}
}