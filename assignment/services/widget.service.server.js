module.exports = function(app, model) {

	var Widget = model.widgetModel;

	var multer  = require('multer');
	var upload = multer({ dest: __dirname + '/../../public/uploads/' });

	app.post('/api/page/:pageId/widget', createWidget);
	app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
	app.put('/api/page/:pageId/widget', updateWidgetOrder);

	app.get('/api/widget/:widgetId', findWidgetById);
	app.put('/api/widget/:widgetId', updateWidget);
	app.delete('/api/widget/:widgetId', deleteWidget);

	app.post("/api/upload", upload.single('myFile'), uploadImage);

	// Get back to this one
    function uploadImage(req, res) {
    	var widgetId = req.body.widgetId;
    	var width = req.body.width;
    	var myFile = req.file;

    	var changes = { 
    		$set: { 
    			width: width,
    			url: "../../uploads/" + myFile.filename
    		}
    	};

    	Widget.updateWidget(widgetId, changes)
    		.then(function(updatedWidget) {
				if(updatedWidget) { res.send(updatedWidget); }
				else { res.send(400).send("Unable to upload image"); }
			}, function(err) {
				handleError(err, res);
			});
    }

	function createWidget(req, res) {
		var pageId = req.params.pageId;
		var widgetType = req.body.widgetType;

		Widget.createWidget(pageId, { widgetType: widgetType })
			.then(function(newWidget) {
				res.send(newWidget);
			}, function(err) {
				res.status(400).send("Unable to create new widget.");
			});
	}

	function findAllWidgetsForPage(req, res) {
		var pageId = req.params.pageId;

		Widget.findAllWidgetsForPage(pageId)
			.then(function(widgets) {
				res.send(widgets)
			}, function(err) {
				res.status(400).send("Unable to create new widget");
			});
	}

	function findWidgetById(req, res) {
		var widgetId = req.params.widgetId;

		Widget.findWidgetById(widgetId)
			.then(function(widget) {
				if(widget) { res.send(widget); }
				else { res.status(400).send("Unable to find widget"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function updateWidget(req, res) {
		var widgetId = req.params.widgetId;
		var widget = req.body;

		Widget.updateWidget(widgetId, widget)
			.then(function(updatedWidget) {
				if(updatedWidget) { res.send(updatedWidget); }
				else { res.send(400).send("Unable to update widget"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	function deleteWidget(req, res) {
		var widgetId = req.params.widgetId;

		Widget.deleteWidget(widgetId)
			.then(function(deletedWidget) {
				if(deletedWidget) { res.send(deletedWidget); }
				else{ res.send(400).send("Unable to delete widget"); }
			}, function(err) {
				handleError(err, res);
			});
	}

	// Who the fuck knows
	function updateWidgetOrder(req, res) {
		var pageId = req.params.pageId;
		var initial = req.query.initial;
		var final = req.query.final;

		var widgetsForPage = widgets.filter(function(widget) {
			return pageId == widget.pageId;
		});

		widgets = widgets.filter(function(widget) {
			return widgetsForPage.indexOf(widget) < 0;
		});

		widgetsForPage.splice(final, 0, widgetsForPage.splice(initial, 1)[0]);
		widgets = widgets.concat(widgetsForPage);

		res.end();
	}

	function getIndexOfWidget(widgetId) {
		return widgets.findIndex(function(widget) {
			return widgetId == widget._id;
		});
	}

	function handleError(err, res) {
		console.log(err);
		res.status(400).send("Something seems to have gone wrong...");
	}
}