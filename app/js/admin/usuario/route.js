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
		params:{
			exito:null
		}		
	})
	.state('admin.altaUsuarioAdmin', {
			url:'/usuario/nuevo',
			views:{
				'view_admin':{
					templateUrl: 'js/admin/usuario/views/altaUsuario.html',
					controller: 'AltaUsuarioAdminCtrl'
				}
			}
		})
		.state('admin.modificarUsuarioAdmin', {
			url:'/usuario/modificar',
			views:{
				'view_admin':{
					templateUrl: 'js/admin/usuario/views/modificarUsuarioAdmin.html',
					controller: 'ModificarUsuarioAdminCtrl'
				}
			},
			params:{
				usuarioNuevo: null
			}
		});
        $urlRouterProvider.otherwise('/admin');	
	
}]);
