/**
* Modulo principal.
*
* Este modulo depende de todos los modulos que conforman el sistema, y se encarga de inicializarlos
*
*/
angular.module('myapp', [
	'ui.router',
	'ngMaterial',
	'ngMessages',
	'angularUtils.directives.dirPagination',
	'LocalStorageModule',
	'myapp.login',
	'myapp.publicador',
	'myapp.alumnos',
	'myapp.admin',
	'myapp.admin.cartelera',
	'myapp.admin.publicacion',
	'myapp.admin.usuario',
	'myapp.environment'
]);

angular.module('myapp.login', []);
angular.module('myapp.publicador', []);
angular.module('myapp.admin', []);
angular.module('myapp.admin.cartelera', []);
angular.module('myapp.admin.publicacion', []);
angular.module('myapp.admin.usuario', []);
angular.module('myapp.alumnos', []);
