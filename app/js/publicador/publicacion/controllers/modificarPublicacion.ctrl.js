angular.module('myapp.publicador')
.controller('ModificarPublicacionCtrl', function($scope, $state, $stateParams, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, $mdDialog, PublicacionService){

  $scope.cartelera = $stateParams.cartelera;
  $scope.publicacion = $stateParams.publicacion;

  $scope.usuario = ParseTokenService.objetoDelToken();
  $scope.usuario.tipoUsuario = RolService.getRol($scope.usuario);
  // $scope.cargarCarteleras = function(){
  //      CarteleraService.getCartelerasConPermiso($scope.usuario.id)
  //       .then(function(data){
  //           $scope.carteleras = data;
  //       }).
  //       catch(function(error){
  //           console.log(error);
  //       });
  // };

  function modificarPublicacion() {
    $scope.publicacion.idPublicador = $scope.usuario.id;
    $scope.publicacion.habilitarComentarios = false;
     PublicacionService.modificarPublicacion($scope.cartelera.id, $scope.publicacion)
     .then(function(data){
       $state.go('publicador',{"exito":'La publicacion se modifico con exito!'});//,{"exito":"La cartelera se ha creado con exito!"});
     }).
     catch(function(error){
       console.log(error);
     });
  };

  $scope.showConfirmModificar = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Desea modificar la publicacion?')
              .ok('Agregar')
              .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
          modificarPublicacion();
        }, function() {
          console.log('Cancela');
        });
  };


});
