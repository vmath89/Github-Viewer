(function (){

	var github = function($http){

		var getUser = function(username){
			return $http.get("https://api.github.com/users/" + username).success(function(response){
				console.log("hello....!!");
				return response.data;					
			});
		};

		var getRepos = function(user){
			return $http.get(user).success(function(response){
				console.log("hello again....!!");
				return response.data;					
			});
		};

		return{
			getUser: getUser,
			getRepos: getRepos

		};

	};

	var module = angular.module('githubViewer');
	module.factory('github',github);

}());