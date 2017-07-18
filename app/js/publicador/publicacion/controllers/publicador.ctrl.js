angular.module('myapp.publicador')
.controller('PublicadorCtrl', function($scope, $state, LoginService, RolService, ParseTokenService, MenuService){

  $scope.usuario = ParseTokenService.objetoDelToken();
  $scope.usuario.tipoUsuario = RolService.getRol($scope.usuario);
  $scope.menuItems = MenuService.getMenuItems($scope.usuario.tipoUsuario);
  //console.log($scope.tipoUsuario);
if($scope.usuario.tipoUsuario == 'ADMINISTRADOR'){
  $state.go('admin');

}

	$scope.cambioActivo = function($index) {
    MenuService.cambioActivo($index,$scope.menuItems);
	};

	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

});
