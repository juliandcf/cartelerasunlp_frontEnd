'use strict';
angular.module('myapp.login')
.factory('LoginService', function(ENV, $http, $q){

  var config = {
    headers : {
    'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json;charset=utf-8;'
    }
  };
  
  var login = function(user, password, tipoUsuario) {
    var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/usuario/'+tipoUsuario+'/login',
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
  };

  var logout = function() {
    var defer = $q.defer();
    // invalido el token
    localStorage.removeItem('tokenSeguridad');
    defer.resolve();

    return defer.promise;
  };

  var isLoggedIn = function() {
    var isToken = angular.isDefined(getToken()) && getToken() !== null;
    return isToken;
  };

  var getToken = function() {
    return localStorage.getItem('tokenSeguridad');
  };


  return {
    login: login,
    logout: logout,
    getToken: getToken,
    isLoggedIn: isLoggedIn
  };
})