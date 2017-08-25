angular.module('myapp.admin.cartelera')
.controller('ModificarCarteleraCtrl', function($scope, $state, $stateParams, $mdDialog, CarteleraService, PermisosCartelerasService){

  $scope.permisoSeleccionado = true;
  $scope.cartelera = $stateParams.cartelera;

  function cargarPermisosYaSeleccionados(){
      //Marcar como seleccionados los permisos que tiene la cartelera que se va a modificar
      angular.forEach($scope.permisos, function(value, key) {
        //NO FUNCIONA ESTO AUN
          if ($scope.cartelera.permisosCarteleras.includes(value.id)){
            console.log(value);
             value.seleccionada = true;
          }
        });
  }

  $scope.cambio = function(){
    var existe = $scope.permisos.some(function(p){
     return p.seleccionada == true;
     });
     $scope.permisoSeleccionado = existe;
  }
// Fin Para checkbox y boton desabilitado

  PermisosCartelerasService.getPermisos()
  .then(function(data){
      data.shift();
      $scope.permisos = data;
      cargarPermisosYaSeleccionados();
  }).
  catch(function(error){
      console.log(error);
  });



  //console.log($scope.cartelera.permisosCarteleras);
  //this.cargarPermisosYaSeleccionados();

   function agregarPermisosACartelera(){
     var permisosSeleccionados = [];
     angular.forEach($scope.permisos, function(value, key) {
         if (value.seleccionada == true){
            permisosSeleccionados.push(value.id);
         }
       });
    $scope.cartelera.permisosCarteleras = permisosSeleccionados;
   }

   alertExisteCartelera = function(ev) {
     $mdDialog.show(
       $mdDialog.alert()
         .parent(angular.element(document.querySelector('#popupContainer')))
         .clickOutsideToClose(true)
         .title('Ya existe una cartelera llamada '.concat($scope.cartelera.nombre))
         .textContent('Por favor cambia el nombre de la cartelera y vuelve a intentarlo')
         .ariaLabel('Alert Dialog Demo')
         .ok('Reintentar')
         .targetEvent(ev)
     );
   };

  function modificarCartelera(){
    agregarPermisosACartelera();
     CarteleraService.modificarCartelera($scope.cartelera)
     .then(function(data){
       $state.go('admin.carteleraAdmin',{"exito":'La cartelera se modifico con exito!'});//,{"exito":"La cartelera se ha creado con exito!"});
     }).
     catch(function(error){
       console.log(error);
      if (error.codigo = 409){
          alertExisteCartelera();
      }
     });
  }

  $scope.showConfirModificar = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Desea modificar la cartelera?')
          .ok('Modificar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
      modificarCartelera();
    }, function() {
      console.log('Cancela');
      // $scope.status = 'You decided to keep your debt.';
    });
  };




});
