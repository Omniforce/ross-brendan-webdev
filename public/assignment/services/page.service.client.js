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
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById"        : findPageById,
            "updatePage"          : updatePage,
            "deletePage"          : deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page._id = genNewId();
            page.websiteId = websiteId;
            pages.push(page);
        }
        function findPagesByWebsiteId(websiteId) {
            return pages.filter(function(page) {
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

        function genNewId() {
            var newId = 1;
            while(true) {
                indexOfId = getIndexOfPage(newId);
                if (indexOfId < 0) {
                    return newId;
                }
                newId += 1;
            }
        }
    }
})();