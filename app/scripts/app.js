'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('antiSocialite',
	['ionic',
	'config',
 	'LocalStorageModule',
	'antiSocialite.controllers',
	'antiSocialite.services'])


	.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
		//var authenticated = ['$q', 'AuthFactory', function ($q, AuthFactory) {
		//	var deferred = $q.defer();
		//	AuthFactory.isLoggedIn(true)
		//		.then(function (isLoggedIn) {
		//			if (isLoggedIn) {
		//				deferred.resolve();
		//			} else {
		//				console.log("wtf");
		//				deferred.reject('Not logged in');
		//			}
		//		});
		//	return deferred.promise;
		//}];

		$stateProvider
			.state('loading', {
				url: '/loading',
				templateUrl: 'templates/loading.html'
			})

			.state('intro', {
				url: '/intro',
				templateUrl: 'templates/intro.html',
				controller: 'IntroCtrl'
			})
			.state('login', {
				templateUrl: '/templates/login.html',
				url: '/login',
				controller: 'LoginCtrl'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			})

			.state('queue', {
				url: '/queue',
				templateUrl: 'templates/queue.html',
				abstract: true,
				//data:{
				//	requireLogin: true
				//}
				//resolve: {
				//	authenticated: authenticated
				//}
			})
			.state('queue.messages', {
				url: '',
				templateUrl: 'templates/messages.html',
				controller: 'QueueCtrl',
				//resolve: {
				//	authenticated: authenticated
				//}
			})
			.state('queue.message', {
				url: '/messages/:id',
				templateUrl: 'templates/message.html',
				controller: 'MessageCtrl'
			})

			.state('contacts', {
				url: '/contacts',
				templateUrl: 'templates/contacts.html',
				controller: 'ContactsCtrl'
			});

		$urlRouterProvider.otherwise('/loading');



		localStorageServiceProvider
			.setPrefix('lon');


	})

	.run(function($ionicPlatform, $rootScope, localStorageService, $location, $timeout, $state) {
		//var authenticated = ['$q', 'Auth', function ($q, Auth) {
		//	var deferred = $q.defer();
		//	Auth.isLoggedIn(false)
		//		.then(function (isLoggedIn) {
		//			if (isLoggedIn) {
		//				deferred.resolve();
		//			} else {
		//				deferred.reject('Not logged in');
		//			}
		//		});
		//	return deferred.promise;
		//}];



		//$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
		//
		//	//console.log(localStorage.getItem("courageousTrapeze") );
		//	//console.log(localStorageService.get("courageousTrapeze") );
		//	if (!localStorageService.get("courageousTrapeze")) {
		//		$state.go('login');
		//		//alert(1)
		//	}
		//
		//
		//});

		//console.log("in .run");
		$ionicPlatform.ready(function() {
		console.log("in ionic platform ready");
				if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			var myService = cordova.require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService');

			myService.startService(function() { //r
					// service started
				},
				function(e) {
					alert('Error: ' + e.ErrorMessage);
				});

			var skipIntro;



			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState) {
					//if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
					//	$location.path('/');
					//}
					//var requireLogin = toState.data.requireLogin;
					//
					//if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
					//	event.preventDefault();
					//
					//	loginModal()
					//		.then(function () {
					//			return $state.go(toState.name, toParams);
					//		})
					//		.catch(function () {
					//			return $state.go('welcome');
					//		});
					//}

					//$state.go('login');
					//console.log('test');
					//if(!localStorage.getItem("courageousTrapeze")){
						//loginModal()
						//		.then(function () {
						//			return $state.go(toState.name, toParams);
						//		})
						//		.catch(function () {
						//			return $state.go('welcome');
						//		});
					//}

					skipIntro = localStorageService.get('skip') === 'true' ? true : false;

					if (fromState.name === 'home' && toState.name === 'intro') {
						if (skipIntro) {
							navigator.app.exitApp();
						}
					}
					if (fromState.name === 'intro' && toState.name === 'loading') {
						navigator.app.exitApp();
					}
					if (fromState.name === 'home' && toState.name === 'loading') {
						navigator.app.exitApp();
					}
					if (fromState.name === 'queue' && toState.name === 'loading') {
						navigator.app.exitApp();
					}
					if (toState.name === 'intro') {
						if (skipIntro) {
							location.href = '#/queue/messages';
						}
					}
				});

			skipIntro = localStorageService.get('skip') === 'true' ? true : false;

			if ($location.$$url === '/loading') {
				$timeout(function() {
					if (skipIntro) {
						location.href = '#/queue/messages';
					} else {
						location.href = '#/intro';
					}
				}, 1000);
			}

		});

	});
