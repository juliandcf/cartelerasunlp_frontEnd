angular.module('myapp.publicador')
.controller('PublicadorCtrl', function($scope, $state, LoginService, ParseTokenService){

  $scope.menuItems = [
            { estado: '#', nombre: "Home", activo: true},
            { estado: '#', nombre: "Carteleras", activo: false },
            { estado: '#', nombre: "Publicaciones" , activo: false }
    ];

/*

  $scope.menuItems = [
            { estado: 'home', nombre: "Home", activo: true},
            { estado: 'carteleras', nombre: "Carteleras", activo: false },
            { estado: 'publicaciones', nombre: "Publicaciones" , activo: false }
    ];
*/
	$scope.cambioActivo = function($index) {
		$scope.menuItems.forEach(function(item) {
  			item.activo = false;  		
		});
		$scope.menuItems[$index].activo = true;
	};
    

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


	 console.log($scope.usuario);
});
