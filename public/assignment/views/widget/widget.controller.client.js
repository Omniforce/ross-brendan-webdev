(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController() {
    	var vm = this;
        vm.userId = $routeParams["uid"];
    }
    function NewWidgetController() {
    	var vm = this;
        vm.userId = $routeParams["uid"];
    }
    function EditWidgetController($routeParams, WidgetService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            vm.page = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
    }

})();