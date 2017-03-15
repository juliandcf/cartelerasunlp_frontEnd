angular.module('myapp.publicadorExterno')
.controller('PublicadorExternoCtrl', function($scope, $state, LoginService){



	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};



});
