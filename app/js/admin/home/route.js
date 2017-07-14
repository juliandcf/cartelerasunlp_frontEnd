angular.module('myapp.admin')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('admin', {
		url:'/admin',
		views:{
			'main':{
				templateUrl: 'js/admin/home/views/home.html',
				controller: 'AdminCtrl'
			}
		}
	});
	$urlRouterProvider.otherwise('/admin');
}]);
