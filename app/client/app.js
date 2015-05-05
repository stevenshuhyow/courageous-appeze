// Ionic Starter App
"use strict";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers'])
//
//.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
//    if (window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if (window.StatusBar) {
//      // org.apache.cordova.statusbar required
//      StatusBar.styleDefault();
//    }
//  });
//})
angular.module('starter', [
	'ionic',
	"ngCordova",
	'config',
	'LocalStorageModule',

	'starter.services',
	/*
	 * Feature Areas
	 */
	'starter.intro',
	'starter.home',
	'starter.auth',
	'starter.contacts'])

	.run(function($ionicPlatform, $rootScope, localStorageService, $location, $timeout) {
		$ionicPlatform.ready(function() {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			var skipIntro;

			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState) {
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
					if (toState.name === 'intro') {
						if (skipIntro) {
							location.href = '#/home';
						}
					}
				});

			skipIntro = localStorageService.get('skip') === 'true' ? true : false;

			if ($location.$$url === '/loading') {
				$timeout(function() {
					if (skipIntro) {
						location.href = '#/home';
					} else {
						location.href = '#/intro';
					}
				}, 2000);
			}

		});
	})

.config(function($stateProvider, $urlRouterProvider , localStorageServiceProvider) {
  $stateProvider

  //.state('app', {
  //  url: "/app",
  //  abstract: true,
  //  templateUrl: "templates/menu.html",
  //  controller: 'AppCtrl'
  //})
			.state('loading', {
				url: '/loading',
				templateUrl: '/client/loading.html'
			})

			.state('intro', {
				url: '/intro',
				templateUrl: '/client/intro/intro.html',
				controller: 'IntroCtrl'
			})

			.state('home', {
				url: '/home',
				templateUrl: '/client/home/home.html',
				controller: 'HomeCtrl'
			})

			.state('contacts', {
				url: '/contacts',
				templateUrl: '/client/contacts/contacts.html',
				controller: 'ContactsCtrl'
			});

  	// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/loading');

		localStorageServiceProvider
			.setPrefix('lon');

});
