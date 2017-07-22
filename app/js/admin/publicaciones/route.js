angular.module('myapp.admin.publicacion')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
$stateProvider
.state('admin.publicacion', {
		url:'/publicaciones',
		views:{
			'view_admin':{
				templateUrl: 'js/admin/publicaciones/views/publicaciones.html',
				controller: 'PublicacionAdminCtrl'
			}
		},
		params:{
			exito:null
		}		
	});
	
    $urlRouterProvider.otherwise('/admin');	

}]);