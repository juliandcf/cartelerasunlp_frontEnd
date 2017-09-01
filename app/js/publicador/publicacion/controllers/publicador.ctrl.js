angular.module('myapp.publicador')
.controller('PublicadorCtrl', function($scope, $state, $stateParams, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, PublicacionService, $mdDialog){

  $scope.mensaje = $stateParams.exito;

  $scope.usuario = ParseTokenService.objetoDelToken();
  $scope.usuario.tipoUsuario = RolService.getRol($scope.usuario);
  $scope.menuItems = MenuService.getMenuItems($scope.usuario.tipoUsuario);
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
		    }).
		    catch(function(error){
		        console.log(error);
		    });
		  };

      CarteleraService.getCartelerasConPermiso($scope.usuario.id)
       .then(function(data){
           $scope.carteleras = data;
       }).
       catch(function(error){
           console.log(error);
       });

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
                $scope.mensaje = "La publicación se borro correctamente";
            }).
            catch(function(error){
                console.log(error);
            });
            ;
        }, function() {
          // $scope.status = 'You decided to keep your debt.';
        });
      };

      $scope.eliminarPublicacion = function(idCartelera, idPublicacion){
          idPublicacionEliminar = idPublicacion;
          //Necesita el id de la cartelera para armar la ruta para eliminar una publicacion
          idCarteleraEliminar = idPublicacion;
          alertBorrarConfirm();
      }

      function DialogController($scope, $mdDialog, cartelera) {

        $scope.cartelera = cartelera;
      };

      $scope.showAdvanced = function(ev, cartelera) {
          $mdDialog.show({
          controller: DialogController,
          templateUrl: 'js/publicador/publicacion/views/alumnosInteresados.tmpl.html',
           locals: {
              cartelera: cartelera
            },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };

      function ModificarUsuarioController($scope, $mdDialog, usuario, UsuarioPublicadorService) {

        UsuarioPublicadorService.getUsuario(usuario.id)
         .then(function(data){
             $scope.usuario = data;
             $scope.usuario.tipoUsuario = usuario.tipoUsuario;
         }).
         catch(function(error){
             console.log(error);
         });


        $scope.cancel = function() {
         $mdDialog.cancel();
       }

       $scope.realizarModificacion = function(){
         $scope.usuario.permisosCarteleras = null;
         $scope.usuario.permisosCartelerasVO = null;
         $scope.usuario.tipoUsuario = null;
         UsuarioPublicadorService.modificarPerfilUsuario($scope.usuario)
          .then(function(data){
              $scope.usuarioModificado = "El usuario fue modificado con exito"
          }).
          catch(function(error){
              console.log(error);
          });

       }
     }


      $scope.modificarDatos = function(ev) {
             $mdDialog.show({
             controller: ModificarUsuarioController,
             templateUrl: 'js/publicador/publicacion/views/modificarUsuario.tmpl.html',
              locals: {
                 usuario: $scope.usuario
               },
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
           })
           .then(function(answer) {
            UsuarioPublicadorService.getUsuario($scope.usuario.id)
             .then(function(data){
                  // Solo actualizo la foto de perfil...
                 $scope.usuario.fotoPerfil = data.fotoPerfil;
             }).
             catch(function(error){
                 console.log(error);
             });
           });
      };


});
