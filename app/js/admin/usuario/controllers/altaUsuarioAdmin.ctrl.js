angular.module('myapp.admin.usuario')
.controller('AltaUsuarioAdminCtrl', function($scope, $state, $stateParams, RolService, ParseTokenService, UsuarioPublicadorService, CarteleraService, PermisosCartelerasService, $mdDialog){
	$scope.usuario = ParseTokenService.objetoDelToken(); 
	
	$scope.usuario.tipoUsuario = false;
	
	PermisosCartelerasService.getPermisosSinDocente()
	  .then(function(data){
	      $scope.permisos = data;
	  }).
	
};