'use strict';

angular.module('adminApp').controller('presentationCtrl', presentationCrtFnt);

presentationCrtFnt.$inject=['$scope','$log', 'factory', '$window', 'comm', '$routeParams'];

function presentationCrtFnt($scope, $log, factory, $window, comm, $routeParams){

  //CREATE an object for interactions with ng-include controller
  $scope.contentMap = {};
  $scope.contentMap.payload = '';
  $scope.presentationMap = {};
  $scope.presentationMap.payload = "";
  $scope.uploadsDirectory = "../uploads/";

  //get images from server
  comm.loadImages().then(
    function(res) {
      $scope.contentMap.payload = res;
      $scope.contentMap.array = factory.mapToArray(res);
    },
    function(err) {
      $log.error(err);
    });


  //get presentation from server
  comm.loadPres($routeParams.presId).then(
      function(res) {
        $scope.currentPresentation = res;
      },
      function(err) {
        $log.error(err);
        $scope.currentPresentation = factory.presentationCreation();
      });

  //saves current presentation
  $scope.savePres = function() {
    comm.savePres($scope.currentPresentation).then(
      function(res){
        $window.alert('Presentation saved!');
      },
      function(err){
        $window.alert(err);
      }
    );
  };

  //saves current presentation and starts a new one
  $scope.newPres = function() {
    $scope.savePres($scope.currentPresentation);
    $scope.currentPresentation = factory.presentationCreation();
  };

  //creates a new slide and adds it to the current presentation
  $scope.newSlide = function() {
    var slide = factory.slidCreation('Title', 'Description');
    $scope.currentPresentation.slidArray.push(slide);
    $scope.currentSlide=slide;
  };

  //delete selected slide
  $scope.deleteSlide = function() {
    //get index of current slide, then remove it from slidArray
    var index = $scope.currentPresentation.slidArray.indexOf($scope.currentSlide);
    $scope.currentSlide = undefined;
    $scope.currentPresentation.slidArray.splice(index, 1);
  };

  $scope.selectCurrentSlid = function(slide){
    $scope.currentSlide = slide;
  };

  $scope.onDragComplete = function(data,evt){
    console.log("Drag success.");
  }


  $scope.onDropComplete=function(data,evt){

    if($scope.currentSlide !== undefined) {
      $scope.currentSlide.contentMap[1]=data.id + '_slide';
      //needed to inform angular that a change occurred on the current variable, this fire an event change
      $scope.$apply();
    }
  }

  $scope.getCurrentContent=function(){
    if(1  in  $scope.currentSlide.contentMap){
      return $scope.currentSlide.contentMap[1];
    }
  }

  $scope.isSlidContentEmpty=function(slid){
    if(slid.contentMap[1]== undefined){
      return true;
    }
    return false
  };
}
