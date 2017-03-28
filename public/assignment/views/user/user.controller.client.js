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
            UserService.login(user)
                .then(success, function(error) {
                    console.log(error);
                });
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
            UserService.register(user)
                .then(success, function(error) {
                    console.log(error);
                });
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
