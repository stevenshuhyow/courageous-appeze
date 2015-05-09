'use strict';
angular.module('antiSocialite.controllers', [])

	.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, localStorageService) {

		$scope.startApp = function() {
			localStorageService.set('skip', true);
			$state.go('queue');
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
	})

	//.controller('LoginCtrl', function($scope, $http, $state, AuthenticationService) {
	//	$scope.message = '';
	//
	//	$scope.user = {
	//		username: null,
	//		password: null
	//	};
	//
	//	$scope.login = function() {
	//		AuthenticationService.login($scope.user);
	//	};
	//
	//	$scope.$on('event:auth-loginRequired', function(e, rejection) {
	//		console.log('handling login required');
	//		$scope.loginModal.show();
	//	});
	//
	//	$scope.$on('event:auth-loginConfirmed', function() {
	//		$scope.username = null;
	//		$scope.password = null;
	//		$scope.loginModal.hide();
	//	});
	//
	//	$scope.$on('event:auth-login-failed', function(e, status) {
	//		var error = 'Login failed.';
	//		if (status === 401) {
	//			error = 'Invalid Username or Password.';
	//		}
	//		$scope.message = error;
	//	});
	//
	//	$scope.$on('event:auth-logout-complete', function() {
	//		console.log('logout complete');
	//		$state.go('app.home', {}, {reload: true, inherit: false});
	//	});
	//})

	.controller('HomeCtrl', function($ionicPlatform, $scope, $state, localStorageService) {

		$scope.lonConfig = {};
		$scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		$scope.lonConfig.savedContacts = localStorageService.get('lonConfig.savedContacts') || [];

		localStorageService.bind($scope, 'lonConfig.isEnabled', $scope.lonConfig.isEnabled);
		localStorageService.bind($scope, 'lonConfig.savedContacts', $scope.lonConfig.savedContacts);

		$scope.toContacts = function() {
			$state.go('contacts');
		};

		$ionicPlatform.ready(function() {

		});

	})

	.controller('QueueCtrl', function($scope, $ionicPlatform,$ionicLoading, $state, localStorageService, Messages){
		$scope.shouldShowDelete = false;
		//$scope.listCanEdit = true;
		$scope.listCanSwipe = true;
		$scope.lonConfig = {};
		$scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		$scope.allMessages = Messages.messages();

		$scope.toContacts = function() {
			$state.go('contacts');
		};

		$scope.edit = function(item) {
			alert('Edit Item: ' + item.id);
			$state.go('queue.message');
		};
		$scope.share = function(item) {
			alert('Share Item: ' + item.id);
		};

		$scope.onItemDelete = function(item) {
			$scope.allMessages.messages.splice($scope.allMessages.messages.indexOf(item), 1);
		};

		//$ionicModal.fromTemplateUrl('templates/message.html', {
		//	scope: $scope,
		//	animation: 'slide-in-up'
		//}).then(function(modal) {
		//	$scope.modal = modal;
		//});
		//$scope.openModal = function() {
		//	$scope.modal.show();
		//};
		//$scope.closeModal = function() {
		//	$scope.modal.hide();
		//};
		////Cleanup the modal when we're done with it!
		//$scope.$on('$destroy', function() {
		//	$scope.modal.remove();
		//});
		//// Execute action on hide modal
		//$scope.$on('modal.hidden', function() {
		//	// Execute action
		//});
		//// Execute action on remove modal
		//$scope.$on('modal.removed', function() {
		//	// Execute action
		//});


		$ionicPlatform.ready(function() {

			$scope.sendAll = function () {

				//CONFIGURATION
				var options = {
					replaceLineBreaks: false, // true to replace \n by a new line, false by default
					android: {
						intent: ''  // send SMS with the native android SMS messaging
						//intent: '' // send SMS without open any other app
					}
				};

				var success = function () {
					alert('Message sent successfully');
				};
				var error = function (e) {
					alert('Message Failed:' + e);
				};
				var _u = [];

				for (var i = 0; i < $scope.allMessages.messages.length; i++) {
					_u.push($scope.allMessages.messages[i].contactPhone);
					sms.send($scope.allMessages.messages[i].contactPhone,
						$scope.allMessages.messages[i].text, options, success, error);
					//_sms($scope.allMessages.messages[i]);
				}

				if (_u.length > 0) {
					window.plugin.notification.local.add({
						autoCancel: true,
						message: 'Messages sent to : ' + _u.join(', ')
					});
				}
			};
		});
	})

	.controller('MessageCtrl', function($scope, $ionicPlatform,$ionicLoading, $state, $stateParams , localStorageService, Messages){
		//var a = $stateParams.id;
		////$scope.message = Messages.messages().messages.indexOf('id', $scope.id);
		//$scope.update = function(){

		//};
		//$ionicModal.fromTemplateUrl('templates/message.html', {
		//	scope: $scope,
		//	animation: 'slide-in-up'
		//}).then(function(modal) {
		//	$scope.modal = modal;
		//});
		//$scope.openModal = function() {
		//	$scope.modal.show();
		//};
		//$scope.closeModal = function() {
		//	$scope.modal.hide();
		//};
		////Cleanup the modal when we're done with it!
		//$scope.$on('$destroy', function() {
		//	$scope.modal.remove();
		//});
		//// Execute action on hide modal
		//$scope.$on('modal.hidden', function() {
		//	// Execute action
		//});
		//// Execute action on remove modal
		//$scope.$on('modal.removed', function() {
		//	// Execute action
		//});
		//$scope.lonConfig = {};
		//$scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		//$scope.allMessages = Messages.messages();
		//
		//$scope.toContacts = function() {
		//	$state.go('contacts');
		//};
		//
		//$scope.edit = function(item) {
		//	//alert('Edit Item: ' + item.id);
		//	$state.go('edit');
		//};


		$ionicPlatform.ready(function() {

			$scope.send = function () {

				//CONFIGURATION
				var options = {
					replaceLineBreaks: false, // true to replace \n by a new line, false by default
					android: {
						intent: ''  // send SMS with the native android SMS messaging
						//intent: '' // send SMS without open any other app
					}
				};

				var success = function () {
					alert('Message sent successfully');
				};
				var error = function (e) {
					alert('Message Failed:' + e);
				};
				var _u = [];
					sms.send($scope.allMessages.messages[i].contactPhone,
					$scope.allMessages.messages[i].text, options, success, error);

					window.plugin.notification.local.add({
						autoCancel: true,
						message: 'Messages sent to : ' + _u.join(', ')
					});

			};
		});
	})

	.controller('ContactsCtrl', function($scope, $ionicLoading, localStorageService) {

		$ionicLoading.show({
			template: 'Loading Contacts...'
		});

		var options = new ContactFindOptions();
		options.multiple = true;
		options.desiredFields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers];

		var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

		function onSuccess(contacts) {

			var _contacts = contacts.filter(function(c) {
				return (c.displayName && c.phoneNumbers);
			});

			var savedContacts = localStorageService.get('lonConfig.savedContacts');
			savedContacts = savedContacts ? savedContacts : [];

			for (var i = 0; i < _contacts.length; i++) {
				innerLoop: for (var j = 0; j < savedContacts.length; j++) {
					if (savedContacts[j].id === _contacts[i].id) {
						_contacts[i].isChecked = true;
						break innerLoop;
					} else {
						_contacts[i].isChecked = false;
					}
				}
			}

			$scope.contacts = _contacts;

			$ionicLoading.hide();
		}

		function onError(contactError) {
			$scope.error = contactError;
			//alert('onError!');
			$ionicLoading.hide();
		}

		// get the contacts
		navigator.contacts.find(fields, onSuccess, onError, options);

		$scope.handleContact = function(c) {
			var savedContacts = localStorageService.get('lonConfig.savedContacts');
			savedContacts = savedContacts ? savedContacts : [];

			if (c.isChecked) {
				// add to localStorage

				savedContacts.push({
					id: c.id,
					name: c.displayName,
					number: c.phoneNumbers[0].value
				});

				localStorageService.set('lonConfig.savedContacts', savedContacts);

			} else {
				// remove from localStorage
				savedContacts.forEach(function(k, v) {
					if (k.id === c.id) {
						savedContacts.splice(v, 1);
					}
				});

				localStorageService.set('lonConfig.savedContacts', savedContacts);
			}

			$scope.savedContacts = savedContacts;
		};


	});
