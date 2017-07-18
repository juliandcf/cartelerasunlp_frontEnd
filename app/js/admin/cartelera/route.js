angular.module('myapp.admin.cartelera')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
$stateProvider
.state('admin.carteleraAdmin', {
		url:'/cartelera',
		views:{
			'view_admin':{
				templateUrl: 'js/admin/cartelera/views/cartelera.html',
				controller: 'CarteleraAdminCtrl'
			}
		},
		params:{
			exito: null
		}
	})
	.state('admin.altaCartelera', {
			url:'/cartelera/nueva',
			views:{
				'view_admin':{
					templateUrl: 'js/admin/cartelera/views/altaCartelera.html',
					controller: 'AltaCarteleraCtrl'
				}
			}
		})
		.state('admin.modificarCartelera', {
				url:'/cartelera/modificar',
				views:{
					'view_admin':{
						templateUrl: 'js/admin/cartelera/views/modificarCartelera.html',
						controller: 'ModificarCarteleraCtrl'
					}
				},
				params:{
					cartelera: null
				}
			});
	$urlRouterProvider.otherwise('/admin');
}]);
