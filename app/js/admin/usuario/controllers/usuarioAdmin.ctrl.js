angular.module('myapp.admin.usuario')
.controller('ABMUsuarioAdminCtrl', function($scope, $state, $stateParams, RolService, ParseTokenService, UsuarioPublicadorService, CarteleraService, PermisosCartelerasService, $mdDialog){
	$scope.usuario = ParseTokenService.objetoDelToken(); 
	
	 $scope.mensaje = $stateParams.exito;
	 console.log($scope.mensaje);
////Se trae todas las carteleras para mostrarlas en el listado y las pone en $scope.carteleras
  $scope.cargarUsuarios = function(){
   UsuarioPublicadorService.getUsuarios($scope.usuario.id)
    .then(function(data){
        $scope.usuarios = data;
        
        angular.forEach($scope.usuarios, function(value, key) {
            //NO FUNCIONA ESTO AUN
        	 
        	 value.tipoUsuario = RolService.getRol(value);
        	 
        });
        
        
        
        
    }).
    catch(function(error){
        console.log(error);
    });
  };

  $scope.cargarUsuarios();

  alertBorrarConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title(' Esta seguro que desea eliminar este usuario?')
          .textContent('Si existen publicaciones y/o comentarios asociados al mismo se eliminaran')
          .ok('Eliminar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
    	UsuarioPublicadorService.eliminarUsuario(idUsuarioEliminar).then(function(data){
            $scope.cargarUsuarios();
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

  $scope.eliminarUsuario = function(idUsuario){
      idUsuarioEliminar = idUsuario;
      alertBorrarConfirm();
  }


});
