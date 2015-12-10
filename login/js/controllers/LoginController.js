'use strict';

angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log', 'auth', '$window'];

function loginCrtFnt($scope, $log, auth, $window){
	$scope.logAuth = function() {

		//authentication process
		auth.authAsk($scope.user.login, $scope.user.pwd).then(
			function(data){
				if(data.role == 'admin')
					$window.location.href = '/admin';
				else if(data.role == 'watcher')
					$window.location.href = '/watch';
				else
					$window.alert('you are registered but we dont know who you are');
			},
			function(data){
				$window.alert("ERROR");
				$window.alert(data);
			}
		);

	};

}
