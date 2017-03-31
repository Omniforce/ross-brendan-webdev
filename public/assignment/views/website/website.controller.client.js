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
                .then(renderWebsites, function(error) {
                        console.log(error);
                    });
        }
        init();

        function renderWebsites(response) {
            vm.websites = response.data;
        }
    }
    function NewWebsiteController($routeParams, $location, WebsiteService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];

        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            if(createValidation(website)) {
                WebsiteService.createWebsite(vm.userId, website)
                    .then(userCreated, handleError);
            }
        }

        function createValidation(website) {
            vm.nameRequired = false;
            if(!website) {
                vm.nameRequired = true;
            } else if (!website.name) {
                vm.nameRequired = true;
            }
            return !vm.nameRequired;
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
            console.log(error);
        }
    }
    function EditWebsiteController($routeParams, $location, WebsiteService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            if(editValidation(website)) {
                WebsiteService.updateWebsite(vm.websiteId, website)
                    .then(websiteUpdated, handleError);    
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(websiteDeleted, handleError);
        }

        function editValidation(website) {
            vm.nameRequired = false;
            if(!website) {
                vm.nameRequired = true;
            } else if (!website.name) {
                vm.nameRequired = true;
            }
            return !vm.nameRequired;
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
            console.log(error);
        }
    }
})();
