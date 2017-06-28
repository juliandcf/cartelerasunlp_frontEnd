'use strict';
angular.module('myapp.publicador')
.factory('RolService', function($scope, ParseTokenService){

  var tipoUsuario = null;
  var getRol = function($usuario) {
    var token = localStorage.getItem('tokenSeguridad');
      tipoUsuario = ParseTokenService.parseToken(token);
      tipoUsuario = null;

   if($usuario.permisosCartelerasVO.some(function(p) p.nombre == 'ADMINISTRADOR')){
    tipoUsuario="ADMINISTRADOR";
   }
    else if($usuario.permisosCartelerasVO.some(function(p) p.nombre == 'PUBLICADOR')){
    tipoUsuario="PUBLICADOR";
   }
    else if($usuario.permisosCartelerasVO.some(function(p) p.nombre == 'INSTITUCIONAL')){
    tipoUsuario="INSTITUCIONAL";
   }else{
    tipoUsuario="DOCENTE";
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
