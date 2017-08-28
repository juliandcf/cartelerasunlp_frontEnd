angular.module('myapp.alumnos')
.controller('AlumnosCtrl', function($scope, $state, LoginService, ParseTokenService, CarteleraService, $mdDialog, UsuarioAlumnoService){

  $scope.currentPage = 1;
  $scope.usuario = ParseTokenService.objetoDelToken();
	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

  function getUsuarioInteresId(){
        UsuarioAlumnoService.getUsuarioInteresId($scope.usuario.id)
         .then(function(data){
             $scope.CartelerasInteresan = data.cartelerasInteresId;
             cargarInteresesSeleccionados();
         }).
         catch(function(error){
             console.log(error);
         });

   }

   CarteleraService.getCartelerasConPublicaciones()
    .then(function(data){
        $scope.carteleras = data;
        getUsuarioInteresId();
    }).
    catch(function(error){
        console.log(error);
    });



    //$scope.getUsuarioInteresId();

    function cargarInteresesSeleccionados(){
        angular.forEach($scope.carteleras, function(value, key) {
            if ($scope.CartelerasInteresan.includes(value.id)){
               value.interesa = true;
            }else{
              value.interesa = false;
            }
          });
    };


    $scope.verificarInteres = function(idCartelera){
        return (($scope.CartelerasInteresan).includes(idCartelera));
    };

    $scope.registrarInteres = function(idCartelera){
      UsuarioAlumnoService.registrarInteres($scope.usuario.id , idCartelera)
       .then(function(data){
           getUsuarioInteresId();
       }).
       catch(function(error){
           console.log(error);
       });
    };

    $scope.sacarInteres = function(idCartelera){
      UsuarioAlumnoService.sacarInteres($scope.usuario.id , idCartelera)
       .then(function(data){
           getUsuarioInteresId();
       }).
       catch(function(error){
           console.log(error);
       });
    };

    $scope.showAdvanced = function(ev, cartelera) {

        $mdDialog.show({
        controller: DialogController,
        templateUrl: 'js/alumnos/views/alumnosPublicaciones.tmpl.html',
         locals: {
            cartelera: cartelera
          },
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };

    function DialogController($scope, $mdDialog, cartelera) {
      $scope.currentPage = 1;
      $scope.cartelera = cartelera;
      // $scope.setCurrent(1);
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
       $mdDialog.cancel();
     };
    };

        function ModificarUsuarioController($scope, $mdDialog, usuario, UsuarioAlumnoService) {

          UsuarioAlumnoService.getUsuario(usuario.id)
           .then(function(data){
               $scope.usuario = data;
           }).
           catch(function(error){
               console.log(error);
           });
          

          $scope.cancel = function() {
           $mdDialog.cancel();
         };

         $scope.realizarModificacion = function(){
           UsuarioAlumnoService.actualizarUsuario($scope.usuario)
            .then(function(data){
                $scope.usuarioModificado = "El usuario fue modificado con exito"
            }).
            catch(function(error){
                console.log(error);
            });

         }

        };

        $scope.realizarModificacion = function(){
          UsuarioAlumnoService.actualizarUsuario($scope.usuario)
           .then(function(data){
               $scope.usuarioModificado = "El usuario fue modificado con exito"
           }).
           catch(function(error){
               console.log(error);
           });

        }

        $scope.modificarDatos = function(ev) {
               $mdDialog.show({
               controller: ModificarUsuarioController,
               templateUrl: 'js/alumnos/views/modificarUsuario.tmpl.html',
                locals: {
                   usuario: $scope.usuario
                 },
               parent: angular.element(document.body),
               targetEvent: ev,
               clickOutsideToClose:true,
               fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
             })
             .then(function(answer) {
                UsuarioAlumnoService.getUsuario($scope.usuario.id)
                 .then(function(data){
                     $scope.usuario = data;
                 }).
                 catch(function(error){
                     console.log(error);
                 });
             });


        };



})
.controller('PaginadoCtrl', function($scope){
  $scope.pageChangeHandler = function(num) {
  };
})

;
