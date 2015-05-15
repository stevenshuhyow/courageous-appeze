'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('antiSocialite',
	['ionic',
	'ui.router',
	'config',
 	'LocalStorageModule',
	'antiSocialite.controllers',
	'antiSocialite.services'])


	.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
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

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('loading', {
				url: '/loading',
				templateUrl: 'templates/loading.html'
			})

			.state('list', {
				url: '/list',
				templateUrl: 'templates/list.html',
				controller: 'List',
				authenticate: true
			})

			.state('intro', {
				url: '/intro',
				templateUrl: 'templates/intro.html',
				controller: 'IntroCtrl'
			})
			.state('login', {
				templateUrl: 'templates/login.html',
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
				authenticate: true
				//data:{
				//	requireLogin: t`rue
				//}
				//resolve: {
				//	authenticated: authenticated
				//}
			})
			.state('queue.messages', {
				url: '',
				templateUrl: 'templates/messages.html',
				controller: 'QueueCtrl',
				authenticate: true
				//resolve: {
				//	authenticated: authenticated
				//}
			})
			.state('addMessage', {
				url: '/messages/:id',
				templateUrl: 'templates/message.html',
				controller: 'MessageCtrl',
				authenticate: true
			})
			.state('contacts', {
				templateUrl: 'templates/contacts.html',
				url: '/contacts',
				controller: 'ContactsCtrl',
				authenticate: true
			})
			.state('signup', {
				templateUrl: 'templates/signup.html',
				controller: 'Signup'
			})
			.state('addContact', {
				templateUrl: 'templates/addContact.html',
				controller: 'AddContact',
				authenticate: true
			})
			.state('contactList', {
				templateUrl: 'templates/contactList.html',
				controller: 'ContactsCtrl',
				authenticate:true
			});




		localStorageServiceProvider
			.setPrefix('lon');


	}])

	.run(['$ionicPlatform', '$rootScope', 'localStorageService', '$location', '$timeout', '$state', function($ionicPlatform, $rootScope, localStorageService, $location, $timeout, $state) {
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





		//console.log("in .run");
		$ionicPlatform.ready(function() {
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

			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
				//alert(localStorageService);
				//console.log(localStorage.getItem("courageousTrapeze") );
				//console.log(localStorageService.get("courageousTrapeze") );
				//alert('in state change success');
				if (localStorageService && !localStorageService.get("courageousTrapeze")) {
					//$state.go('login');
					//alert("inside token check");
					//location.href = '#/login';
					$state.go('login');
					//$location.path('/login');
				}


			});

			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState) {
					//alert('in state change start');
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

			if(localStorageService){

			skipIntro = localStorageService.get('skip') === 'true' ? true : false;
			var token = localStorageService.get('courageousTrapeze');
				if ($location.$$url === '/loading') {
					$timeout(function() {
						if (skipIntro) {
							location.href = '#/queue/messages';
						} else {
							if(token){
								location.href = '#/login';
							}else{
								location.href = '#/intro';

							}
						}
					}, 1000);
				}
			}

		});

	}]);
