'use strict';

angular.module('commServices', []).service('comm',commFnc);

commFnc.$inject=['$q', '$http'];

function commFnc($q, $http){

	var comm = {
		loadImages: loadImages,
		loadPres: loadPres
	};

	function loadImages(presName,presID){
		var deferred = $q.defer();
		$http.get('/resources_list').
		success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).
		error(function(data, status, headers, config) {
			deferred.reject(status);
		});
		return deferred.promise;
	};

	function loadPres(presName,presID){

		var deferred = $q.defer();
		$http.get('/api/presId/' + presID)
		.success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).
		error(function(data, status, headers, config) {
			deferred.reject(status);
			// or server returns response with an error status.
		});
		return deferred.promise;
	}

	// Order for watcher clients
	comm.io = {};

	comm.io.socketConnection=function(scope,uuid){
		var socket = io.connect();
		comm.io.uuid=uuid;
		return socket;
	}


	return comm;
};
