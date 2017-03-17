var mongoose = require('mongoose');

module.exports = function() {
    var widgetSchema = require('./widget.schema.server.js')();
    var Widget = mongoose.model('Widget', widgetSchema);

    var WidgetReorderer = require('./widget-reorder.server.js')(Widget);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        updateWidgetImage: updateWidgetImage,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget) {
        return Widget.count({ _page: pageId })
            .then(function(count) {
                var newWidget = new Widget(widget);
                newWidget._page = pageId;
                newWidget.position = count;

                return newWidget.save();
            });
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({ _page: pageId }, null, {sort: 'position'});
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
        return WidgetReorderer.removeWidget(widgetId);
        // return Widget.findByIdAndRemove(widgetId);
    }

    function reorderWidget(pageId, start, end) {
        return WidgetReorderer.reorderWidget(pageId, start, end);
    }
}
