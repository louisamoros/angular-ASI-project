'use strict';

angular.module('adminApp').controller('playerCtrl',playerCrtFnt);

playerCrtFnt.$inject=['$scope','$log', 'comm', 'factory', '$window'];

function playerCrtFnt($scope, $log, comm, factory, $window){

	var socket = comm.io.socketConnection($scope, factory.generateUUID());

	$scope.play = function() {
		//select first slide by default
		console.log('command sent : START');
		setCurrentSlide(0);
		comm.io.emitStart(socket, $scope.currentPresentation.id);
	};
	$scope.pause = function() {
		console.log('command sent : PAUSE');
		comm.io.emitPause(socket);
	};


	$scope.begin = function() {
		console.log('command sent : BEGIN');
		var index = getCurrentSlideIndex();
		var newIndex = index <= 0 ? 0 : (index - 1);
		setCurrentSlide(0);
		comm.io.emitBegin(socket);
	};
	$scope.forward = function() {
		console.log('command sent : NEXT');
		var index = getCurrentSlideIndex();
		var endIdx = $scope.currentPresentation.slidArray.length - 1;
		var newIndex = index >= endIdx ? endIdx : (index + 1);
		setCurrentSlide(newIndex);
		comm.io.emitNext(socket);
	};
	$scope.backward = function() {
		console.log('command sent : PREV');
		var index = getCurrentSlideIndex();
		var newIndex = index <= 0 ? 0 : (index - 1);
		setCurrentSlide(newIndex);
		comm.io.emitPrev(socket);
	};
	$scope.end = function() {
		console.log('command sent : END');
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
