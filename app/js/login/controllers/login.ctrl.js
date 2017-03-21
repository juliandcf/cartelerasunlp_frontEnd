angular.module('myapp.login')
.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, ParseTokenService, RegistroService){

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
        $rootScope.manejoMensajeError(mensaje);   
    });
  }

  $rootScope.manejoMensajeError = function(mensaje){
    if(mensaje == null){
        $scope.loginErrorMessage = 'Hubo un error del servidor, por favor intente de nuevo mas tarde';
     }else{
      $scope.loginErrorMessage = mensaje;
     } 
  }


  $scope.loginApiGuarani = function(){
     LoginService.loginGuarani($scope.username, $scope.password, $scope.tipoUsuarioSeleccionado)
    .then(function(data){
        $scope.usuarioGuarani = data;
        LoginService.existeUsuario($scope.username, $scope.tipoUsuarioSeleccionado)
        .then(function(data){
          var token = localStorage.getItem('tokenSeguridad'); // o data.objeto
          var tokenParseado = ParseTokenService.parseToken(token);
          console.log(tokenParseado);
        })
        .catch(function(mensaje){
          console.log("ir a otro estado o levantar modal para completar datos");
          registrarUsuarioEnCarteleras($scope.tipoUsuarioSeleccionado, $scope.usuarioGuarani);    
        });
    })
    .catch(function(mensaje){
      $scope.loginErrorMessage = 'El usuario y contraseña no coinciden';
    });
  }

  function registrarUsuarioEnCarteleras(tipoUsuarioSeleccionado, usuarioGuarani){
      if(tipoUsuarioSeleccionado == "profesores"){
          RegistroService.registrarDocente(usuarioGuarani)
          .then(function(data){
              existeUsuario(usuarioGuarani,$scope.tipoUsuarioSeleccionado,'profesores');
          })
          .catch(function(mensaje){
                $rootScope.manejoMensajeError(mensaje);               
          })

      }else{
          RegistroService.registrarAlumno(usuarioGuarani)
          .then(function(data){
              existeUsuario(usuarioGuarani,$scope.tipoUsuarioSeleccionado,'alumnos');
          })
          .catch(function(mensaje){
                $rootScope.manejoMensajeError(mensaje);               
          }) 
      }    

  }


  function existeUsuario(usuario, tipoUsuarioSeleccionado, nombreEstado){
    //Verifica si existe el docente o alumno en Carteleras y si existe retorna el Token y redirige al estado correspondiente.
    LoginService.existeUsuario(usuario.usuario, tipoUsuarioSeleccionado)
    .then(function(data){
        var token = localStorage.getItem('tokenSeguridad'); // o data.objeto
        var tokenParseado = ParseTokenService.parseToken(token);
        console.log("deberia pasarlo al estado "+nombreEstado+", el token: "+tokenParseado);
        $state.go(nombreEstado);
    }).catch(function(mensaje){
        $rootScope.manejoMensajeError(mensaje);
    })    
  }
});
