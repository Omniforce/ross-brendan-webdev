(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ]
        var api = {
            "createWidget"       : createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById"     : findWidgetById,
            "updateWidget"       : updateWidget,
            "deleteWidget"       : deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            widget._id = genNewId();
            widget.pageId = pageId;
            widgets.push(widget);
        }
        function findWidgetsByPageId(pageId) {
            return widgets.filter(function(widget) {
                return pageId == widget.pageId;
            });
        }
        function findWidgetById(widgetId) {
            return widgets.find(function(widget) {
                return widgetId == widget._id;
            });
        }
        function updateWidget(widgetId, widget) {
            var widgetIndex = getIndexOfWidget(widgetId);

            if (widgetIndex > -1) {
                widgets[widgetIndex] = widget;
            }
        }
        function deleteWidget(widgetId) {
            var widgetIndex = getIndexOfWidget(widgetId);

            if (widgetIndex > -1) {
                widgets.splice(widgetIndex, 1);
            }
        }

        function getIndexOfWidget(widgetId) {
            return widgets.findIndex(function(widget) {
                return widgetId == widget._id;
            });
        }

        function genNewId() {
            var newId = 1;
            while(true) {
                indexOfId = getIndexOfWidget(newId);
                if (indexOfId < 0) {
                    return newId;
                }
                newId += 1;
            }
        }
    }
})();