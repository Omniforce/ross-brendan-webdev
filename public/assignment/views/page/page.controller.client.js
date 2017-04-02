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
                .then(renderPages, function(error) {
                        console.log(error);
                    });
        }
        init();

        function renderPages(response) {
            vm.pages = response.data;
        }
    }
    function NewPageController($routeParams, $location, PageService) {
    	var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        vm.createPage = createPage;
        function createPage(page) {
            if(createValidation(page)) {
                PageService.createPage(vm.websiteId, page)
                    .then(pageCreated, function(error) {
                            console.log(error);
                        });    
            }
        }

        function createValidation(page) {
            vm.nameRequired = false;
            if(!page) {
                vm.nameRequired = true;
            } else if (!page.name) {
                vm.nameRequired = true;
            }
            return !vm.nameRequired;
        }

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId)
                .then(renderPages, handleError);
        }
        init();

        function pageCreated(response) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
        function renderPages(response) {
            vm.pages = response.data;
        }
        function handleError(error) {
            console.log(error);
        }
    }
    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            if(editValidation(page)) {
                PageService.updatePage(vm.pageId, page)
                    .then(pageUpdated, handleError);
            }
        }
        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(pageDeleted, handleError);
        }

        function editValidation(page) {
            vm.nameRequired = false;
            if(!page) {
                vm.nameRequired = true;
            } else if (!page.name) {
                vm.nameRequired = true;
            }
            return !vm.nameRequired;
        }

        function init() {
            PageService.findPagesByWebsiteId(vm.websiteId)
                .then(renderPages, handleError);

            PageService.findPageById(vm.pageId)
                .then(renderPage, handleError);
        }
        init();

        function pageUpdated(response) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
        function pageDeleted(response) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
        function renderPages(response) {
            vm.pages = response.data;
        }
        function renderPage(response) {
            vm.page = response.data;
        }
        function handleError(error) {
            console.log(error);
        }
    }
})();
