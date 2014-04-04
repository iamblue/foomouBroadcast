angular.module \textbroadcast
  .factory 'mySocket', ->
    io.connect('http://localhost:8880')  
  .controller \broadcast, <[$scope mySocket]> ++ ($scope,mySocket)->
    $scope.mySocket= mySocket
    $scope.send = ->
      mySocket.emit 'broadcast', {content:$scope.livetext,location:$scope.location}
      $scope.livetext = ''
