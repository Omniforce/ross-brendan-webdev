(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
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
                .then(function(response) {
                    vm.widgets = response.data;
                }, error);
        }
        init();
    }
    function NewWidgetController($routeParams, $location, WidgetService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.widgetTypes = {
            "header": "HEADER",
            "image": "IMAGE",
            "youtube": "YOUTUBE"
        }

        vm.createWidget = createWidget;
        function createWidget(widgetType) {
            WidgetService.createWidget(vm.pageId, widgetType)
                .then(function(response) {
                    var newWidget = response.data;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                }, error);
        }
    }
    function EditWidgetController($routeParams, $location, WidgetService, notifications) {
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
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, error);
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, error);
        }

        function uploadFile() {
            var file = $('#myFileInput').prop("files")[0];

            if (file) {
                WidgetService.uploadFile(file, vm.widget._id, vm.widget.width)
                    .then(function(response) {
                        vm.widget = response.data;
                        notifications.showSuccess({message: "Image Uploaded"});
                    }, error);
            }
        }

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = response.data;
                }, error);
        }
        init();
    }

    function error(response) {
        console.log(response);
    }

})();