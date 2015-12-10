'use strict';

angular.module('authService', []).service('auth',authFnc);

authFnc.$inject=['$http', '$q'];

function authFnc($http, $q) {

	//key is the login, value is a table with respectivelly pwd and role
	var userMap={};
	userMap['jdoe']=['jdoepwd', 'admin'];
	userMap['psmith']=['psmithpwd', 'watcher'];
	userMap['tp']=['tp', 'watcher'];

	var fncContainer={
		authAsk:authAsk
	};


	function authAsk(login,pwd) {
		var deferred = $q.defer();

		$http.post('//localhost:5000/connect',{'login':login,'pwd':pwd}).
			success(function(data, status, headers, config) {
				console.log('LOGIN SUCCESS');
				console.log(data);
				deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				console.log('LOGIN FAILED');
				console.log(data);
				deferred.reject(data);
			});
			return deferred.promise;
    }
		return fncContainer;
}
