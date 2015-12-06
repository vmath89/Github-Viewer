(function(){

	var app = angular.module('githubViewer', ["ngRoute"]);
	app.config(function($routeProvider){

		$routeProvider
			.when("/main",{
				templateUrl: "views/main.html",
				controller: "MainController as mainCtrl"
			})
			.when("/user/:username", {
				templateUrl: "user.html",
				controller: "UserController as userCtrl"
			})
			.otherwise({redirectTo: "/main"});
	});

}());