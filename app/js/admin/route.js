angular.module('myapp.publicador.admin')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('admin', {
		url:'/admin',
		views:{
			'view_publi':{
				templateUrl: 'js/admin/views/home.html',
				controller: 'AdminCtrl'
			}
		}
	});
}]);
