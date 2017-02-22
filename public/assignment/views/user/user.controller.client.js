(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, notifications) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (user) {
                UserService.findUserByCredentials(user.username, user.password)
                    .then(function(response) {
                        var loggedInUser = response.data;
                        if (loggedInUser) {
                            $location.url("/user/" + loggedInUser._id);
                        }
                    }, function(error) {
                        notifications.showError({message: error.data});
                    });
            }
        }
    }

    function RegisterController($location, UserService) {
    	var vm = this;
        vm.register = register;

        function register(user) {
            if (user && user.password == user.verypassword) {
                UserService.createUser(user)
                    .then(function(response) {
                        newUser = response.data;

                        if (newUser) {
                            $location.url("/user/" + newUser._id);
                        }
                    }, function(error) {
                        notifications.showError({message: error.data});
                    });
            }
        }
    }

    function ProfileController($routeParams, $location, UserService, notifications) {
		var vm = this;
		vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .then(function(response) {
                    updatedUser = response.data;

                    if (updatedUser) {
                        notifications.showSuccess({ message: "User information updated" });
                    }
                }, function(error) {
                    notifications.showError({message: error.data});
                });
        }

        function init() {
            UserService.findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                }, function(error) {
                    notifications.showError({message: error.data});
                });
        }
        init();
	}

})();