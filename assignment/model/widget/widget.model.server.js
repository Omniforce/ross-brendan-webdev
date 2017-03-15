var mongoose = require('mongoose');

module.exports = function() {
    var widgetSchema = require('./widget.schema.server.js')();
    var Widget = mongoose.model('Widget', widgetSchema);

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
        return Widget.findByIdAndUpdate(widgetId, widget, { new: true });
    }

    function updateWidgetImage(widgetId, filename, width) {
        var changes = {
            $set: {
                width: width,
                url: "../../uploads/" + filename
            }
        };

        return updateWidget(widgetId, changes);
    }

    function deleteWidget(widgetId) {
        return Widget.findByIdAndRemove(widgetId);
    }

    function reorderWidget(pageId, start, end) {
        if (start < end) {
            return moveWidgetDown(pageId, start, end);
        } else {
            return moveWidgetUp(pageId, start, end);
        }
    }

    function moveWidgetDown(pageId, start, end) {
        return Widget.findOne({_page: pageId, position: start})
            .then(function(widget) {
                return Widget.update({_page: pageId, position: {$gte: start, $lte: end}}, {$inc: {position: -1}}, {multi: true})
                    .then(function(results) {
                        return updateWidget(widget._id, {$set: {position: end}});
                    });
            });
    }

    function moveWidgetUp(pageId, start, end) {
        return Widget.findOne({_page: pageId, position: start})
            .then(function(widget) {
                return Widget.update({_page: pageId, position: {$gte: end, $lte: start}}, {$inc: {position: 1}}, {multi: true})
                    .then(function(results) {
                        return updateWidget(widget._id, {$set: {position: end}});
                    });
            });
    }
}
