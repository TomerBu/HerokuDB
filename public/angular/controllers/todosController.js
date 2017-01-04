(function () {
    //get a reference to a module, not using global variables here with anonimous functions
    var app = angular.module('todosApp');

    //A controller is just a function. (The $scope is injected by angular at runtime)
    var todosController = function ($scope) {
        $scope.todos = [
            { text: 'learn angular', done: true },
            { text: 'build an angular app', done: false }
        ];

        $scope.todos.addTodo = function () {
            $scope.todos.push({ text: todoList.todoText, done: false });
            $scope.todoText = '';
        };

        $scope.todos.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };
    }
    //protection from code minifiers:
    todosController.$inject = ['$scope'];

    app.controller('todosController', todosController);
})();
