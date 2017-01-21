(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController() {
    	var vm = this;
    }
    function RegisterController() {
    	var vm = this;
    }
    function ProfileController($routeParams, UserService) {
		var vm = this;
		vm.userId = $routeParams["uid"];
		
		function init() {
			vm.user = UserService.findUserById(vm.userId);
		}
		init();
	}

})();