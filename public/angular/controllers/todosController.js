(function () {
    //get a reference to a module, not using global variables here with anonimous functions
    var app = angular.module('todoApp');

    //A controller is just a function. (The $scope is injected by angular at runtime)
    var todosController = function ($scope) {
        $scope.todoList = [
            { text: 'learn angular', done: true },
            { text: 'build an angular app', done: false }
        ];

        $scope.todoList.addTodo = function () {
            todoList.todos.push({ text: todoList.todoText, done: false });
            todoList.todoText = '';
        };

        $scope.todoList.remaining = function () {
            var count = 0;
            angular.forEach(todoList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.todoList.archive = function () {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
    }
    //protection from code minifiers:
    todosController.$inject = ['$scope'];

    app.controller('TodoListController', todosController);
})();
