'use strict';
angular.module('myapp.login')
.factory('RegistroService', function(ENV, $http, $q){

  var config = {
    headers : {
    'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json;charset=utf-8;'
    }
  };
  
  var registrarDocente = function(usuarioGuarani) {
    var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/usuario/profesores',
     {
      "usuario":usuarioGuarani.usuario,
      "nombre": usuarioGuarani.nombre,
      "apellido": usuarioGuarani.apellido,
      "anios":usuarioGuarani.anios,
      "email": usuarioGuarani.email
    }) 
    .success(function(data){
      if(data.codigo == 200){
          defer.resolve(data);
      }else{
          defer.reject(data.mensaje);
      }
    })
    .error(defer.reject);

    return defer.promise;
  };

  var registrarAlumno = function(usuarioGuarani) {
    var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/usuario/alumnos',
     {
      "usuario":usuarioGuarani.usuario,
      "nombre": usuarioGuarani.nombre,
      "apellido": usuarioGuarani.apellido,
      "legajo":usuarioGuarani.legajo,
      "email": usuarioGuarani.email
    }) 
    .success(function(data){
      console.log('El login responde: ');
      console.log(data);
      if(data.codigo == 200){
          defer.resolve(data);
      }else{
          defer.reject(data.mensaje);
      }
    })
    .error(defer.reject);

    return defer.promise;
  }

  return {
    registrarDocente: registrarDocente,
    registrarAlumno: registrarAlumno,
  };
})