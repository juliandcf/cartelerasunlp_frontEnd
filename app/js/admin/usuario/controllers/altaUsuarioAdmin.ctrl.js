angular.module('myapp.admin.usuario')
.controller('AltaUsuarioAdminCtrl', function($scope, $state, $stateParams, RolService, ParseTokenService, UsuarioPublicadorService, CarteleraService, PermisosCartelerasService, $mdDialog){


	PermisosCartelerasService.getPermisosSinDocente()
	  .then(function(data){
	      $scope.permisos = data;
	  }).
   catch(function(error){
    console.log(error);
  });


	function agregarPermisosAUsuario(){
	     var permisosSeleccionados = [];
	     permisosSeleccionados.push($scope.permisoId);
	     $scope.usuarioNuevo.permisosCarteleras = permisosSeleccionados;
	   }

	//Para checkbox y boton desabilitado
	  $scope.permisoSeleccionado = false;

	  $scope.cambio = function(){
	     $scope.permisoSeleccionado = true;
	  }
	// Fin Para checkbox y boton desabilitado
	 function agregarUsuario(){
		    agregarPermisosAUsuario();
		    UsuarioPublicadorService.agregarUsuario($scope.usuarioNuevo)
		     .then(function(data){
		       $state.go('admin.usuarioAdmin',{"exito":'el usuario se ha creado con exito!'});//,{"exito":"La cartelera se ha creado con exito!"});
		     }).
		     catch(function(error){
		       console.log(error);
		      if (error.codigo = 409){
		          alertExisteUsuario();
		      }
		     });
	 }

   alertExisteUsuario = function(ev) {
       $mdDialog.show(
         $mdDialog.alert()
           .parent(angular.element(document.querySelector('#popupContainer')))
           .clickOutsideToClose(true)
           .title('Ya existe un usuario llamado '.concat($scope.usuarioNuevo.usuario))
           .textContent('Por favor cambia el nombre del usuario y vuelve a intentarlo')
           .ariaLabel('Alert Dialog Demo')
           .ok('Reintentar')
           .targetEvent(ev)
       );
     };


     $scope.showConfirm = function(ev) {
  	    // Appending dialog to document.body to cover sidenav in docs app
  	    var confirm = $mdDialog.confirm()
  	          .title('Desea agregar este usuario?')
  	          .ok('Agregar')
  	          .cancel('Cancelar');

  	    $mdDialog.show(confirm).then(function() {
  	      agregarUsuario();
  	    }, function() {
  	      console.log('Cancela');
  	      // $scope.status = 'You decided to keep your debt.';
  	    });
  	  };

});
