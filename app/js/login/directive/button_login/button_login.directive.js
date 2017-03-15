var app = angular.module("myapp.login");
app.directive("buttonLogin", function() {
    return {
        templateUrl : 'js/login/directive/button_login/button_login.html'
    };
});