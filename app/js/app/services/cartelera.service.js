'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('CarteleraService', function(ENV, $http, $q){


  var getCartelera = function(idCartelera) {
    var defer = $q.defer();
    $http.get(ENV.endpoint.url + '/cartelera/' + idCartelera)
    .success(function(data){
      if(data.codigo == 200){
          defer.resolve(data.objeto);
      }else{
          defer.reject(data.mensaje);
      }
    })
    .error(defer.reject);
    return defer.promise;
  }

  var getCarteleras = function() {
    var defer = $q.defer();
    $http.get(ENV.endpoint.url + '/cartelera')
    .success(function(data){
      if(data.codigo == 200){
          /*Retorno la coleccion de carteleras*/
          defer.resolve(data.objeto);
      }else{
          defer.reject(data.mensaje);
      }
    })
    .error(defer.reject);
    return defer.promise;
  }


  var getCartelerasConPermiso = function(idPublicador) {
	    var defer = $q.defer();
	   $http.get(ENV.endpoint.url + '/cartelera/paraPublicador/'+idPublicador)
	    .success(function(data){
	      if(data.codigo == 200){
	    	  defer.resolve(data.objeto);
	      }else{
	          defer.reject(data.mensaje);
	      }
	    })
	    .error(defer.reject);
	    return defer.promise;
	  }


  var agregarCartelera = function(cartelera){
    var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/cartelera', cartelera)
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


  var modificarCartelera = function(cartelera){
    var defer = $q.defer();
    $http.put(ENV.endpoint.url + '/cartelera/' + cartelera.id, cartelera)
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

  var eliminarCartelera = function(id){
    var defer = $q.defer();
    $http.delete(ENV.endpoint.url + '/cartelera/' + id)
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
	  getCartelerasConPermiso: getCartelerasConPermiso,
    getCartelera: getCartelera,
    getCarteleras: getCarteleras,
    agregarCartelera : agregarCartelera,
    eliminarCartelera : eliminarCartelera,
    modificarCartelera : modificarCartelera
  };
})
