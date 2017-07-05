angular.module('myapp.admin')
.controller('CarteleraAdminCtrl', function($scope, $state, LoginService){

  console.log('Cartelera admin controller');
	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};
});
