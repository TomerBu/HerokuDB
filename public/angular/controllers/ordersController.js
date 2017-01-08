(function () {
    //get a reference to a module, not using global variables here with anonimous functions
    var app = angular.module('todosApp');

    //A controller is just a function. (The $scope is injected by angular at runtime)
    var ordersController = function ($scope, $routeParams) {
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

        var todoId = $routeParams.todoId;
        if (todoId)
            $scope.orders = $scope.orders.filter(function (item) {
                return item.todoId == todoId;
            })
    }
    //protection from code minifiers:
    ordersController.$inject = ['$scope', '$routeParams'];

    app.controller('ordersController', ordersController);
})();