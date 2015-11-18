'use strict';

angular.module('commServices', []).service('comm',commFnc);

commFnc.$inject=['factory'];

function commFnc(factory){

	var comm = {
		loadImages: loadImages,
		loadPres: loadPres,
	};

	var contentMap={};
	contentMap[factory.generateUUID()]= '../images/loulou.jpeg';
	contentMap[factory.generateUUID()]= '../images/chatfou.jpg' ;
	contentMap[factory.generateUUID()]= '../images/gorille.jpg' ;


	function loadImages(presName,presID){

		setInterval(function(){
			clearInterval(this);
		},3000);

			return contentMap;
	};

	function loadPres(presName,presID){
		// TODO
	};


return comm;
};
