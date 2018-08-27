const app = angular.module('app', []);

app.controller('MessagesController', ['$http', function($http) {
  vm = this;
  vm.hello = 'Hello from MessagesController';
  vm.messageForm = {
    name: '',
    message: ''
  };
  vm.messages = [];

  vm.getMessages = function() {
    $http.get('/messages').then(function(response) {
      console.log('/messages GET success:', response.data);
      vm.messages = response.data;
    }).catch(function(error) {
      console.log('/messages GET error:', error);
    });
  };

  vm.addMessage = function() {
    console.log(vm.messageForm);
    $http.post('/messages', vm.messageForm).then(function(response) {
      console.log('/messages POST success:', response);
      vm.getMessages();
    }).catch(function(error) {
      console.log('/messages POST error:', error);
    });
  };

  vm.getMessages();
}]);