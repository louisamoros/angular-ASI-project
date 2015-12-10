'use strict';

angular.module('commServices', []).service('comm',commFnc);

commFnc.$inject=['factory', '$q', '$http'];

function commFnc(factory, $q, $http){

	var comm = {
		loadImages: loadImages,
		loadPres: loadPres,
		savePres: savePres
	};

	function loadImages(presName, presID){
		var deferred = $q.defer();
		$http.get('/api/slides').
		//$http.get('/resources_list').
			success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				deferred.reject(status);
			});
			return deferred.promise;
	};

	function loadPres(presName, presId){

		var deferred = $q.defer();
		$http.get('/api/pres/' + presId)
		.success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).
		error(function(data, status, headers, config) {
			deferred.reject(status);
			// or server returns response with an error status.
		});
		return deferred.promise;
	}

	function savePres(presentation){
		var deferred = $q.defer();
		$http.post('/api/pres', presentation).
			success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				deferred.reject(status);
			});
			return deferred.promise;
	};

	// Order for watcher clients
	comm.io = {};

	comm.io.socketConnection=function(scope,uuid){
		var socket = io.connect();
		comm.io.uuid=uuid;
		socket.on('connection', function (data) {
			socket.emit('data_comm',{'id':comm.io.uuid});
			console.log('socket connection established, server said : ' + data.connection);
		});
		socket.on('newPres', function (socket) {
		});
		socket.on('slidEvent', function (data) {
		});

		return socket;
	}

	comm.io.emitNext=function(socket){
		socket.emit('slidEvent', {'CMD':"NEXT"});
	}
	comm.io.emitPrev=function(socket){
		socket.emit('slidEvent', {'CMD':"PREV"});
	}
	comm.io.emitStart=function(socket,presUUID){
		socket.emit('slidEvent', {'CMD':"START",'PRES_ID':presUUID});
	}
	comm.io.emitPause=function(socket){
		socket.emit('slidEvent', {'CMD':"PAUSE"});
	}
	comm.io.emitBegin=function(socket){
		socket.emit('slidEvent', {'CMD':"BEGIN"});
	}
	comm.io.emitEnd=function(socket){
		socket.emit('slidEvent', {'CMD':"END"});
	}


return comm;
};
