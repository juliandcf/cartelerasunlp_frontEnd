'use strict';
/**
 * @ngdoc interceptor
 * @name myapp.interceptor.httpTokenInterceptor
 * @description httpTokenInterceptor Factory
 */
angular.module('myapp')
  .factory('httpTokenInterceptor',
    function($q, $injector) {
      var loginService;
      return {
        request: function(config) {
          if(!loginService){loginService = $injector.get('LoginService');}
          // Si no es un html
          if (config.url.indexOf('.html') === -1) {
            // Si es usuario esta logeado y no va a logout (no es necesario el token)
            if (loginService.isLoggedIn() && config.url.indexOf('logout') === -1) {
              config.headers['Authorization'] = loginService.getToken();
            }
          }
          return config || $q.when(config);
        }
      };
  })
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('httpTokenInterceptor');
  });
 /*
 $httpProvider --> https://carlosazaustre.es/blog/autenticacion-con-token-en-angularjs/
 
¿Cómo se envía el token en cada petición HTTP?

De eso se encarga la directiva $httpProvider que funciona como interceptor o middleware 
y se activa en cada petición HTTP.

De esta manera, en cada petición HTTP, se inserta en las cabeceras el token si lo tenemos en el 
LocalStorage y ya despues el backend (nuestro servidor o API) se encarga de ver si existe, 
es correcto o no y devolver el código de respuesta para cada caso.

  */
