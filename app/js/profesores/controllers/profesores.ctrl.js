angular.module('myapp.profesores')
.controller('ProfesoresCtrl', function($scope, $state, LoginService){



	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};



});
