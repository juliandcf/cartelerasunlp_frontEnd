angular.module('myapp.publicador')
.controller('ModificarPublicacionCtrl', function($scope, $state, $stateParams, LoginService, RolService, ParseTokenService, MenuService, CarteleraService, $mdDialog, PublicacionService){

  $scope.cartelera = $stateParams.cartelera;
  $scope.publicacion = $stateParams.publicacion;

  $scope.usuario = ParseTokenService.objetoDelToken();
  $scope.usuario.tipoUsuario = RolService.getRol($scope.usuario);

  function modificarPublicacion() {
    $scope.publicacion.idPublicador = $scope.usuario.id;
    $scope.publicacion.habilitarComentarios = false;
     PublicacionService.modificarPublicacion($scope.cartelera.id, $scope.publicacion)
     .then(function(data){
       $state.go('publicador',{"exito":'La publicacion se modifico con exito!'});
     }).
     catch(function(error){
       console.log(error);
     });
  };

  $scope.showConfirmModificar = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Desea modificar la publicacion?')
              .ok('Agregar')
              .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
          modificarPublicacion();
        }, function() {
          console.log('Cancela');
        });
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
