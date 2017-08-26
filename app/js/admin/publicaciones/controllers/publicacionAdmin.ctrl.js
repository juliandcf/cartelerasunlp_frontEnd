angular.module('myapp.admin.publicacion')
.controller('PublicacionAdminCtrl', function($scope, $state, $stateParams, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, PublicacionService, $mdDialog){

	  $scope.mensaje = $stateParams.exito;
	$scope.cargarCarteleras = function(){
		   CarteleraService.getCartelerasConPublicaciones()
		    .then(function(data){
		        $scope.carteleras = data;
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
