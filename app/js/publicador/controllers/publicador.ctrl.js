angular.module('myapp.publicador')
.controller('PublicadorCtrl', function($scope, $state, LoginService, ParseTokenService){

	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

	

	 var token = localStorage.getItem('tokenSeguridad');
     $scope.usuario = ParseTokenService.parseToken(token);
     $scope.tipoUsuario = null;

	 if($scope.usuario.permisosCartelerasVO.some(function(p) p.nombre == 'ADMINISTRADOR')){
	 	$scope.usuario.tipoUsuario="ADMINISTRADOR";
	 }
	 	else if($scope.usuario.permisosCartelerasVO.some(function(p) p.nombre == 'PUBLICADOR')){
	 	$scope.usuario.tipoUsuario="PUBLICADOR";
	 }
	 	else if($scope.usuario.permisosCartelerasVO.some(function(p) p.nombre == 'INSTITUCIONAL')){
	 	$scope.usuario.tipoUsuario="INSTITUCIONAL";
	 }else{
	 	$scope.usuario.tipoUsuario="DOCENTE";
	 }



     $scope.isAdmin = $scope.usuario.permisosCartelerasVO.some(function(p) p.nombre == 'ADMINISTRADOR');
     console.log($scope.isAdmin);
});
