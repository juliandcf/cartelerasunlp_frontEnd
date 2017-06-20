angular.module('myapp.publicador')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('publicador', {
		url:'/publicador',
		views:{
			'main':{
				templateUrl: 'js/publicador/views/home.html',
				controller: 'PublicadorCtrl'
			}
		}
	});
}]);
