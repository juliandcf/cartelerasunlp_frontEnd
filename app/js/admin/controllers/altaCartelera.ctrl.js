angular.module('myapp.admin')
.controller('AltaCarteleraCtrl', function($scope, $state, $mdDialog, CarteleraService, PermisosCartelerasService){

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
        console.log(value.seleccionada);
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
         console.log('Sacar cartel de se agrego correctamente');
     }).
     catch(function(error){
         console.log(error);
     });
     $state.go('admin.carteleraAdmin');
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
