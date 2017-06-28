'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('RolService', function(ParseTokenService){


  var getRol = function($usuario) {
      var tipoUsuario = null;
      var token = localStorage.getItem('tokenSeguridad');

      //var tipoUsuario = ParseTokenService.parseToken(token);
      //console.log($usuario);
      $usuario.permisosCartelerasVO.some(function(p){
      //  console.log(p.nombre);
        if( p.nombre == 'ADMINISTRADOR'){
          tipoUsuario= "ADMINISTRADOR";
        }
        else if(p.nombre == 'PUBLICADOR'){
          tipoUsuario =  "PUBLICADOR";
        }
        else if(p.nombre == 'INSTITUCIONAL'){
          tipoUsuario =  "INSTITUCIONAL";
        }
        });
        //Si salio del forec y el tipoUsuario es null es porque no encontro ninguno de esos roles. Por lo tanto el tipoUsuario DOCENTE
          if (tipoUsuario == null) {
            tipoUsuario = "DOCENTE";
          }

      return tipoUsuario;
  }

  /*  var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/usuario/publicador/login',
    {
      "usuario": user,
      "contrasena": password
     })
    .success(function(data){
      console.log('El login responde: ');
      console.log(data);
      if(data.codigo == 200){
          localStorage.setItem('tokenSeguridad', data.objeto);
          defer.resolve(data);
      }else{
          defer.reject(data.mensaje);
      }
    })
    .error(defer.reject);

    return defer.promise;
  };*/

  return {
    getRol: getRol
  };
})
