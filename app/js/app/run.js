angular.module('myapp')
.run(function ($rootScope, $state, LoginService, ParseTokenService, RolService) {

	var routeForAdmin = '#/admin';
	var routeForPublicador = '#/publicador';
	var routeForAlumno = '#/alumnos';
//http://localhost/#/publicador/publicaciones

   $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!LoginService.isLoggedIn() && toState.url != "/login") {
            console.log('Denegar');
            event.preventDefault();
            $state.go('login');
        }else if(LoginService.isLoggedIn()){
					  var usuarioToken = ParseTokenService.parseToken(LoginService.getToken());
						var urlEstado = $state.href(toState, {}, {absolute: true});
						var userRol = RolService.getRol(usuarioToken);
        	 if(userRol == "ADMINISTRADOR" && urlEstado.search(routeForAdmin) == -1){
							event.preventDefault();
             	$state.go('admin');
        	 }else if ((userRol == "PUBLICADOR EXTERNO" || userRol=="INSTITUCIONAL" || userRol=="DOCENTE") && urlEstado.search(routeForPublicador) == -1){
						console.log(urlEstado);
						console.log(routeForPublicador);
        	 	event.preventDefault();
            $state.go('publicador');
        	 }else if (userRol == "ALUMNO" && urlEstado.search(routeForAlumno) == -1){
        	  	event.preventDefault();
             	$state.go('alumnos');
        	 }
        }
    });
});

// http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/
