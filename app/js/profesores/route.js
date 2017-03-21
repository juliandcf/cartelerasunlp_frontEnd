angular.module('myapp.profesores')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('profesores', {
		url:'/profesores',
		views:{
			'main':{
				templateUrl: 'js/profesores/views/home.html',
				controller: 'ProfesoresCtrl'
			}
		}
	});
}]);
