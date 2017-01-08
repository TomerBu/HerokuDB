(function () {
    //get a reference to a module, not using global variables here with anonimous functions
    var app = angular.module('todosApp');

    //A controller is just a function. (The $scope is injected by angular at runtime)
    var ordersController = function ($scope) {
        $scope.orders = [{
                todoId: 1,
                product: "cheese"
            },
            {
                todoId: 1,
                product: "Pineapple"
            },
            {
                todoId: 2,
                product: "Paper"
            },
        ];

    }
    //protection from code minifiers:
    ordersController.$inject = ['$scope'];

    app.controller('ordersController', ordersController);
})();