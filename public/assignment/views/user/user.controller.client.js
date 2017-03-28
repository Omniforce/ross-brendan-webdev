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
            UserService.login(user)
                .then(success, function(error) {
                    NotificationsService.showError(error.data);
                });
        }

        function success(response) {
            var user = response.data;
            $location.url("/user/"+user._id);
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
        vm.logout = logout;

        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .then(userUpdated, handleError);
        }
        function logout() {
            UserService.logout()
                .then(function(response) {
                    $location.url('/login')
                }, handleError);
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
