(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService($http) {

        var api = {
            "createWidget"       : createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById"     : findWidgetById,
            "updateWidget"       : updateWidget,
            "deleteWidget"       : deleteWidget,
            "updateWidgetOrder"  : updateWidgetOrder,
            "uploadFile"         : uploadFile
        };

        return api;

        function createWidget(pageId, widgetType) {
            return $http.post('/api/page/' + pageId + "/widget", { "widgetType": widgetType});
        }
        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/' + pageId + '/widget');
        }
        function findWidgetById(widgetId) {
            return $http.get('/api/widget/' + widgetId);
        }
        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/' + widgetId, widget);
        }
        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/' + widgetId);
        }
        function updateWidgetOrder(pageId, initial, final) {
            return $http.put('/api/page/' + pageId + '/widget?initial=' + initial + '&final=' + final);
        }
        function uploadFile(myFile, widgetId, width) {
            fd = new FormData();
            fd.append('myFile', myFile);
            fd.append('widgetId', widgetId);
            fd.append('width', width);

            return $http.post('/api/upload', fd,
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
    }
})();