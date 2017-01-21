(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ]
        var api = {
            "createWebsite"      : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById"    : findWebsiteById,
            "updateWebsite"      : updateWebsite,
            "deleteWebsite"      : deleteWebsite
        };

        return api;

        // THIS PROBABLY NEEDS TO BE UPDATED
        function createWebsite(userId, website) {
            website._id = genNewId();
            website.developerId = userId;
            websites.push(website);
        }
        function findWebsitesByUser(userId) {
            return websites.filter(function(website) {
                return userId == website.developerId;
            });
        }
        function findWebsiteById(websiteId) {
            return websites.find(function(website) {
                return websiteId == website._id;
            });
        }
        function updateWebsite(websiteId, website) {
            var websiteIndex = getIndexOfWebsite(websiteId);

            if (websiteIndex > -1) {
                websites[websiteIndex] = website;
            }
        }
        function deleteWebsite(websiteId) {
            var websiteIndex = getIndexOfWebsite(websiteId);

            if (websiteIndex > -1) {
                websites.splice(websiteIndex, 1);
            }
        }

        function getIndexOfWebsite(websiteId) {
            return websites.findIndex(function(website) {
                return websiteId == website._id;
            });
        }


        function genNewId() {
            var newId = 1;
            while(true) {
                indexOfId = getIndexOfWebsite(newId);
                if (indexOfId < 0) {
                    return newId;
                }
                newId += 1;
            }
        }
    }
})();