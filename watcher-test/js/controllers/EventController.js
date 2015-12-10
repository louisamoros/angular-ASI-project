'use strict';

angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window', 'comm', 'factory'];

function eventCrtFnt($scope, $log, $window, comm, factory){

  //CREATE an object for interactions with ng-include controller
  $scope.contentMap={};
  $scope.contentMap.payload='';

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


      $scope.isSlidContentEmpty=function(slid){
        if(slid.contentMap[1]== undefined){
          return true;
        }
        return false
      };


      /*********************************** SOCKET MANAGEMENT ***********************************************/

      //create socket connection
      var socket = comm.io.socketConnection($scope, factory.generateUUID());

      socket.on('connection', function (data) {
  			socket.emit('data_comm',{'id':comm.io.uuid});
  			console.log('socket connection established, server said : ' + data.connection);
  		});
  		socket.on('slidEvent', function (data) {
        console.log('command received : ' + data.CMD);
  			switch(data.CMD) {
  				case 'START':
            //load pres which has is : data.id
            comm.loadPres('test', data.PRES_ID)
            .then(
              function(payload) {
                $scope.currentPresentation = payload;
                //set currentSlid to the first one by default
                setCurrentSlide(0);
                console.log('presentation \'' + $scope.currentPresentation.title + '\' has began');
              },
              function(errorPayload) {
                $log.error('failure loading presentation', errorPayload);
              });
  				break;
  				case 'PAUSE':
  				  $scope.pause = 'true';
  				break;
          case 'PREV':
            var index = getCurrentSlideIndex();
            var newIndex = index <= 0 ? 0 : (index - 1);
            setCurrentSlide(newIndex);
  				break;
  				case 'NEXT':
            var index = getCurrentSlideIndex();
            var endIdx = $scope.currentPresentation.slidArray.length - 1;
            var newIndex = index >= endIdx ? endIdx : (index + 1);
            setCurrentSlide(newIndex);
  				break;
  				case 'BEGIN':
            var index = getCurrentSlideIndex();
            var newIndex = index <= 0 ? 0 : (index - 1);
            setCurrentSlide(0);
  				break;
  				case 'END':
  				  setCurrentSlide($scope.currentPresentation.slidArray.length - 1);
  				break;

  				default:
  				console.log('unknown command from admin');
  			}

          $scope.$apply()

  		});

      //just for tests : simulation of this event sent by admin
      //socket.emit('slidEvent', {'CMD':"START",'PRES_ID':'12264e29-7c5c-4fd7-9418-1cc281257ebe'});

      //function sets the current slide depending on the given index
      function setCurrentSlide(index){
        $scope.currentSlide = $scope.currentPresentation.slidArray[index];
      }

      //function return the current slide index
      function getCurrentSlideIndex(){
        return $scope.currentPresentation.slidArray.indexOf($scope.currentSlide);
      }
}
