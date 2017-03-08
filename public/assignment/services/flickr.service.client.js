(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var key = "dd4a02ea0991246bdfa305ccc447331f";
        var secret = "12168ebaa608bf8b"
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=API_KEY&text=TEXT&format=json&nojsoncallback=1";

        var api = {
            "searchPhotos": searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
}());
