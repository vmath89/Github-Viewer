(function(){
	var app = angular.module('githubViewer');
	console.log("UserController");
	app.controller('UserController',['github','$routeParams',  function(github, $routeParams){

		var user = this;
		user.person = [];
		user.repos = [];
		user.username = $routeParams.username;
		user.repoSortOrder = -$routeParams.stargazers_count;
		console.log("UserController");

		var onUserComplete = function( data ){
			user.person = data;
			console.log("success");
		};

		var errorCallBack = function( reason ){
			user.errorMessage = "Could not reach the server";
			console.log("error");
		};

					//	$log.info("Searching for " + username);
				//$http.get("https://api.github.com/users/" + username).success(function(data){
					github.getUser(user.username).success(function(data){

					user.person = data;
					console.log(user.person);
					//console.log(user.person.repos_url);

					//$http.get(user.person.repos_url).success(function(response){
						github.getRepos(user.person.repos_url).success(function(response){
							console.log(user.person.repos_url);
							console.log(response);
						user.repos = response;
						
					});

			});
	}]);
})();