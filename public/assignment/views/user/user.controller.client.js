(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(loginValidation(user)) {
                UserService.login(user)
                    .then(success, function(error) {
                        console.log(error);
                    });
            }
        }

        function loginValidation(user) {
            vm.usernameRequired = false;
            vm.passwordRequired = false;

            if(!user) {
                vm.usernameRequired = true;
                vm.passwordRequired = true;
            } else {
                if (!user.username) {
                    vm.usernameRequired = true;
                }
                if (!user.password) {
                    vm.passwordRequired = true;
                }
            }

            return !(vm.usernameRequired || vm.passwordRequired);
        }

        function success(response) {
            var user = response.data;
            $location.url("/user/"+user._id);
        }
    }

    function RegisterController($location, UserService) {
    	var vm = this;
        vm.register = register;

        function register(user) {
            if(registerValidation(user)) {
                UserService.register(user)
                    .then(success, function(error) {
                        console.log(error);
                    });
            }
        }

        function registerValidation(user) {
            vm.usernameRequired = false;
            vm.passwordRequired = false;
            vm.passwordVerifyRequired = false;
            vm.passwordMatchRequired = false;

            if(!user) {
                vm.usernameRequired = true;
                vm.passwordRequired = true;
                vm.passwordVerifyRequired = true;
            } else {
                if(!user.username) {
                    vm.usernameRequired = true;
                }
                if(!user.password) {
                    vm.passwordRequired = true;
                }
                if(!user.verypassword) {
                    vm.passwordVerifyRequired = true;
                }
                if(user.password && user.verypassword && user.password != user.verypassword) {
                    vm.passwordMatchRequired = true;
                }
            }

            console.log(vm.usernameRequired, vm.passwordRequired, vm.passwordVerifyRequired, vm.passwordMatchRequired)

            return !(vm.usernameRequired || vm.passwordRequired || vm.passwordVerifyRequired || vm.passwordMatchRequired)
        }

        function success(response) {
            var user = response.data;
            $location.url("/user/"+user._id);
        }
    }

    function ProfileController($routeParams, $location, UserService) {
		var vm = this;
		vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        vm.logout = logout;

        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .then(function(updateUser) {}, handleError);
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

        function renderProfile(response) {
            vm.user = response.data;
        }
        function handleError(error) {
            console.log(error);
        }
	}
})();
