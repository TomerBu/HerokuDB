(function () {
    var app = angular.module('todosApp', ['ngRoute']);
    app.config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');

        $routeProvider.when('/', {
            controller:'todosController',
            templateUrl:'angular/views/todos.html'
        })
    });
})();