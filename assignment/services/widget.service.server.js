module.exports = function(app, model) {

	var Page = model.pageModel;
	var Widget = model.widgetModel;

	var multer  = require('multer');
	var upload = multer({ dest: __dirname + '/../../public/uploads/' });

	app.post('/api/page/:pageId/widget', createWidget);
	app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
	app.get('/api/widget/:widgetId', findWidgetById);
	app.put('/api/widget/:widgetId', updateWidget);
	app.delete('/api/widget/:widgetId', deleteWidget);

	app.post("/api/upload", upload.single('myFile'), uploadImage);
	app.put('/api/page/:pageId/widget', updateWidgetOrder);

	function createWidget(req, res) {
		var pageId = req.params.pageId;
		var widgetType = req.body.widgetType;

		Widget.createWidget(pageId, { widgetType: widgetType })
			.then(function(newWidget) {
				Page.addWidget(newWidget._page, newWidget._id)
					.then(function(page) {
						res.send(newWidget);						
					});
			}, function(err) {
				res.status(500).send("Unable to create new widget.");
			});
	}

	function findAllWidgetsForPage(req, res) {
		var pageId = req.params.pageId;

		Widget.findAllWidgetsForPage(pageId)
			.then(function(widgets) {
				res.send(widgets)
			}, function(err) {
				res.status(500).send("Unable to create new widget");
			});
	}

	function findWidgetById(req, res) {
		var widgetId = req.params.widgetId;

		Widget.findWidgetById(widgetId)
			.then(function(widget) {
				if(!widget) { res.status(500).send("Unable to find widget"); }

				res.send(widget); 
			}, function(err) {
				handleError(err, res);
			});
	}

	function updateWidget(req, res) {
		var widgetId = req.params.widgetId;
		var widget = req.body;

		Widget.updateWidget(widgetId, widget)
			.then(function(updatedWidget) {
				if(!updatedWidget) { res.status(500).send("Unable to update widget"); }

				res.send(updatedWidget);
			}, function(err) {
				handleError(err, res);
			});
	}

	function deleteWidget(req, res) {
		var widgetId = req.params.widgetId;

		Widget.deleteWidget(widgetId)
			.then(function(deletedWidget) {
				if(!deletedWidget) { res.status(500).send("Unable to delete widget"); }
				
				Page.deleteWidget(deletedWidget._page, deletedWidget._id)
					.then(function(page) {
						res.send(deletedWidget);
					});
			}, function(err) {
				handleError(err, res);
			});
	}


    function uploadImage(req, res) {
    	var widgetId = req.body.widgetId;
    	var width = req.body.width;
    	var myFile = req.file;

    	Widget.updateWidgetImage(widgetId, myFile.filename, width)
    		.then(function(updatedWidget) {
				if(!updatedWidget) { res.send(500).send("Unable to upload image"); }
				
				res.send(updatedWidget);
			}, function(err) {
				handleError(err, res);
			});
    }

	function updateWidgetOrder(req, res) {
		var pageId = req.params.pageId;
		var initial = req.query.initial;
		var final = req.query.final;

		Widget.reorderWidget(pageId, initial, final)
			.then(function(something) {
				if(something) { res.end(); }
				else { res.status(500).send("Unable to reorder widgets"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function handleError(err, res) {
		console.log(err);
		res.status(500).send("Something seems to have gone wrong...");
	}
}