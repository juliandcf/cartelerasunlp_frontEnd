angular.module('myapp.publicador')
.controller('AltaPublicacionCtrl', function($scope, $state, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, $mdDialog, PublicacionService){


  $scope.usuario = ParseTokenService.objetoDelToken();
  $scope.usuario.tipoUsuario = RolService.getRol($scope.usuario);
  $scope.cargarCarteleras = function(){
       CarteleraService.getCartelerasConPermiso($scope.usuario.id)
        .then(function(data){
            $scope.carteleras = data;
        }).
        catch(function(error){
            console.log(error);
        });
  };

  function agregarPublicacion() {
    $scope.publicacion.idPublicador = $scope.usuario.id;
    $scope.publicacion.habilitarComentarios = false;
     PublicacionService.agregarPublicacion($scope.carteleraDePublicacion, $scope.publicacion)
     .then(function(data){
       $state.go('publicador',{"exito":'La publicacion se realizo con exito!'});//,{"exito":"La cartelera se ha creado con exito!"});
     }).
     catch(function(error){
       console.log(error);
     });
  };

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    if ($scope.carteleraDePublicacion != undefined){
      console.log($scope.publicacion);
        var confirm = $mdDialog.confirm()
              .title('Desea agregar la publicacion?')
              .ok('Agregar')
              .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
          agregarPublicacion();
        }, function() {
          console.log('Cancela');
          // $scope.status = 'You decided to keep your debt.';
        });
    }
  };


});
