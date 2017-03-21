angular.module('myapp.alumnos')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('alumnos', {
		url:'/alumnos',
		views:{
			'main':{
				templateUrl: 'js/alumnos/views/home.html',
				controller: 'AlumnosCtrl'
			}
		}
	});
}]);
