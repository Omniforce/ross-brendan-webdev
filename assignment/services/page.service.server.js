module.exports = function(app, model) {

	var Page = model.pageModel;

	app.post('/api/website/:websiteId/page', createPage);
	app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
	app.get('/api/page/:pageId', findPageById);
	app.put('/api/page/:pageId', updatePage);
	app.delete('/api/page/:pageId', deletePage);

	function createPage(req, res) {
		var websiteId = req.params.websiteId;
		var page = req.body;

		Page.createPage(websiteId, page)
			.then(function(newPage) {
				res.send(newPage);
			}, function(err) {
				res.status(400).send("Unable to create new page");
			});
	}

	function findAllPagesForWebsite(req, res) {
		var websiteId = req.params.websiteId;

		Page.findAllPagesForWebsite(websiteId)
			.then(function(pages) {
				res.send(pages);
			}, function(err) {
				handleError(err, res);
			});
	}

	function findPageById(req, res) {
		var pageId = req.params.pageId;

		Page.findPageById(pageId)
			.then(function(page) {
				if (page) { res.send(page); }
				else { res.status(400).send("Unable to find page"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function updatePage(req, res) {
		var pageId = req.params.pageId;
		var page = req.body;

		Page.updatePage(pageId, page)
			.then(function(updatedPage) {
				if(updatedPage) { res.send(updatedPage); }
				else { res.status(400).send("Unable to update page"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function deletePage(req, res) {
		var pageId = req.params.pageId;

		Page.deletePage(pageId)
			.then(function(deletedPage) {
				if(deletedPage) { res.send(deletedPage); }
				else { res.status(400).send("Unable to delete page"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function handleError(err, res) {
		console.log(err);
		res.status(400).send("Something seems to have gone wrong...");
	}
}