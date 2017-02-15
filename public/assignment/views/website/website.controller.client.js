(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this
        vm.userId = $routeParams["uid"];

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .then(function(response) {
                    vm.websites = response.data;
                });
        }
        init();
    }
    function NewWebsiteController($routeParams, $location, WebsiteService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];

        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website)
                .then(function(response) {
                    $location.url("/user/" + response.data.developerId + "/website");
                });
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .then(function(response) {
                    vm.websites = response.data;
                });
        }
        init();
    }
    function EditWebsiteController($routeParams, $location, WebsiteService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website)
                .then(function(response) {
                    $location.url("/user/" + response.data.developerId + "/website");
                });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website");
                });
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
                .then(function(response) {
                    vm.websites = response.data;
                });

            WebsiteService.findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = response.data
                });
        }
        init();
    }

})();