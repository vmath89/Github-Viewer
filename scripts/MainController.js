(function(){
	var app = angular.module('githubViewer');
	app.controller('MainController',['$interval','$location', function($interval,$location){
		console.log("MainController");
		var user = this;
		user.countdown = 5;
		user.username = "angular";
		console.log("MainController");

		var decrementCountdown = function(){
			user.countdown -= 1;
			if(user.countdown < 1){
				user.search(user.username);
			}
		};
		var countDownInterval = null;
		var startCountdown = function(){
			countDownInterval = $interval(decrementCountdown, 1000, user.countdown);
		};
		
		user.search = function(username){

				if(countDownInterval){
					$interval.cancel(countDownInterval);
					user.countdown = null;
				}	
				console.log("here");	
				$location.path("/user/" + username);

			}		
		startCountdown();	

	//$http.get("https://api.github.com/users/vmath89").then(onUserComplete, errorCallBack);
}]);
})();