'use strict';

angular.module('adminApp').controller('dashboardCtrl', dashboardCrtFnt);

dashboardCrtFnt.$inject=['$scope','comm', '$location'];

function dashboardCrtFnt($scope, comm, $location){

  comm.loadPres().then(
    function(res) {
      $scope.presentations = res;
    },
    function(err) {
      console.error(err);
    });

  $scope.loadPres = function(presId) {
    $location.path('presentation/' + presId);
  }
}
