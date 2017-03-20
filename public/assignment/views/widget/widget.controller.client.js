(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService, NotificationsService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.getEmbedUrl = getEmbedUrl;

        function getEmbedUrl(url) {
            var re = /.*\/(.*=)?(.*)/;
            var videoId = url.match(re)[2];
            var embedUrl = "https://www.youtube.com/embed/" + videoId;

            return $sce.trustAsResourceUrl(embedUrl);
        }

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(renderWidgets, function(error) {
                        NotificationsService.showError(error.data);
                    });
        }
        init();

        function renderWidgets(response) {
            vm.widgets = response.data;
        }
    }
    function NewWidgetController($routeParams, $location, WidgetService, NotificationsService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.widgetTypes = {
            "header": "HEADER",
            "image": "IMAGE",
            "youtube": "YOUTUBE",
            "html": "HTML",
            "text": "TEXT"
        }

        vm.createWidget = createWidget;
        function createWidget(widgetType) {
            WidgetService.createWidget(vm.pageId, widgetType)
                .then(widgetCreated, function(error) {
                        NotificationsService.showError(error.data);
                    });
        }

        function widgetCreated(response) {
            var newWidget = response.data;
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
    function EditWidgetController($routeParams, $location, WidgetService, NotificationsService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uploadFile = uploadFile;

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget)
                .then(widgetUpdated, handleError);
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .then(widgetDeleted, handleError);
        }

        function uploadFile() {
            var file = $('#myFileInput').prop("files")[0];

            if (file) {
                WidgetService.uploadFile(file, vm.widget._id, vm.widget.width)
                    .then(fileUploaded, handleError);
            }
        }

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .then(renderWidget, handleError);
        }
        init();

        function widgetUpdated(response) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        function widgetDeleted(response) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        function fileUploaded(response) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        function renderWidget(response) {
            vm.widget = response.data;
        }
        function handleError(error) {
            NotificationsService.showError(error.data);
        }
    }
})();
