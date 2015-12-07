'use strict';

angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log', 'factory', '$window', 'comm'];

function eventCrtFnt($scope, $log, factory, $window, comm){

	//attempt to load a default presentation, create one if failed
	//then load image map (for the right panel) from server
	comm.loadPres('le chat', '928ec6ac-5e6b-4414-aa7d-8532321074a8').then(
		function(data){
			$scope.currentPresentation = data;
			getImgs();
 		},
		function(error){
			$window.alert('presentation not found');
			$scope.currentPresentation = factory.presentationCreation();
			getImgs();
 		}
	);

	//just to avoid duplicated code above
	function getImgs(){
		comm.loadImages($scope.currentPresentation.title, $scope.currentPresentation.id).then(
	 		function(data){
				$scope.contentMap = data;
	 		},
			function(error){
				$scope.errorLogRight = 'the server was unable to send the image map';
	 		}
		);
	}

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

	$scope.newSlide = function() {

		var slide = factory.slidCreation('default slide title', 'description');
		var attachedContent = factory.contentCreation('default content title', 'image', '../images/chatfou.jpg');
		//var attachedContent = factory.contentCreation('default content title', 'image', null);
		slide.content  = attachedContent;
		$scope.currentPresentation.slidArray[slide.id] = slide;

	};

	$scope.selectCurrentSlid=function(slide){
		$scope.currentSlide=slide;
	};

	$scope.isSlidContentEmpty=function(slid){
		if(slid.contentMap[1]== undefined){
        return true;
    }
		return false
	};

}
