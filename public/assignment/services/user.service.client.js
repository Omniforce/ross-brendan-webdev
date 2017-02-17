(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {

        var api = {
            "createUser"            : createUser,
            "findUserByUsername"    : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "findUserById"          : findUserById,
            "updateUser"            : updateUser,
            "deleteUser"            : deleteUser
        };

        return api;

        function createUser(user) {
            return $http.post('/api/user', user);
        }
        function findUserByUsername(username) {
            return $http.get('/api/user?username=' + username);
        }
        function findUserByCredentials(username, password) {
            return $http.get('/api/user?username=' + username + '&password=' + password);
        }
        function findUserById(userId) {
            return $http.get('/api/user/' + userId);
        }
        function updateUser(userId, user) {
            return $http.put('/api/user/' + userId, user);
        }
        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId);
        }
    }
})();