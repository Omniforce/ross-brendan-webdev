module.exports = function(app) {
	var multer  = require('multer');
	var upload = multer({ dest: __dirname + '/../../public/uploads/' });

	app.post('/api/page/:pageId/widget', createWidget);
	app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
	app.put('/api/page/:pageId/widget', updateWidgetOrder);

	app.get('/api/widget/:widgetId', findWidgetById);
	app.put('/api/widget/:widgetId', updateWidget);
	app.delete('/api/widget/:widgetId', deleteWidget);

	app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    ]

    function uploadImage(req, res) {
    	var widgetId = req.body.widgetId;
    	var width = req.body.width;
    	var myFile = req.file;

    	var index = getIndexOfWidget(widgetId);
    	var widget = widgets[index];
    	widget.url = "../../uploads/" + myFile.filename
    	widgets[index] = widget;

		res.send(widget);
    }

	function createWidget(req, res) {
		var pageId = req.params.pageId;
		var widgetType = req.body.widgetType;

		widget = {};
		widget._id = new Date().getTime();
		widget.pageId = pageId;
		widget.widgetType = widgetType;
		widgets.push(widget);

		res.send(widget);
	}

	function findAllWidgetsForPage(req, res) {
		var pageId = req.params.pageId;

		var widgetsForPage = widgets.filter(function(widget) {
			return pageId == widget.pageId;
		});

		res.send(widgetsForPage);
	}

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

	function findWidgetById(req, res) {
		var widgetId = req.params.widgetId;

		var widget = widgets.find(function(widget) {
			return widgetId == widget._id;
		});

		res.send(widget);
	}

	function updateWidget(req, res) {
		var widgetId = req.params.widgetId;
		var index = getIndexOfWidget(widgetId);
		var widget = req.body;

		if (index > -1) { widgets[index] = widget; }

		res.send(widget);
	}

	function deleteWidget(req, res) {
		var widgetId = req.params.widgetId;
		var index = getIndexOfWidget(widgetId);

		if (index > -1) { widgets.splice(index, 1); }

		res.end();
	}

	function getIndexOfWidget(widgetId) {
		return widgets.findIndex(function(widget) {
			return widgetId == widget._id;
		});
	}

}