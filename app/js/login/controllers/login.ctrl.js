angular.module('myapp.login')
.controller('LoginCtrl', function($scope, $state, LoginService, ParseTokenService){

  $scope.loginErrorMessage = '';
  $scope.tiposUsuarios = [
    {nombre:"Alumno",rest:"alumnos"},
    {nombre:"Docente",rest:"profesores"},
    {nombre:"Administrador",rest:"administrador"},
    {nombre:"Publicador Externo",rest:"publicadorExterno"},
    {nombre:"Institucional",rest:"institucional"}
    ];
  $scope.tipoUsuarioSeleccionado = "publicadorExterno"; 

  var colors = {
    "administrador": "#9f7e7e",
    "institucional": "#91a58e",
    "publicadorExterno": "#a7a780",
    "profesores":"#95809f",
    "alumnos":"#8cb1b8"
  };

  $scope.colorLogin = { 
      background : $scope.$eval($scope.tipoUsuarioSeleccionado, colors)
  };

  $scope.changeColor = function(){
      $scope.colorLogin = { 
        background : $scope.$eval($scope.tipoUsuarioSeleccionado, colors)
      };
  }



  $scope.login = function(){

    LoginService.login($scope.username, $scope.password, $scope.tipoUsuarioSeleccionado)
    .then(function(){
      $scope.loginErrorMessage = ''; //reset error message
      var token = localStorage.getItem('tokenSeguridad');
      var tokenParseado = ParseTokenService.parseToken(token);
      console.log(tokenParseado);
      $state.go(tokenParseado.rol);
    })
    .catch(function(mensaje){
      if(mensaje == null){
          $scope.loginErrorMessage = 'Hubo un error del servidor, por favor intente de nuevo mas tarde';
       }else{
        $scope.loginErrorMessage = mensaje;
       }   
    });
  }

  $scope.loginApiGuarani = function(){
     LoginService.loginGuarani($scope.username, $scope.password, $scope.tipoUsuarioSeleccionado)
    .then(function(){
      console.log('OK,Me fijo si esta registrado');
    })
    .catch(function(mensaje){
      console.log('Hubo un error.');
    });
  }
});
