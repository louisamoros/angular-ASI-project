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

	
	function authAsk(login,pwd){ 

		var deferred = $q.defer(); 

		/*setInterval(function(login,pwd){

			var response = {};

			if(login in userMap && userMap[login][0]==pwd){ 
				response['login'] = login;
				response['validAuth'] = true;
				response['role'] = userMap[login][1];
				deferred.resolve(response);
            }else{
                 deferred.reject();
			}

			clearInterval(this); 

		},3000,login,pwd);*/

		$http.post('http://localhost:5000/',{'login':login,'pwd':pwd}).
			success(function(data, status, headers, config) { 
				console.log('good jooooooooooooooooob');
			}).
			error(function(data, status, headers, config) {
				console.log('bad joooooooooooooooob');
			});

        return deferred.promise;
    }

	return fncContainer; 
}