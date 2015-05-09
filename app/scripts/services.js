'use strict';
angular.module('antiSocialite.services', [])

	.factory('Auth', function ($http, $location, $window) {
		// Don't touch this Auth service!!!
		// it is responsible for authenticating our user
		// by exchanging the user's username and password
		// for a JWT from the server
		// that JWT is then stored in localStorage as 'com.shortly'
		// after you signin/signup open devtools, click resources,
		// then localStorage and you'll see your token from the server
		var signin = function (user) {
			return $http({
				method: 'POST',
				url: '/api/users/signin',
				data: user
			})
				.then(function (resp) {
					return resp.data.token;
				});
		};

		var signup = function (user) {
			return $http({
				method: 'POST',
				url: '/api/users/signup',
				data: user
			})
				.then(function (resp) {
					return resp.data.token;
				});
		};

		var isAuth = function () {
			return !!$window.localStorage.getItem('com.shortly');
		};

		var signout = function () {
			$window.localStorage.removeItem('com.shortly');
			$location.path('/signin');
		};


		return {
			signin: signin,
			signup: signup,
			isAuth: isAuth,
			signout: signout
		};


	})


//.factory('AuthenticationService', function($rootScope, $http, authService, localStorageService) {
//	var service = {
//		login: function(user) {
//			$http.post('https://login', { user: user }, { ignoreAuthModule: true })
//				.success(function (data, status, headers, config) {
//
//					$http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
//
//					// Need to inform the http-auth-interceptor that
//					// the user has logged in successfully.  To do this, we pass in a function that
//					// will configure the request headers with the authorization token so
//					// previously failed requests(aka with status == 401) will be resent with the
//					// authorization token placed in the header
//					authService.loginConfirmed(data, function(config) {  // Step 2 & 3
//						config.headers.Authorization = data.authorizationToken;
//						localStorageService.set('authorizationToken', data.authorizationToken);
//						return config;
//					});
//				})
//				.error(function (data, status, headers, config) {
//					$rootScope.$broadcast('event:auth-login-failed', status);
//				});
//		},
//		logout: function(user) {
//			$http.post('https://logout', {}, { ignoreAuthModule: true })
//				.finally(function(data) {
//					localStorageService.remove('authorizationToken');
//					delete $http.defaults.headers.common.Authorization;
//					$rootScope.$broadcast('event:auth-logout-complete');
//				});
//		},
//		loginCancelled: function() {
//			authService.loginCancelled();
//		}
//	};
//	return service;
//})

	.factory('Messages', function ($http) {

		var getMessage = function () {
			//$http.get();
			var data = {
				userId: 'jmyeg',
				messages:[{
					id:1,
					contactId:'2',
					contactPhone:'8046831201',
					text: 'im not a robot, im just antisocialite!',
					date:'2015-05-01'
				},{
					id:2,
					contactId:'3',
					contactPhone:'9254870772',
					text: 'im not a robot, im just an antisocialite!',
					date:'2015-05-01'
				},{
					id:3,
					contactId:'2',
					contactPhone:'8046831652',
					text: 'im not a robot, im just antisocialite!',
					date:'2015-05-01'
				}
				]
			};
			return data;
		};

		return {
			messages: getMessage
		};


	});