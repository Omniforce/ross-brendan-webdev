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
            verifyLoginInfo(user, function(user) {
                user = UserService.findUserByCredentials(user.username, user.password);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alertMessage = "Unable to find that username/password combination";
                }
            });
        }

        function verifyLoginInfo(user, cb) {
            if (user && user.username && user.password) {
                cb(user)
            } else {
                vm.alertMessage = "You must supply a username and password"
            }
        }
    }

    function RegisterController($location, UserService) {
    	var vm = this;
        vm.register = register;

        function register(user) {
            verifyRegistrationInfo(user, function(user) {
                var newUser = UserService.createUser(user);
                $location.url("/user/" + newUser._id)
            });
        }

        function verifyRegistrationInfo(user, cb) {
            if (user && user.username && user.password && user.verypassword) {
                if (user.password == user.verypassword) {
                    cb(user);
                } else {
                    vm.alertMessage = "Passwords do not match!"
                }
            } else {
                vm.alertMessage = "All fields are required!"
            }
        }
    }
    function ProfileController($routeParams, UserService) {
		var vm = this;
		vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService.updateUser(vm.userId, user);
        }

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
	}

})();