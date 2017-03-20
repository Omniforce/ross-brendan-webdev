(function() {
    angular
        .module("WebAppMaker")
        .factory("NotificationsService", NotificationsService);
    
    function NotificationsService(notifications) {

        var api = {
            showSuccess: showSuccess,
            showError: showError,
        };

        return api;

        function showSuccess(message) {
            notifications.showSuccess({ message: message });
        }

        function showError(message) {
            notifications.showError({ message: message });
        }
    }
})();