angular.module('myapp.publicador')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('publicador', {
		url:'/publicador/publicaciones',
		views:{
			'main':{
				templateUrl: 'js/publicador/publicacion/views/publicacion.html',
				controller: 'PublicadorCtrl'
			}
		},
		params:{
			exito: null
		}
	})
	.state('publicador.altaPulicacion', {
		url:'/alta',
		views:{
			'view_public':{
				templateUrl: 'js/publicador/publicacion/views/altaPublicacion.html',
				controller: 'AltaPublicacionCtrl'
			}
		}
	})
	.state('publicador.modificarPublicacion', {
		url:'/modificar',
		views:{
			'view_public':{
				templateUrl: 'js/publicador/publicacion/views/modificarPublicacion.html',
				controller: 'ModificarPublicacionCtrl'
			}
		},
		params:{
			publicacion: null,
			cartelera: null
		}
	});
}]);
