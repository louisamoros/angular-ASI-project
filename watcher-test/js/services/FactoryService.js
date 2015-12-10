'use strict';

angular.module('factoryServices', []).factory('factory',factoryFnc);

function factoryFnc(){
	var factory = {
		generateUUID: generateUUID,
		mapToArray: mapToArray
	};

// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function generateUUID(){

	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};

function mapToArray(map){
	var contentArray=[];
	var key;
	for(key in map){
		contentArray.push(map[key]);
	}
	return contentArray;
};

return factory;
};
