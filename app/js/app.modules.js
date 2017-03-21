/**
* Modulo principal.
*
* Este modulo depende de todos los modulos con conforman el sistema, y se encarga de inicializarlos
*
*/
angular.module('myapp', [
	'ui.router',
	'myapp.administrador',
	'LocalStorageModule',
	'myapp.login',
	'myapp.publicadorExterno',
	'myapp.institucional',
	'myapp.profesores',
	'myapp.alumnos',
	'myapp.environment'
]);

angular.module('myapp.login', []);
angular.module('myapp.administrador', []);
angular.module('myapp.publicadorExterno', []);
angular.module('myapp.institucional', []);
angular.module('myapp.profesores', []);
angular.module('myapp.alumnos', []);

