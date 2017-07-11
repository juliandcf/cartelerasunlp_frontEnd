angular.module('myapp.admin')
.controller('CarteleraAdminCtrl', function($scope, $state, $stateParams, CarteleraService, PermisosCartelerasService, $timeout){


  //$scope.exito = $stateParams.exito;
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



});
