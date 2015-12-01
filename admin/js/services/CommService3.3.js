'use strict';

angular.module('commServices', ['btford.socket-io']).service('comm',commFnc);

commFnc.$inject=['factory'];

function commFnc(factory){

	var comm = {
		loadImages: loadImages,
		loadPres: loadPres,
	};

//fake image map creation ****************************************
	var imagzMap={};
	var loulouImg = {};
	var chatImg = {};
	var goImg = {};
	loulouImg.title = 'loulou';
	loulouImg.src = '../images/loulou.jpeg';
	imagzMap[factory.generateUUID()]= loulouImg;
	chatImg.title = 'gorille';
	chatImg.src = '../images/gorille.jpg';
	imagzMap[factory.generateUUID()]= chatImg;
	goImg.title = 'chat fou';
	goImg.src = '../images/chatfou.jpg';
	imagzMap[factory.generateUUID()]= goImg;
	//***************************************************************


	function loadImages(presName,presID){
			return imagzMap;
	};

	/*function loadImages(presName,presID){
		var deferred = $q.defer(); $http.get('/resources_list').
		success(function(data, status, headers, config) {
			deferred.resolve(data); }).
			error(function(data, status, headers, config) { deferred.reject(status);
				// or server returns response with an error status.
			});
			return deferred.promise; };
			function loadPres(presName,presID){ var deferred = $q.defer(); $http.get('/loadPres').
			success(function(data, status, headers, config) { deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				deferred.reject(status);
				// or server returns response with an error status.
			});
			return deferred.promise;
		}*/

	function loadPres(presName,presID){
		// TODO
	};

	// Order for watcher clients
	comm.io = {};

	comm.io.socketConnection=function(scope,uuid){
		var socket = io.connect();
		comm.io.uuid=uuid;
		socket.on('connection', function () {
			socket.emit('data_comm',{'id':comm.io.uuid});
		});
		socket.on('newPres', function (socket) {
		});
		socket.on('slidEvent', function (socket) {
		});

		return socket;
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
		socket.emit('slidEvent', {'CMD':"NEXT"});
	}
	comm.io.emitNext=function(socket){
		socket.emit('slidEvent', {'CMD':"BEGIN"});
	}
	comm.io.emitEnd=function(socket){
		socket.emit('slidEvent', {'CMD':"END"});
	}


return comm;
};
