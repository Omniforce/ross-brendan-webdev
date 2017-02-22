var mongoose = require('mongoose');

module.exports = function() {
	var widgetSchema = require('./widget.schema.server.js')();
	var Widget = mongoose.model('Widget', widgetSchema);

	var api = {
		createWidget: createWidget,
		findAllWidgetsForPage: findAllWidgetsForPage,
		findWidgetById: findWidgetById,
		updateWidget: updateWidget,
		deleteWidget: deleteWidget
	};

	return api;

	function createWidget(pageId, widget) {
		var newWidget = new Widget(widget);
		newWidget._page = pageId;

		return newWidget.save();
	}

	function findAllWidgetsForPage(pageId) {
		return Widget.find({ _page: pageId });
	}

	function findWidgetById(widgetId) {
		return Widget.findById(widgetId);
	}

	function updateWidget(widgetId, widget) {
		return Widget.findByIdAndUpdate(widgetId, widget);
	}

	function deleteWidget(widgetId) {
		return Widget.findByIdAndRemove(widgetId);
	}

	function reorderWidget(pageId, start, end) {
		// What the fuck am I doing here?
	}
}