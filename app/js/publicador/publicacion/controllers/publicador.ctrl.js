angular.module('myapp.publicador')
.controller('PublicadorCtrl', function($scope, $state, $stateParams, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, PublicacionService, $mdDialog){

  $scope.mensaje = $stateParams.exito;

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

  //no tocar nada hasta aca!!!

	$scope.cargarCarteleras = function(){
		   CarteleraService.getCartelerasConPermiso($scope.usuario.id)
		    .then(function(data){
		        $scope.carteleras = data;
		        console.log(data);
		    }).
		    catch(function(error){
		        console.log(error);
		    });
		  };
		  $scope.cargarCarteleras();

      alertBorrarConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title(' Esta seguro que desea eliminar la publicacion?')
              .textContent('Si confirma la publicacion ya no podra ser accedida por ningun alumno')
              .ok('Eliminar')
              .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            PublicacionService.eliminarPublicacion(idCarteleraEliminar,idPublicacionEliminar).then(function(data){
                $scope.cargarCarteleras();
            }).
            catch(function(error){
                console.log(error);
            });
            ;
        }, function() {
          console.log('Cancela');
          // $scope.status = 'You decided to keep your debt.';
        });
      };

      $scope.eliminarPublicacion = function(idCartelera, idPublicacion){
          idPublicacionEliminar = idPublicacion;
          //Necesita el id de la cartelera para armar la ruta para eliminar una publicacion
          idCarteleraEliminar = idPublicacion;
          alertBorrarConfirm();
      }

});
