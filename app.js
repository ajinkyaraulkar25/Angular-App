	var myApp = angular.module('myApp', ['ngRoute']);


	myApp.config(function($routeProvider) {
	  $routeProvider


	    .when('/', {
	    templateUrl: 'home.html',
	    controller: 'mainController'
	  })


	  .when('/about', {
	    templateUrl: 'about.html',
	    controller: 'aboutController'
	  })


	  .when('/contact', {
	    templateUrl: 'contact.html',
	    controller: 'contactController'
	  })

	  .when('/login', {
	    templateUrl: 'login.html',
	    controller: 'loginController'
	  });
	});


	myApp.controller('mainController', function($scope) {
	  $scope.message = 'Welcome to the Home Page!';
	});

	myApp.controller('aboutController', function($scope) {
	  $scope.message = 'This is a simple angular application';
	});

	myApp.controller('contactController', function() {});

	myApp.factory('AuthenticationService', function() {
        
      var myMap = new Map();
      myMap.set("test@test.com","test");
      myMap.set("test1@test.com","test1");
      myMap.set("test2@test.com","test2");    
	  var service = {};

	  service.Login = function(email, password, callback) {
	    var response = {
	      success: password === myMap.get(email)
	    };
	    if (!response.success) {
	      response.message = 'Username or password is incorrect';
	    }
	    callback(response);
	  }
	  return service;
	});

	myApp.controller('loginController', function($scope, AuthenticationService) {
	  $scope.login = function() {

	    AuthenticationService.Login($scope.user.email, $scope.user.password, function(response) {
	      if (response.success) {
            $scope.error = false;  
	        $scope.success = "Logged In !!";
	      } else {
            $scope.success = false;  
	        $scope.error = response.message;
	      }
	    });
	  };
	});