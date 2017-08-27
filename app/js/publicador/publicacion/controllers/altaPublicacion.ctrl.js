angular.module('myapp.publicador')
.controller('AltaPublicacionCtrl', function($scope, $state, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, $mdDialog, PublicacionService){


  $scope.usuario = ParseTokenService.objetoDelToken();
  $scope.usuario.tipoUsuario = RolService.getRol($scope.usuario);
  $scope.cargarCarteleras = function(){
       CarteleraService.getCartelerasConPermiso($scope.usuario.id)
        .then(function(data){
            $scope.carteleras = data;
        }).
        catch(function(error){
            console.log(error);
        });
  };

  function agregarPublicacion() {
    $scope.publicacion.idPublicador = $scope.usuario.id;
    $scope.publicacion.habilitarComentarios = false;
     PublicacionService.agregarPublicacion($scope.carteleraDePublicacion, $scope.publicacion)
     .then(function(data){
       $state.go('publicador',{"exito":'La publicacion se realizo con exito!'});//,{"exito":"La cartelera se ha creado con exito!"});
     }).
     catch(function(error){
       console.log(error);
     });
  };

  $scope.showConfirm = function(ev) {
    if ($scope.carteleraDePublicacion != undefined){
        var confirm = $mdDialog.confirm()
              .title('Desea agregar la publicacion?')
              .ok('Agregar')
              .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
          agregarPublicacion();
        }, function() {
          console.log('Cancela');
        });
    }
  };

  $scope.options = {
        height: 300,
        dialogsInBody: true,
        toolbar: [
          ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','hr']],
            ['view', ['codeview']],
            ['help', ['help']]
        ]
      };


});
