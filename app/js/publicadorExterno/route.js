angular.module('myapp.publicadorExterno')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('publicadorExterno', {
		url:'/publicadorExterno',
		views:{
			'main':{
				templateUrl: 'js/publicadorExterno/views/home.html',
				controller: 'PublicadorExternoCtrl'
			}
		}
	});
}]);
