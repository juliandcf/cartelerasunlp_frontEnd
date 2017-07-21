'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('PermisosCartelerasService', function(ENV, $http, $q){


  var getPermisos = function() {
    var defer = $q.defer();
    $http.get(ENV.endpoint.url + '/permisoCartelera/')
    .success(function(data){
      if(data.codigo == 200){
          /*Retorno la coleccion de permisos */
          defer.resolve(data.objeto);
      }else{
          defer.reject(data.mensaje);
      }
    })
    .error(defer.reject);
    return defer.promise;
  }

  
  var getRecuperar = function(id) {
	    var defer = $q.defer();
	    $http.get(ENV.endpoint.url + '/permisoCartelera/'+id)
	    .success(function(data){
	      if(data.codigo == 200){
	          /*Retorno el permisos */
	          defer.resolve(data.objeto);
	      }else{
	          defer.reject(data.mensaje);
	      }
	    })
	    .error(defer.reject);
	    return defer.promise;
	  }
  
  
  
  var  getPermisosSinDocente = function() {
	    var defer = $q.defer();
	    $http.get(ENV.endpoint.url + '/permisoCartelera/sinDocente')
	    .success(function(data){
	      if(data.codigo == 200){
	          /*Retorno la coleccion de permisos */
	          defer.resolve(data.objeto);
	      }else{
	          defer.reject(data.mensaje);
	      }
	    })
	    .error(defer.reject);
	    return defer.promise;
	  }

	  return {
		  getPermisosSinDocente: getPermisosSinDocente,
	    getPermisos: getPermisos,
	    getRecuperar: getRecuperar
	  };
 
})
