angular.module('myapp.alumnos')
.controller('AlumnosCtrl', function($scope, $state, LoginService){



	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};



});
