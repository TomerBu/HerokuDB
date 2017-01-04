(function () {
    var app = angular.module('todosApp', []);
    app.config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
})();