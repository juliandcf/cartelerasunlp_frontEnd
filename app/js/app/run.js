angular.module('myapp')
.run(function ($rootScope, $state, LoginService, ParseTokenService) {

	var routesForAdmins = ['/administrador'];
	var routesForInstitucional = ['/institucional'];
	var routesForPublicadorExterno = ['/publicadorExterno'];
	var routesForAlumno = ['/alumnos'];
	var routesForDocente = ['/profesores'];

	console.log('se ejecuta el run');
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (!LoginService.isLoggedIn() && toState.url != "/login") {
            console.log('Denegar');
            event.preventDefault();
            $state.go('login');
        }else if(LoginService.isLoggedIn()){
        	var userRol = (ParseTokenService.parseToken(LoginService.getToken())).rol;
        	if(userRol == "administrador" && !routesForAdmins.includes(toState.url)){
        		event.preventDefault();
            	$state.go('administrador');
        	}else if (userRol == "institucional" && !routesForInstitucional.includes(toState.url)){
        		event.preventDefault();
            	$state.go('institucional');
        	}else if (userRol == "publicadorExterno" && !routesForPublicadorExterno.includes(toState.url)){
        		event.preventDefault();
            	$state.go('publicadorExterno');
        	}else if (userRol == "alumnos" && !routesForAlumno.includes(toState.url)){
        		event.preventDefault();
            	$state.go('alumnos');
        	}else if (userRol == "profesores" && !routesForDocente.includes(toState.url)){
        		event.preventDefault();
            	$state.go('profesores');
        	}
        }
    });
});

// http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/