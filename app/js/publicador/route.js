angular.module('myapp.publicador')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('publicador', {
		url:'/publicador/publicaciones',
		views:{
			'main':{
				templateUrl: 'js/publicador/publicacion/views/publicacion.html',
				controller: 'PublicadorCtrl'
			}
		}
	});
}]);
