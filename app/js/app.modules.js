/**
* Modulo principal.
*
* Este modulo depende de todos los modulos que conforman el sistema, y se encarga de inicializarlos
*
*/
angular.module('myapp', [
	'ui.router',
	'LocalStorageModule',
	'myapp.login',
	'myapp.publicador',
	'myapp.alumnos',
	'myapp.publicador.admin',
	'myapp.environment'
]);

angular.module('myapp.login', []);
angular.module('myapp.publicador', []);
angular.module('myapp.publicador.admin', []);
angular.module('myapp.alumnos', []);
