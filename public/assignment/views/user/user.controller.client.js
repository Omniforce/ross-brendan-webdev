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
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }
    function RegisterController($location, UserService) {
    	var vm = this;
        vm.register = register;

        function register(user) {
            var newUser = UserService.createUser(user);
            $location.url("/user/" + newUser._id)
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