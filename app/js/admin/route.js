angular.module('myapp.admin')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('admin', {
		url:'/admin',
		views:{
			'main':{
				templateUrl: 'js/admin/views/home.html',
				controller: 'AdminCtrl'
			}
		}
	})
.state('admin.carteleraAdmin', {
		url:'/cartelera',
		views:{
			'view_admin':{
				templateUrl: 'js/admin/views/cartelera.html',
				controller: 'CarteleraAdminCtrl'
			}
		}
	})

}]);
