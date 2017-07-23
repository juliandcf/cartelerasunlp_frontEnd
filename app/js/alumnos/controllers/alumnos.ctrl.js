angular.module('myapp.alumnos')
.controller('AlumnosCtrl', function($scope, $state, LoginService, ParseTokenService, CarteleraService, $mdDialog ){

   $scope.currentPage = 1;
  $scope.usuario = ParseTokenService.objetoDelToken();

	console.log($scope.usuario);
	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

   CarteleraService.getCartelerasConPublicaciones()
    .then(function(data){
        $scope.carteleras = data;
        console.log(data);
    }).
    catch(function(error){
        console.log(error);
    });


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



})
.controller('PaginadoCtrl', function($scope){
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
})

;
