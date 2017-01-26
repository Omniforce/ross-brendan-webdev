(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]
        var api = {
            "createUser"            : createUser,
            "findUserById"          : findUserById,
            "findUserByUsername"    : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser"            : updateUser,
            "deleteUser"            : deleteUser
        };

        return api;

        function createUser(user) {
            user._id = genNewId();
            users.push(user);
            
            return user;
        }
        function findUserById(userId) {
            return users.find(function(user) {
                return userId == user._id;
            });
        }
        function findUserByUsername(username) {
            return users.find(function(user) {
                return username == user.username;
            });
        }
        function findUserByCredentials(username, password) {
            return users.find(function(user) {
                return username == user.username && password == user.password;
            });
        }
        function updateUser(userId, user) {
            var userIndex = getIndexOfUser(userId);

            if (userIndex > -1) {
                users[userIndex] = user;
            }
        }
        function deleteUser(userId) {
            var userIndex = getIndexOfUser(userId);

            if (userIndex > -1) {
                users.splice(userIndex, 1);
            }
        }

        function getIndexOfUser(userId) {
            return users.findIndex(function(u) {
                return userId == u._id;
            });
        }

        function genNewId() {
            var newId = 1;
            while(true) {
                indexOfId = getIndexOfUser(newId);
                if (indexOfId < 0) {
                    return newId;
                }
                newId += 1;
            }
        }
    }
})();