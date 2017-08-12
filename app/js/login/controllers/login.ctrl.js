angular.module('myapp.login')
.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, ParseTokenService, RegistroService){

  //$scope.usuario.tipoUsuarioSeleccionado = {rest:"profesores"};
  //explicacion http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html
  $scope.conGuarani = false;
  $scope.loginErrorMessage = '';
  $scope.tiposUsuarios = [
    {
      nombre:"Alumno",
      restApiGuarani:"alumnos",
      restCarteleras:"alumnos"
    },
    {
      nombre:"Docente",
      restApiGuarani:"profesores",
      restCarteleras:"publicador"
    }
  ];

  $scope.usuario = {
    username : null,
    password : null,
    tipoUsuarioSeleccionado :$scope.tiposUsuarios[0]

  };

    // ERROR EXPLICACION THIS VS SCOPE
    // http://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers

  var colors = {
    "profesores":"#95809f",
    "alumnos":"#8cb1b8"
  };

  $scope.colorLogin = {
      background : $scope.$eval($scope.usuario.tipoUsuarioSeleccionado, colors)
  };

  $scope.changeColor = function(){
     console.log($scope.usuario.tipoUsuarioSeleccionado.restCarteleras);
     /* $scope.colorLogin = {
        background : $scope.$eval($scope.usuario.tipoUsuarioSeleccionado, colors)
      };*/
  }

  $scope.prueba = function(){
    console.log('pero claro que si campeon');
  }

  $scope.login = function(){
    $scope.cargando=true;
    if($scope.conGuarani == false){
      LoginService.login($scope.usuario.username, $scope.usuario.password)
      .then(function(){
        $scope.loginErrorMessage = ''; //reset error message

       //Esto es para mostrarlo, sacarlo dsp
        var token = localStorage.getItem('tokenSeguridad');
        var tokenParseado = ParseTokenService.parseToken(token);
        console.log(tokenParseado);
        $scope.cargando=false;
        $state.go('publicador');
      })
      .catch(function(mensaje){
          $rootScope.manejoMensajeError(mensaje);
      });
    }else{
      $scope.loginApiGuarani();
    }
  }

  $rootScope.manejoMensajeError = function(mensaje){
    $scope.cargando=false;
    if(mensaje == null){
        $scope.loginErrorMessage = 'Hubo un error del servidor, por favor intente de nuevo mas tarde';
     }else{
      $scope.loginErrorMessage = mensaje;
     }
  }


  $scope.loginApiGuarani = function(){
     //Se puede mejorar intentando llamar al servicio mandando solo el usuario.
     LoginService.loginGuarani($scope.usuario.username, $scope.usuario.password, $scope.usuario.tipoUsuarioSeleccionado.restApiGuarani)
    .then(function(data){
        nombreTipoUsuario = $scope.usuario.tipoUsuarioSeleccionado.restCarteleras;
        $scope.usuarioGuarani = data;
        LoginService.existeUsuario($scope.usuario.username, nombreTipoUsuario)
        .then(function(data){
          var token = localStorage.getItem('tokenSeguridad'); // o data.objeto
          var tokenParseado = ParseTokenService.parseToken(token);
          $scope.cargando=false;
          $state.go(nombreTipoUsuario);
          console.log(tokenParseado);
        })
        .catch(function(mensaje){
          console.log("ir a otro estado o levantar modal para completar datos");
          registrarUsuarioEnCarteleras($scope.usuario.tipoUsuarioSeleccionado, $scope.usuarioGuarani);
        });

    })
    .catch(function(mensaje){
      $scope.loginErrorMessage = 'El usuario y contraseña no coinciden';
    });
  }

  function registrarUsuarioEnCarteleras(tipoUsuarioSeleccionado, usuarioGuarani){
      console.log(tipoUsuarioSeleccionado);

      if(tipoUsuarioSeleccionado.restCarteleras == "publicador"){
          RegistroService.registrarDocente(usuarioGuarani)
          .then(function(data){
              existeUsuario(usuarioGuarani,$scope.usuario.tipoUsuarioSeleccionado,'publicador');
          })
          .catch(function(mensaje){
                $rootScope.manejoMensajeError(mensaje);
          })
      }else{
          RegistroService.registrarAlumno(usuarioGuarani)
          .then(function(data){
              existeUsuario(usuarioGuarani,$scope.usuario.tipoUsuarioSeleccionado,'alumnos');
          })
          .catch(function(mensaje){
                $rootScope.manejoMensajeError(mensaje);
          })
      }
  }


  function existeUsuario(usuario, tipoUsuarioSeleccionado, nombreEstado){
    //Verifica si existe el docente o alumno en Carteleras y si existe retorna el Token y redirige al estado correspondiente.
    LoginService.existeUsuario(usuario.usuario, nombreEstado)
    .then(function(data){
        var token = localStorage.getItem('tokenSeguridad'); // o data.objeto
        var tokenParseado = ParseTokenService.parseToken(token);
        console.log("deberia pasarlo al estado "+nombreEstado+", el token: "+tokenParseado);
        $scope.cargando=false;
        $state.go(nombreEstado);
    }).catch(function(mensaje){
        $rootScope.manejoMensajeError(mensaje);
    })
  }
});
