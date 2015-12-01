'use strict';

angular.module('adminApp').controller('playerCtrl',playerCrtFnt);

playerCrtFnt.$inject=['$scope','$log', 'comm', 'factory', '$window'];

function playerCrtFnt($scope, $log, comm, factory, $window){

	var socket = comm.io.socketConnection($scope, factory.generateUUID());

	$scope.play = function() {
		comm.io.emitStart(socket);
	};
	$scope.pause = function() {
		comm.io.emitPause(socket);
	};
	$scope.forward = function() {
		comm.io.emitNext(socket);
	};
	$scope.backward = function() {
		comm.io.emitPrev(socket);
	};
	$scope.begin = function() {
		comm.io.emitBegin(socket);
	};
	$scope.end = function() {
		comm.io.emitEnd(socket);
	};

}
