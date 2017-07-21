'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('PublicacionService', function(ENV, $http, $q){


  var agregarPublicacion = function(idCartelera, publicacion){
    var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/cartelera/'+idCartelera+'/publicacion', publicacion)
    .success(function(data){
      if(data.codigo == 200){
          defer.resolve(data.objeto);
      }else{
          defer.reject(data);
      }
    })
    .error(defer.reject);
    return defer.promise;
  }


  var eliminarPublicacion = function(idCartelera, idPublicacion){
    var defer = $q.defer();
    $http.delete(ENV.endpoint.url + '/cartelera/'+idCartelera+'/publicacion/' + idPublicacion)
    .success(function(data){
      if(data.codigo == 200){
          defer.resolve(data.objeto);
      }else{
          defer.reject(data);
      }
    })
    .error(defer.reject);
    return defer.promise;
  }

  return {
    agregarPublicacion : agregarPublicacion,
    eliminarPublicacion : eliminarPublicacion
  };
})
