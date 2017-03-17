module.exports = function(Widget) {

    var api = {
        reorderWidget: reorderWidget,
        removeWidget: removeWidget
    };

    return api;

    function reorderWidget(pageId, start, end) {
        if (start < end) {
            return moveWidgetDown(pageId, start, end);
        } else {
            return moveWidgetUp(pageId, start, end);
        }
    }

    function moveWidgetDown(pageId, start, end) {
        return findWidgetByPosition(pageId, start)
            .then(function(widget) {
                return shiftWidgets(pageId, start, end, -1)
                    .then(function(results) {
                        return moveWidgetToPosition(widget._id, end);
                    });
            });
    }

    function moveWidgetUp(pageId, start, end) {
        return findWidgetByPosition(pageId, start)
            .then(function(widget) {
                return shiftWidgets(pageId, end, start, 1)
                    .then(function(results) {
                        return moveWidgetToPosition(widget._id, end)
                    });
            });
    }

    function findWidgetByPosition(pageId, position) {
        return Widget.findOne({_page: pageId, position: position});
    }

    function shiftWidgets(pageId, start, end, delta) {
        return Widget.update({_page: pageId, position: {$gte: start, $lte: end}}, {$inc: {position: delta}}, {multi: true});
    }

    function moveWidgetToPosition(widgetId, position) {
        return Widget.findByIdAndUpdate(widgetId, {$set: {position: position}});
    }

    // What am I doing? Someone help. This needs be changed.
    function removeWidget(widgetId) {
        return Widget.findById(widgetId)
            .then(function(widget) {
                return Widget.count({_page: widget._page})
                    .then(function(count) {
                        return shiftWidgets(widget._page, widget.position, count-1, -1)
                            .then(function(results) {
                                return Widget.findByIdAndRemove(widgetId);
                            });
                    });
            });
    }
}
