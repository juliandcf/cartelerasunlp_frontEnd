'use strict';
angular.module('myapp')
.factory('MenuService', function(){


  var getMenuItems = function(tipoUsuario) {
      var menu = null;
      if(tipoUsuario == 'ADMINISTRADOR'){
          menu = [
           { estado: 'admin', nombre: "Home", activo: true},
           { estado: 'admin.carteleraAdmin', nombre: "Carteleras", activo: false },
           { estado: '#', nombre: "Publicaciones" , activo: false },
           { estado: 'admin.usuarioAdmin', nombre: "Usuarios" , activo: false }
          ];
      }else if (tipoUsuario == 'DOCENTE' || tipoUsuario == 'PUBLICADOR EXTERNO' || tipoUsuario == 'INSTITUCIONAL') {
        menu = [
         { estado: 'publicador', nombre: "Home", activo: true},
         { estado: '#', nombre: "Carteleras", activo: false },
         { estado: '#', nombre: "Publicaciones" , activo: false }
        ];
      }
    return menu;
  };

  var cambioActivo = function($index, $menuItems) {
		$menuItems.forEach(function(item) {
  			item.activo = false;
		});
		$menuItems[$index].activo = true;
	};


  return {
    getMenuItems: getMenuItems,
    cambioActivo : cambioActivo
  };
})
