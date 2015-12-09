'use strict';

angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log', 'factory', '$window', 'comm'];

function eventCrtFnt($scope, $log, factory, $window, comm){

  //CREATE an object for interactions with ng-include controller
  $scope.contentMap={};
  $scope.contentMap.payload='';
  $scope.presentationMap={};
  $scope.presentationMap.payload="";

  //get images from server
  var available_content=comm.loadImages('','');
  available_content.then(
    function(payload) {
      $scope.contentMap.payload = payload;
      $scope.contentMap.array=factory.mapToArray(payload);
    },
    function(errorPayload) {
      $log.error('failure loading images', errorPayload);
    });

    //get presentation from server
    var firstPresentation=comm.loadPres('test', '90bb7ac7-a68e-4000-bc5f-65e538bdcc27');
    firstPresentation.then(
      function(payload) {
        $scope.currentPresentation = payload;

        // console.log($scope.currentPresentation);
        // console.log($scope.currentPresentation.slidArray);
        // if($scope.currentPresentation.slidArray == undefined){
        // 	console.log('creating new pres because there is still a problem loading the existing one');
        // 	$scope.currentPresentation = factory.presentationCreation();
        // }
        //var pres = JSON.parse($scope.currentPresentation);
      },
      function(errorPayload) {
        $log.error('failure loading presentation', errorPayload);
        $scope.currentPresentation = factory.presentationCreation();
      });

      //saves current presentation
      $scope.savePres = function() {
        comm.savePres($scope.currentPresentation).then(
          function(resp){
            $window.alert('presentation saved!');
          },
          function(error){
            $window.alert('the server was unable to save your presentation');
          }
        );
      };

      //saves current presentation and starts a new one
      $scope.newPres = function() {
        $scope.savePres($scope.currentPresentation);
        $scope.currentPresentation = factory.presentationCreation();
      };

      $scope.newSlide = function() {

        var slide = factory.slidCreation('slide title', 'description');
        //var attachedContent = factory.contentCreation('default content title', 'image', '../images/chatfou.jpg');
        //var attachedContent = factory.contentCreation('default content title', 'image', null);
        //slide.content  = attachedContent;
        //$scope.currentPresentation.slidArray[slide.id] = slide;
        console.log($scope.currentPresentation);
        $scope.currentPresentation.slidArray.push(slide);
        $scope.currentSlide=slide;

      };

      $scope.deleteSlide = function() {
        //get index of current slide, then remove it from slidArray
        var index = $scope.currentPresentation.slidArray.indexOf($scope.currentSlide);
        $scope.currentSlide = undefined;
        $scope.currentPresentation.slidArray.splice(index, 1);
      };

      $scope.selectCurrentSlid=function(slide){
        $scope.currentSlide=slide;
      };

      $scope.onDragComplete=function(data,evt){
        console.log("drag success, data:", data);
      }


      $scope.onDropComplete=function(data,evt){

        console.log('in onDropComplete');

        if($scope.currentSlide != undefined){
          console.log(data.id);
          $scope.currentSlide.contentMap[1]=data.id;

          //needed to inform angular that a change occurred on the current variable, this fire an event change
          $scope.$apply()
          console.log("drop success, data:", data);
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


      /*********************************** SOCKET MANAGEMENT ***********************************************/

      //create socket connection
      var socket = comm.io.socketConnection($scope, factory.generateUUID());

      //handle button behaviors
      $scope.emitPrev=function(){
        console.log('prev');
        var index = getCurrentSlideIndex();
        var newIndex = index <= 0 ? 0 : (index - 1);
        setCurrentSlide(newIndex);
        comm.io.emitPrev(socket);
      };
      $scope.emitStart=function(){
        //todo
        comm.io.emitStart(socket);
      };
      $scope.emitPause=function(){
        //todo
        comm.io.emitPause(socket);
      };
      $scope.emitBegin=function(){
        console.log('begin');
        var index = getCurrentSlideIndex();
        var newIndex = index <= 0 ? 0 : (index - 1);
        setCurrentSlide(0);
        comm.io.emitBegin(socket);
      };
      $scope.emitNext=function(){
        console.log('next');
        var index = getCurrentSlideIndex();
        var endIdx = $scope.currentPresentation.slidArray.length - 1;
        var newIndex = index >= endIdx ? endIdx : (index + 1);
        setCurrentSlide(newIndex);
        comm.io.emitNext(socket);
      };
      $scope.emitEnd=function(){
        console.log('end');
        setCurrentSlide($scope.currentPresentation.slidArray.length - 1);
        comm.io.emitEnd(socket);
      };


      //function sets the current slide depending on the given index
      function setCurrentSlide(index){
        $scope.currentSlide = $scope.currentPresentation.slidArray[index];
      }

      //function return the current slide index
      function getCurrentSlideIndex(){
        return $scope.currentPresentation.slidArray.indexOf($scope.currentSlide);
      }

}
