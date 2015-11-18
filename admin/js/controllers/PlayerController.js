'use strict';

angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log', 'factory', '$window'];

function eventCrtFnt($scope, $log, factory, $window){

	$scope.currentPresentation = factory.presentationCreation();
	$scope.slideArray =

	$scope.savePres = function() {

	};

	// Cette méthode ajoute un objet slid à l’objet
	//$scope.currentPresenation. Le nouvel objet slid devra
	//contenir un objet content alors créé.
	$scope.newSlide = function() {

		var slide = factory.slidCreation('default slide title', 'description');
		var attachedContent = factory.contentCreation('default content title', 'image', '../images/loulou.jpeg');
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
