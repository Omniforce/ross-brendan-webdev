(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId)
                .then(function(response) {
                    vm.pages = response.data;
                }, error);
        }
        init();
    }
    function NewPageController($routeParams, $location, PageService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createPage = createPage;
        function createPage(page) {
            PageService.createPage(vm.websiteId, page)
                .then(function(data) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, error);
        }

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId)
                .then(function(response) {
                    vm.pages = response.data;
                }, error);
        }
        init();
    }
    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, error);
        }
        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, error);
        }

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId)
                .then(function(response) {
                    vm.pages = response.data;
                }, error);

            PageService.findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = response.data;
                }, error);
        }
        init();
    }

    function error(response) {
        console.log(response);
    }

})();