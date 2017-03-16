angular.module('myapp.login')
.controller('LoginCtrl', function($scope, $state, LoginService, ParseTokenService, ngDialog){

  $scope.loginErrorMessage = '';
  $scope.tiposUsuarios = [
    {nombre:"Alumno",rest:"alumnos"},
    {nombre:"Docente",rest:"profesores"},
    {nombre:"Administrador",rest:"administrador"},
    {nombre:"Publicador Externo",rest:"publicadorExterno"},
    {nombre:"Institucional",rest:"institucional"}
    ];
  $scope.tipoUsuarioSeleccionado = "profesores"; 

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

  $scope.prueba = function(){
    console.log('pero claro que si campeon');
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
    .then(function(data){
        LoginService.existeUsuario($scope.username, $scope.tipoUsuarioSeleccionado)
        .then(function(data){
          var token = localStorage.getItem('tokenSeguridad'); // o data.objeto
          var tokenParseado = ParseTokenService.parseToken(token);
          console.log(tokenParseado);
        })
        .catch(function(mensaje){
          console.log("ir a otro estado o levantar modal para completar datos");
          ngDialog.open({
           templateUrl: 'js/login/views/modalRegistro.html',
           className: 'ngdialog-theme-default',
           scope: $scope 
            });
    
        });
    })
    .catch(function(mensaje){
      $scope.loginErrorMessage = 'El usuario y contraseña no coinciden';
    });
  }
});
