'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('RolService', function(ParseTokenService){


  var getRol = function($usuario) {
      var tipoUsuario = null;
      var token = localStorage.getItem('tokenSeguridad');
      if($usuario.legajo){
        tipoUsuario = "ALUMNO";
      }else{
        $usuario.permisosCartelerasVO.some(function(p){
          if( p.nombre == 'ADMINISTRADOR'){
            tipoUsuario= "ADMINISTRADOR";
          }
          else if(p.nombre == 'PUBLICADOR EXTERNO'){
            tipoUsuario =  "PUBLICADOR EXTERNO";
          }
          else if(p.nombre == 'INSTITUCIONAL'){
            tipoUsuario =  "INSTITUCIONAL";
          }
          });
          //Si salio del forec y el tipoUsuario es null es porque no encontro ninguno de esos roles. Por lo tanto el tipoUsuario DOCENTE
            if (tipoUsuario == null) {
              tipoUsuario = "DOCENTE";
            }
      }
      return tipoUsuario;
  }

  return {
    getRol: getRol
  };
})
