'use strict';

angular
  .module('adminApp', ['ngDraggable','factoryServices','commServices','ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'index.html',
        controller: 'AdminCtrl'
      })
      .when('/presentation', {
        templateUrl: 'views/presentation.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
