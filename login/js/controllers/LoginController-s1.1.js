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
			function(response){
				if(response.role == 'admin')
					$window.location.href = 'http://www.google.com';
				else if(response.role == 'watcher')
					$window.location.href = 'https://www.facebook.com/';
			},
			function(){
				$window.alert('authentication failed');
			}
		);
	
	}; 

}