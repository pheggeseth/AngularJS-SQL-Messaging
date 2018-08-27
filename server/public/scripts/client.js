const app = angular.module('app', []);

app.controller('MessagesController', ['$http', function($http) {
  vm = this;
  vm.hello = 'Hello from MessagesController';
}]);