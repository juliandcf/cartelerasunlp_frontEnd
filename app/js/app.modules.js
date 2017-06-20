/**
* Modulo principal.
*
* Este modulo depende de todos los modulos con conforman el sistema, y se encarga de inicializarlos
*
*/
angular.module('myapp', [
	'ui.router',
	'LocalStorageModule',
	'myapp.login',
	'myapp.publicador',
	'myapp.alumnos',
	'myapp.environment'
]);

angular.module('myapp.login', []);
angular.module('myapp.publicador', []);
angular.module('myapp.alumnos', []);

