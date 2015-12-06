(function(){
	var app = angular.module('app');
	app.controller('MainController',['$interval', '$log','$anchorScroll','$location', 'github',  function($interval,$log,$anchorScroll,$location,github){

		this.message = "Github Viewer"
		var user = this;
		user.person = [];
		user.repos = [];
		user.repoSortOrder = "-stargazers_count";
		user.countdown = 5;
		user.username = "angular";


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
		var onUserComplete = function( data ){
			user.person = data;
			console.log("success");
		};

		var errorCallBack = function( reason ){
			user.errorMessage = "Could not reach the server";
			console.log("error");
		};

		user.search = function(username){

				$log.info("Searching for " + username);
				//$http.get("https://api.github.com/users/" + username).success(function(data){
					github.getUser(username).success(function(data){

					user.person = data;
					console.log(user.person.repos_url);

					//$http.get(user.person.repos_url).success(function(response){
						github.getRepos(user.person.repos_url).success(function(response){
							console.log(user.person.repos_url);
							console.log(response);
						user.repos = response;
						$location.hash('userDetails');
						$anchorScroll();
					});

				if(countDownInterval){
					$interval.cancel(countDownInterval);
					user.countdown = null;
				}	
					
				});
		}

		
		startCountdown();	

	//$http.get("https://api.github.com/users/vmath89").then(onUserComplete, errorCallBack);
}]);
})();