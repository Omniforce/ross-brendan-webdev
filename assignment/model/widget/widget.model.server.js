var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server.js');
var Widget = mongoose.model('Widget', widgetSchema);

var api = {
    createWidget: createWidget,
    findAllWidgetsForPage: findAllWidgetsForPage,
    findWidgetById: findWidgetById,
    updateWidget: updateWidget,
    updateWidgetImage: updateWidgetImage,
    deleteWidget: deleteWidget,
};

module.exports = api;

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

function updateWidgetImage(widgetId, filename) {
    return updateWidget(widgetId, {$set: {url: "../../uploads/" + filename}});
}

function deleteWidget(widgetId) {
    return Widget.findByIdAndRemove(widgetId);
}
