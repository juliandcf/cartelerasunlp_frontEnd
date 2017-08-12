'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('UsuarioAlumnoService', function(ENV, $http, $q){


		var getUsuarioInteresId = function(id) {
		var defer = $q.defer();
		$http.get(ENV.endpoint.url +'/usuario/alumnos/'+id+'/cartelerasInteresId')
		.success(function(data) {
			if (data.codigo == 200) {
				/* Retorna el alumno pero con una coleccion de id de las carteleras de interes */
				defer.resolve(data.objeto);
			} else {
				defer.reject(data.mensaje);
			}
		}).error(defer.reject);
		return defer.promise;
	  }

    var registrarInteres = function(idUsuario, idCartelera) {
    var defer = $q.defer();
    $http.put(ENV.endpoint.url +'/usuario/alumnos/'+idUsuario+'/registrarInteres', {id: idCartelera})
    .success(function(data) {
      if (data.codigo == 200) {
        defer.resolve(data.objeto);
      } else {
        defer.reject(data.mensaje);
      }
    }).error(defer.reject);
    return defer.promise;
    }


    var sacarInteres = function(idUsuario, idCartelera) {
    var defer = $q.defer();
    $http.delete(ENV.endpoint.url +'/usuario/alumnos/'+idUsuario+'/eliminarInteres/'+idCartelera)
    .success(function(data) {
      if (data.codigo == 200) {
        defer.resolve(data.objeto);
      } else {
        defer.reject(data.mensaje);
      }
    }).error(defer.reject);
    return defer.promise;
    }

		var actualizarUsuario = function(usuario) {
		usuario.cartelerasDeInteres = null;
    var defer = $q.defer();
    $http.put(ENV.endpoint.url +'/usuario/alumnos/'+usuario.id, usuario)
    .success(function(data) {
      if (data.codigo == 200) {
        defer.resolve(data.objeto);
      } else {
        defer.reject(data.mensaje);
      }
    }).error(defer.reject);
    return defer.promise;
    }

		var getUsuario = function(id) {
		var defer = $q.defer();
		$http.get(ENV.endpoint.url +'/usuario/alumnos/'+id)
		.success(function(data) {
			if (data.codigo == 200) {
				defer.resolve(data.objeto);
			} else {
				defer.reject(data.mensaje);
			}
		}).error(defer.reject);
		return defer.promise;
	  }

  return {
    getUsuarioInteresId: getUsuarioInteresId,
    registrarInteres :registrarInteres,
    sacarInteres : sacarInteres,
		actualizarUsuario : actualizarUsuario,
		getUsuario : getUsuario
  };
})
