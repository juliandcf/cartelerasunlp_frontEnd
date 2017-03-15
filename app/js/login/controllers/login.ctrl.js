angular.module('myapp.login')
.controller('LoginCtrl', function($scope, $state, LoginService, ParseTokenService){


  $scope.loginErrorMessage = '';
  $scope.tiposUsuarios = [
    {nombre:"Alumno",rest:"alumno"},
    {nombre:"Docente",rest:"docente"},
    {nombre:"Administrador",rest:"administrador"},
    {nombre:"Publicador Externo",rest:"publicadorExterno"},
    {nombre:"Institucional",rest:"institucional"}
    ];
  $scope.tipoUsuarioSeleccionado = null; 
  



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
});
