angular.module('myapp.publicador.admin')
.controller('AdminCtrl', function($scope, $state){


	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

});
