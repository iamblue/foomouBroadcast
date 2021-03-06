angular.module('textbroadcast', ['angularFileUpload', 'angular-medium-editor', 'angular-gestures', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngStorage']).config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider'].concat(function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider){
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('/', {
    url: '/',
    templateUrl: '/views/index.html',
    controller: 'indexCtrl'
  });
}));