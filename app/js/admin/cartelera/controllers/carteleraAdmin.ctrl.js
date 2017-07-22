angular.module('myapp.admin.cartelera')
.controller('CarteleraAdminCtrl', function($scope, $state, $stateParams, CarteleraService, PermisosCartelerasService, $mdDialog){

  var idCarteleraEliminar = null;
  $scope.mensaje = $stateParams.exito;
//Se trae todas las carteleras para mostrarlas en el listado y las pone en $scope.carteleras
  $scope.cargarCarteleras = function(){
   CarteleraService.getCarteleras()
    .then(function(data){
        $scope.carteleras = data;
    }).
    catch(function(error){
        console.log(error);
    });
  };

  $scope.cargarCarteleras();

  alertBorrarConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
          .title(' Esta seguro que desea eliminar la cartelera?')
          .textContent('Si existen publicaciones y/o comentarios asociadas a esta cartelera se eliminaran')
          .ok('Eliminar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
        CarteleraService.eliminarCartelera(idCarteleraEliminar).then(function(data){
            $scope.cargarCarteleras();
            $scope.mensaje = "La cartelera se borro correctamente";
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

  $scope.eliminarCartelera = function(idCartelera){
      idCarteleraEliminar = idCartelera;
      alertBorrarConfirm();
  }


});
