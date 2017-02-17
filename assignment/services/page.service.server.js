module.exports = function(app) {

	app.post('/api/website/:websiteId/page', createPage);
	app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
	app.get('/api/page/:pageId', findPageById);
	app.put('/api/page/:pageId', updatePage);
	app.delete('/api/page/:pageId', deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ]

	function createPage(req, res) {
		var websiteId = req.params.websiteId;
		var page = req.body;

		page._id = new Date().getTime();
		page.websiteId = websiteId;
		pages.push(page);

		res.send(page); 
	}

	function findAllPagesForWebsite(req, res) {
		var websiteId = req.params.websiteId;

		var pagesForWebsite = pages.filter(function(page) {
			return websiteId == page.websiteId;
		});

		res.send(pagesForWebsite);
	}

	function findPageById(req, res) {
		var pageId = req.params.pageId;

		var page = pages.find(function(page) {
			return pageId == page._id;
		});

		res.send(page);
	}

	function updatePage(req, res) {
		var pageId = req.params.pageId;
		var index = getIndexOfPage(pageId);
		var page = req.body;

		if (index > -1) { pages[index] = page; }
		
		res.send(page);
	}

	function deletePage(req, res) {
		var pageId = req.params.pageId;
		var index = getIndexOfPage(pageId);

		if (index > -1) { pages.splice(index, 1); }

		res.end();
	}

	function getIndexOfPage(pageId) {
		return pages.findIndex(function(page) {
			return pageId == page._id;
		});
	}
}