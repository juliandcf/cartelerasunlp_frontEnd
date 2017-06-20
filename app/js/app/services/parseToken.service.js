'use strict';
//angular.module('myapp.login')
angular.module('myapp')
.factory('ParseTokenService', function(){


  var parseToken = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenParseado = JSON.parse(window.atob(base64));
    return JSON.parse(tokenParseado.content);
  };


  return {
    parseToken: parseToken
  };
})