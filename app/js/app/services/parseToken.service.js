'use strict';
angular.module('myapp')
.factory('ParseTokenService', function(){


  var parseToken = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenParseado = JSON.parse(window.atob(base64));
    return JSON.parse(tokenParseado.content);
  };

  var objetoDelToken = function(){
    //Ya retorna el objeto del token parseado. Ahorra el paso de traerse el token de seguridad del localStorage.
    var token = localStorage.getItem('tokenSeguridad');
    var objeto = this.parseToken(token);
    return objeto;
  }
  return {
    parseToken: parseToken,
    objetoDelToken: objetoDelToken
  };
})
