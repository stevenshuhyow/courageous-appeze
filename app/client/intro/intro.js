"use strict";
angular.module('starter.intro', [])



.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, localStorageService) {
//When the user clicks on Navigate to App or Skip Intro, we set  skip property to true. This way, we do not show the intro screen next time
		$scope.startApp = function() {
			localStorageService.set('skip', true);
			$state.go('home');
		};
		$scope.next = function() {
			$ionicSlideBoxDelegate.next();
		};
		$scope.previous = function() {
			$ionicSlideBoxDelegate.previous();
		};

		$scope.slideChanged = function(index) {
			$scope.slideIndex = index;
		};
	});