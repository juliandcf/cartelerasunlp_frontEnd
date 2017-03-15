angular.module('myapp.administrador')
.controller('AdministradorCtrl', function($scope, $state, LoginService){



	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};



});
