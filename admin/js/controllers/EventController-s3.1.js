'use strict';

angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log', 'factory', '$window', 'comm'];

function eventCrtFnt($scope, $log, factory, $window, comm){

	$scope.currentPresentation = factory.presentationCreation();
	//$scope.imageMap = comm.loadImages($scope.currentPresentation.title, $scope.currentPresentation.id);

	$scope.savePres = function() {

	};

	$scope.newSlide = function() {

		var slide = factory.slidCreation('default slide title', 'description');
		var attachedContent = factory.contentCreation('default content title', 'image', '../images/chatfou.jpg');
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
