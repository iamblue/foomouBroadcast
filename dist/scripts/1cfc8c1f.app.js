angular.module('law580App', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngStorage']).config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider'].concat(function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider){
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('/', {
    url: '/',
    templateUrl: '/views/index.html',
    controller: 'indexCtrl'
  }).state('mainMap', {
    url: '/mainMap',
    templateUrl: '/views/main/index.html',
    controller: 'mainMapCtrl'
  }).state('regist_lawer', {
    url: '/regist/lawer',
    templateUrl: '/views/regist/law.html',
    controller: 'lawerRegistCtrl'
  }).state('regist_user', {
    url: '/regist/user',
    templateUrl: '/views/regist/law.html',
    controller: 'userRegistCtrl'
  }).state('grade_lawer', {
    url: '/grade/user',
    templateUrl: '/views/grade/lawer.html',
    controller: 'lawerGradeCtrl'
  });
}));