angular.module('myapp.admin.cartelera')
.controller('AltaCarteleraCtrl', function($scope, $state, $stateParams, $mdDialog, CarteleraService, PermisosCartelerasService){

//Para checkbox y boton desabilitado
  $scope.permisoSeleccionado = false;

  $scope.cambio = function(){
    var existe = $scope.permisos.some(function(p){
     return p.seleccionada == true;
     });
     $scope.permisoSeleccionado = existe;
  }
// Fin Para checkbox y boton desabilitado

  PermisosCartelerasService.getPermisos()
  .then(function(data){
      $scope.permisos = data;
  }).
  catch(function(error){
      console.log(error);
  });

   function agregarPermisosACartelera(){
     var permisosSeleccionados = [];
     angular.forEach($scope.permisos, function(value, key) {
         if (value.seleccionada == true){
            permisosSeleccionados.push(value.id);
         }
       });
    $scope.cartelera.permisosCarteleras = permisosSeleccionados;
   }

  function agregarCartelera(){
    agregarPermisosACartelera();
     CarteleraService.agregarCartelera($scope.cartelera)
     .then(function(data){
       $state.go('admin.carteleraAdmin',{"exito":'La cartelera se ha creado con exito!'});//,{"exito":"La cartelera se ha creado con exito!"});
     }).
     catch(function(error){
         console.log(error);
     });

     //Falta recargar, en internet vi algo asi pero no funcionó, me redirigia a 'admin'
     //$state.go('admin.carteleraAdmin', {}, { reload: true });
  }

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Desea agregar la cartelera?')
          .ok('Agregar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
      agregarCartelera();
    }, function() {
      console.log('Cancela');
      // $scope.status = 'You decided to keep your debt.';
    });
  };


});
