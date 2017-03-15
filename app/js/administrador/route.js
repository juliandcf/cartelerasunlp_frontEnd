angular.module('myapp.administrador')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('administrador', {
		url:'/administrador',
		views:{
			'main':{
				templateUrl: 'js/administrador/views/home.html',
				controller: 'AdministradorCtrl'
			}
		}
	});

	//$urlRouterProvider.otherwise('/cartelera');
}]);
