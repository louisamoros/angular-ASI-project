'use strict';

angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log', 'factory', '$window', 'comm'];

function eventCrtFnt($scope, $log, factory, $window, comm){




	//CREATE an object for interactions with ng-include controller
    $scope.contentMap={};
		$scope.contentMap.payload='';
    $scope.presentationMap={};
    $scope.presentationMap.payload="";

    var available_content=comm.loadImages('','');
       available_content.then(
          function(payload) {
              $scope.contentMap.payload = payload;
              $scope.contentMap.array=factory.mapToArray(payload);
          },
          function(errorPayload) {
              $log.error('failure loading images', errorPayload);
          });

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

		//$scope.currentPresentation = factory.presentationCreation();

		// $scope.currentPresentation = factory.presentationCreation();
		// console.log('pres created');


	// attempts to load a default presentation, create one if failed
	// then loads image map (for the right panel) from server
	// comm.loadPres('le chat', '928ec6ac-5e6b-4414-aa7d-8532321074a8').then(
	// 	function(data){
	// 		$scope.currentPresentation = data;
	// 		getImgs();
	// 	},
	// 	function(error){
	// 		$window.alert('presentation not found');
	// 		$scope.currentPresentation = factory.presentationCreation();
	// 		getImgs();
	// 	}
	// );

	//just to avoid duplicated code above
	// function getImgs(){
	// 	comm.loadImages($scope.currentPresentation.title, $scope.currentPresentation.id).then(
	// 		function(data){
	// 			$scope.contentMap = data;
	// 			console.log($scope.contentMap);
	// 		},
	// 		function(error){
	// 			$scope.errorLogRight = 'the server was unable to send the image map';
	// 		}
	// 	);
	// }

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

		var slide = factory.slidCreation('default slide title', 'description');
		//var attachedContent = factory.contentCreation('default content title', 'image', '../images/chatfou.jpg');
		//var attachedContent = factory.contentCreation('default content title', 'image', null);
		//slide.content  = attachedContent;
		//$scope.currentPresentation.slidArray[slide.id] = slide;
		console.log($scope.currentPresentation);
		$scope.currentPresentation.slidArray.push(slide);
		$scope.currentSlide=slide;

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

}
