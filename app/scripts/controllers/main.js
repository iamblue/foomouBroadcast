angular.module('textbroadcast').factory('mySocket', function(){
  return io.connect('http://foomou.iamblue.me:8880');
}).controller('broadcast', ['$scope', 'mySocket'].concat(function($scope, mySocket){
  $scope.mySocket = mySocket;
  return $scope.send = function(){
    mySocket.emit('broadcast', {
      content: $scope.livetext,
      location: $scope.location
    });
    return $scope.livetext = '';
  };
}));
