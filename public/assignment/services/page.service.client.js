(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    
    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]
        var api = {
            "createPage"          : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById"        : findPageById,
            "updatePage"          : updatePage,
            "deletePage"          : deletePage
        };

        return api;

        // THIS PROBABLY NEEDS TO BE UPDATED
        function createPage(websiteId, page) {
            pages.push(page);
        }
        function findPageByWebsiteId(websiteId) {
            return pages.find(function(page) {
                return websiteId == page.websiteId;
            });
        }
        function findPageById(pageId) {
            return pages.find(function(page) {
                return pageId == page._id;
            });
        }
        function updatePage(pageId, page) {
            var pageIndex = getIndexOfPage(pageId);

            if (pageIndex > -1) {
                pages[pageIndex] = page;
            }
        }
        function deletePage(pageId) {
            var pageIndex = getIndexOfPage(pageId);

            if (pageIndex > -1) {
                pages.splice(pageIndex, 1);
            }
        }

        function getIndexOfPage(pageId) {
            return pages.findIndex(function(page) {
                return pageId == page._id;
            });
        }
    }
})();