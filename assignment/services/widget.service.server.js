module.exports = function(app, model) {

	var Widget = model.widgetModel;
    var Page = model.pageModel;

    var deleteImage = require("../util/deleteImage.js");

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

        Page.findPageByIdWithWidgets(pageId)
            .then(function(page) {
                res.send(page.widgets);
            }, function(err) {
                res.status(500).send("Unable to find widgets");
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
			.then(function(oldWidget) {
				if(!oldWidget) { res.status(500).send("Unable to update widget"); }

                if (widget.url != oldWidget.url) { deleteImage(oldWidget.url); }
				res.send(oldWidget);
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
                        deleteImage(deletedWidget.url);
                        res.send(deletedWidget);
                    });
			}, function(err) {
				handleError(err, res);
			});
	}

    function uploadImage(req, res) {
    	var widgetId = req.body.widgetId;
    	var myFile = req.file;

    	Widget.updateWidgetImage(widgetId, myFile.filename)
    		.then(function(oldWidget) {
				if(!oldWidget) { res.status(500).send("Unable to upload image"); }

                deleteImage(oldWidget.url);
                res.send(oldWidget);
			}, function(err) {
				handleError(err, res);
			});
    }

	function updateWidgetOrder(req, res) {
		var pageId = req.params.pageId;
		var initial = req.query.initial;
		var final = req.query.final;

        Page.reorderWidget(pageId, initial, final)
            .then(function(page) {
                if(!page) { res.status(500).send("Unable to update widget order"); }

                res.end();
            }, function(err) {
                handleError(err, res);
            });
	}

	function handleError(err, res) {
		console.log(err);
		res.status(500).send("Something seems to have gone wrong...");
	}
}
