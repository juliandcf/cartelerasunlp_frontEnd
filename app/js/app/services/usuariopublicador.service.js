'use strict';
angular.module('myapp')
//En los servicios no se puede utilizar el scope
.factory('UsuarioPublicadorService', function(ENV, $http, $q){


		var getUsuarios = function(id) {
		var defer = $q.defer();
		$http.get(ENV.endpoint.url +'/usuario/publicador/admin/'+id+'/usuariosPublicadores')
		.success(function(data) {
			if (data.codigo == 200) {
				/* Retorno la coleccion de carteleras */
				defer.resolve(data.objeto);
			} else {
				defer.reject(data.mensaje);
			}
		}).error(defer.reject);
		return defer.promise;
	   }

		var agregarUsuario = function(usuario){
		    var defer = $q.defer();
		    $http.post(ENV.endpoint.url + '/usuario/publicador', usuario)
		    .success(function(data){
		      if(data.codigo == 200){
		          defer.resolve(data.objeto);
		      }else{
		          defer.reject(data);
		      }
		    })
		    .error(defer.reject);
		    return defer.promise;
		  }

		var modificarUsuario = function(usuario){
		    var defer = $q.defer();
		    $http.put(ENV.endpoint.url + '/usuario/publicador/' + usuario.id, usuario)
		    .success(function(data){
		      if(data.codigo == 200){
		          defer.resolve(data.objeto);
		      }else{
		          defer.reject(data);
		      }
		    })
		    .error(defer.reject);
		    return defer.promise;
		  }

      var modificarPerfilUsuario = function(usuario){
  		    var defer = $q.defer();
  		    $http.put(ENV.endpoint.url + '/usuario/publicador/' + usuario.id + '/perfil', usuario)
  		    .success(function(data){
  		      if(data.codigo == 200){
  		          defer.resolve(data.objeto);
  		      }else{
  		          defer.reject(data);
  		      }
  		    })
  		    .error(defer.reject);
  		    return defer.promise;
  		  }

		var eliminarUsuario = function(id){
		    var defer = $q.defer();
		    $http.delete(ENV.endpoint.url + '/usuario/publicador/' + id)
		    .success(function(data){
		      if(data.codigo == 200){
		          defer.resolve(data.objeto);
		      }else{
		          defer.reject(data);
		      }
		    })
		    .error(defer.reject);
		    return defer.promise;
		  }

			var getUsuario = function(id) {
			var defer = $q.defer();
			$http.get(ENV.endpoint.url +'/usuario/publicador/'+id)
			.success(function(data) {
				if (data.codigo == 200) {
					defer.resolve(data.objeto);
				} else {
					defer.reject(data.mensaje);
				}
			}).error(defer.reject);
			return defer.promise;
		  }


  return {
	  agregarUsuario: agregarUsuario,
	  modificarUsuario: modificarUsuario,
    modificarPerfilUsuario:modificarPerfilUsuario,
	  eliminarUsuario: eliminarUsuario,
    getUsuarios: getUsuarios,
		getUsuario : getUsuario

  };
})
