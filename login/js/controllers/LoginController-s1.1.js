'use strict';

angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'auth', '$window'];

function loginCrtFnt($scope, $log, auth, $window){
	$scope.logAuth = function() {

		if($scope.user == undefined)
			$log.info('user info needed!');
		else{
			$log.info('user login', $scope.user.login);
			$log.info('user pwd', $scope.user.pwd);
		}

		//authentication process
		auth.authAsk($scope.user.login, $scope.user.pwd).then(
			function(data){
				if(data.role == 'admin')
					$window.location.href = 'admin.html';
				else if(data.role == 'watcher')
					$window.location.href = 'watcher';
				//should not happen
				else
					$window.alert('you are registered but we dont know who you are');
			},
			function(data){
				$window.alert(data);
			}
		);

	};

}
