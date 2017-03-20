(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService, NotificationsService) {
        var vm = this
        vm.userId = $routeParams["uid"];

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .then(renderWebsites, function(error) {
                        NotificationsService.showError(error.data);
                    });
        }
        init();

        function renderWebsites(response) {
            vm.websites = response.data;
        }
    }
    function NewWebsiteController($routeParams, $location, WebsiteService, NotificationsService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];

        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website)
                .then(userCreated, handleError);
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .then(renderWebsites, handleError);
        }
        init();

        function userCreated(response) {
            $location.url("/user/" + vm.userId + "/website");
        }
        function renderWebsites(response) {
            vm.websites = response.data;
        }
        function handleError(error) {
            NotificationsService.showError(error.data);
        }
    }
    function EditWebsiteController($routeParams, $location, WebsiteService, NotificationsService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website)
                .then(websiteUpdated, handleError);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(websiteDeleted, handleError);
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .then(renderWebsites, handleError);

            WebsiteService.findWebsiteById(vm.websiteId)
                .then(renderWebsite, handleError);
        }
        init();

        function websiteUpdated(response) {
            $location.url("/user/" + vm.userId + "/website");
        }
        function websiteDeleted(response) {
            $location.url("/user/" + vm.userId + "/website");
        }
        function renderWebsites(response) {
            vm.websites = response.data;
        }
        function renderWebsite(response) {
            vm.website = response.data
        }
        function handleError(error) {
            NotificationsService.showError(error.data);
        }
    }
})();