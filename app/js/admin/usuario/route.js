angular.module('myapp.admin.usuario')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
$stateProvider
.state('admin.usuarioAdmin', {
		url:'/usuarios',
		views:{
			'view_admin':{
				templateUrl: 'js/admin/usuario/views/usuario.html',
				controller: 'ABMUsuarioAdminCtrl'
			}
		},
		
	})
	
}]);
