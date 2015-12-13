'use strict';

angular
  .module('adminApp', ['ngDraggable','factoryServices','commServices','ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardCtrl'
      })
      .when('/presentation/:presId', {
        templateUrl: 'views/presentation.html',
        controller: 'presentationCtrl'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
