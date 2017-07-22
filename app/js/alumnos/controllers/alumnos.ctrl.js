angular.module('myapp.alumnos')
.controller('AlumnosCtrl', function($scope, $state, LoginService, ParseTokenService ){

  $scope.usuario = ParseTokenService.objetoDelToken();

	console.log($scope.usuario);
	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

 


});
