'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('UsuarioPublicadorService', function(ENV, $http, $q){

       
		var getUsuarios = function(id) {
		var defer = $q.defer(); 
		$http.get(ENV.endpoint.url +'/usuario/publicador/admin/'+id+'/usuariosPublicadores')
		.success(function(data) {	
			if (data.codigo == 200) {
				/* Retorno la coleccion de carteleras */
				defer.resolve(data.objeto);
			} else {
				defer.reject(data.mensaje);
			}
		}).error(defer.reject);
		return defer.promise;
	}
  return {
	
    getUsuarios: getUsuarios,
    
  };
})