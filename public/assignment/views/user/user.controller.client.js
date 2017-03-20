(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, NotificationsService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (user) {
                UserService.findUserByCredentials(user.username, user.password)
                    .then(success, function(error) {
                        NotificationsService.showError(error.data);
                    });
            }
        }

        function success(response) {
            var loggedInUser = response.data;
            if (loggedInUser) {
                $location.url("/user/" + loggedInUser._id);
            }
        }
    }

    function RegisterController($location, UserService, NotificationsService) {
    	var vm = this;
        vm.register = register;

        function register(user) {
            if (user && user.password == user.verypassword) {
                UserService.createUser(user)
                    .then(success, function(error) {
                        NotificationsService.showError(error.data);
                    });
            }
        }

        function success(response) {
            newUser = response.data;
            if (newUser) {
                $location.url("/user/" + newUser._id);
            }
        }
    }

    function ProfileController($routeParams, $location, UserService, NotificationsService) {
		var vm = this;
		vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .then(userUpdated, handleError);
        }

        function init() {
            UserService.findUserById(vm.userId)
                .then(renderProfile, handleError);
        }
        init();

        function userUpdated(response) {
            updatedUser = response.data;
            if (updatedUser) {
                NotificationsService.showSuccess("User information updated");
            }
        }
        function renderProfile(response) {
            vm.user = response.data;
        }
        function handleError(error) {
            NotificationsService.showError(error.data);
        }
	}
})();