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
            if (user) {
                UserService.findUserByCredentials(user.username, user.password)
                    .then(function(response) {
                        var loggedInUser = response.data;
                        if (loggedInUser) {
                            $location.url("/user/" + loggedInUser._id);
                        }
                    }, error);
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
                    }, error);
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
		var vm = this;
		vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .then(function(response) {
                    updatedUser = response.data;

                    if (updatedUser) {
                        $location.url("/user/" + updatedUser._id);
                    }
                }, error);
        }

        function init() {
            UserService.findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                }, error);
        }
        init();
	}

    function error(response) {
        console.log(response);
    }

})();