angular.module('myapp.institucional')
.controller('InstitucionalCtrl', function($scope, $state, LoginService){



	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};



});
