angular.module('myapp.publicador')
.controller('PublicadorCtrl', function($scope, $state, LoginService, RolService, ParseTokenService, MenuService){
//.controller('PublicadorCtrl', function($scope, $state, LoginService, RolService, ParseTokenService, MenuService){


 //$scope.menuItems = MenuService.getMenuItems();
 /*
  $scope.menuItems = [
            { estado: '#', nombre: "Home", activo: true},
            { estado: '#', nombre: "Carteleras", activo: false },
            { estado: '#', nombre: "Publicaciones" , activo: false }
    ];*/
//  var token = localStorage.getItem('tokenSeguridad');
//  $scope.usuario = ParseTokenService.parseToken(token);
  $scope.usuario = ParseTokenService.objetoDelToken();
  var tipoUsuario = RolService.getRol($scope.usuario);
  $scope.menuItems = MenuService.getMenuItems(tipoUsuario);
  console.log(tipoUsuario);
/*

  $scope.menuItems = [
            { estado: 'home', nombre: "Home", activo: true},
            { estado: 'carteleras', nombre: "Carteleras", activo: false },
            { estado: 'publicaciones', nombre: "Publicaciones" , activo: false }
    ];
*/
	$scope.cambioActivo = function($index) {
    MenuService.cambioActivo($index,$scope.menuItems);
    /*
		$scope.menuItems.forEach(function(item) {
  			item.activo = false;
		});
		$scope.menuItems[$index].activo = true;*/
	};



	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

   /*


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
*/


	// console.log($scope.usuario);
});
