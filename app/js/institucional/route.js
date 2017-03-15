angular.module('myapp.institucional')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('institucional', {
		url:'/institucional',
		views:{
			'main':{
				templateUrl: 'js/institucional/views/home.html',
				controller: 'InstitucionalCtrl'
			}
		}
	});
}]);
