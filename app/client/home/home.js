"use strict";
angular.module('starter.home', [])

	.controller('HomeCtrl', function($ionicPlatform, $scope, $state, localStorageService) {
		$scope.lonConfig = {};
		$scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		$scope.lonConfig.savedContacts = localStorageService.get('lonConfig.savedContacts') || [];
		$scope.lonConfig.threshold = parseInt(localStorageService.get('lonConfig.threshold')) || 15;
		$scope.lonConfig.message = localStorageService.get('lonConfig.message');

		if ($scope.lonConfig.message === null || $scope.lonConfig.message === 'null') {
			$scope.lonConfig.message = 'My Battery is Dying.. TTYL.';
		}
//We register watch on the config options and ask the  localStorageService to update the local storage when there are changes to these values.
		localStorageService.bind($scope, 'lonConfig.isEnabled', $scope.lonConfig.isEnabled);
		localStorageService.bind($scope, 'lonConfig.threshold', $scope.lonConfig.threshold);
		localStorageService.bind($scope, 'lonConfig.message', $scope.lonConfig.message);
		localStorageService.bind($scope, 'lonConfig.savedContacts', $scope.lonConfig.savedContacts);

		$scope.toContacts = function() {
			$state.go('contacts');
		};

		$ionicPlatform.ready(function() {
			$scope.onBatteryStatus = function(info) {

				$scope.lonConfig.level = info.level;
				$scope.lonConfig.isPlugged = info.isPlugged;

				if (info.isPlugged) {
					localStorageService.set('lonConfig.lastSentBattery', null);
				}

				if ($scope.lonConfig.isEnabled && !info.isPlugged && info.level <= parseInt(localStorageService.get('lonConfig.threshold'))) {
					$scope.sendSMS(info);

				}

				$scope.$apply();

			};

			window.addEventListener('batterystatus', $scope.onBatteryStatus, false);


			$scope.sendSMS = function(info) {

				var lastSentBattery = localStorageService.get('lonConfig.lastSentBattery');

				lastSentBattery = lastSentBattery === 'null' ? null : lastSentBattery;

				function _sms(number) {
					var msg = localStorageService.get('lonConfig.message');

					var message = msg !== 'null' ? msg : 'My Battery is Dying.. TTYL.';
					var intent = ''; //leave empty for sending sms using default intent
					var success = function() {
						//alert('Message sent successfully');
					};
					var error = function() {
						//alert('Message Failed:' + e);
					};
					sms.send(number, message, intent, success, error);
				}

				if ((lastSentBattery === null) || parseInt(lastSentBattery) < info.level) {
					var savedContacts = localStorageService.get('lonConfig.savedContacts');
					savedContacts = savedContacts ? savedContacts : [];
					var _u = [];

					for (var i = 0; i < savedContacts.length; i++) {
						_u.push(savedContacts[i].name);
						_sms(savedContacts[i].number);
					}

					if (_u.length > 0) {
						window.plugin.notification.local.add({
							autoCancel: true,
							message: 'Battery Notification Message sent to : ' + _u.join(', ')
						});
					}
					localStorageService.set('lonConfig.lastSentBattery', info.level);
				}
			};
		});

	});
