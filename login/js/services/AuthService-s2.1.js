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

		$http.post('http://localhost:5000/',{'login':login,'pwd':pwd}).
			success(function(data, status, headers, config) { 
				//user successfully logged
				console.log('good jooooooooooooooooob');
				console.log(data);

				//go to welcome admin/watcher
				if(data.role == 'admin')
				{
					//got to welcome admin
				}
				else if(data.role == 'watcher')
				{
					//got to welcome watcher
				}
				else{
					//go nowhere
				}

				deferred.resolve(data);

			}).
			error(function(data, status, headers, config) {
				//unknown user ...
				console.log('bad joooooooooooooooob');
				console.log(data);

				deferred.reject(data);
			});

        return deferred.promise;
    }

	return fncContainer; 
}