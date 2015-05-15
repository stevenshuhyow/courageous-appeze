'use strict';
angular.module('antiSocialite.controllers', [])

	.controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate, localStorageService) {
//
		$scope.startApp = function () {
			//if (localStorageService && !localStorageService.get("courageousTrapeze")) {
			//	//$state.go('login');
			//	alert("inside startApp ctrl");
			//	//location.href = '#/login';
			//	$state.go('login');
			//	//$location.path('/login');
			//}else{
				localStorageService.set('skip', false);
				$state.go('queue.messages');
			//}
		};
		$scope.next = function () {
			$ionicSlideBoxDelegate.next();
		};
		$scope.previous = function () {
			$ionicSlideBoxDelegate.previous();
		};

		$scope.slideChanged = function (index) {
			$scope.slideIndex = index;
		};
	})

	.controller('Signup', function($ionicPlatform, $scope, $http, $state, localStorageService) {

		$scope.user= {};

		$scope.signup = function (user) {
    	$http.post("http://a811eaa4.ngrok.io/api/users/signup", $scope.user)
    	.success(function(data){
				//alert("inside Login Ctrl" + data);
				var token = data.token;
				//$scope.lonConfig.token = token;
				//localStorageService.set('lon.courageousTrapeze', token);
				localStorageService.bind($scope, 'courageousTrapeze', token);
				localStorageService.set('courageousTrapeze', token);
				$http.defaults.headers.common['x-access-token'] = token;
				$state.go("list");
    	})
    	.error(function(err){
    		$scoope.message = err;
    	})
  	};

	})

	.controller('LoginCtrl', function($ionicPlatform, $scope, $http, $state, localStorageService) {
		//alert('inside Login ctrl');
		$scope.message = '';
		$scope.user = {};
		//$scope.lonConfig.token = '';
		$scope.login = function () {
			$http.post('http://a811eaa4.ngrok.io/api/users/signin', $scope.user)
			.success(function(data) {
				//alert("inside Login Ctrl" + data);
				var token = data.token;
				//$scope.lonConfig.token = token;
				//localStorageService.set('lon.courageousTrapeze', token);
				localStorageService.bind($scope, 'courageousTrapeze', token);
				localStorageService.set('courageousTrapeze', token);
				$http.defaults.headers.common['x-access-token'] = token;
				$state.go("list");
			})
				.error(function(err){
					$scope.message = err;
					//$state.go("intro");
				})
		}

		$scope.signup = function(){
			$state.go('signup')
		}

	})

	.controller('List', function($ionicPlatform, $scope, $http, $state, localStorageService) {

		$scope.addMessage = function(){
			$state.go('addMessage');
		}

		$scope.contacts = function(){
			$state.go('contacts');
		}

		$scope.allMessages = function(){
			$state.go('queue.messages');
		}
		$scope.logout = function(){
			localStorageService.remove('courageousTrapeze');
			$state.go('login');
		}
	})
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

	//app.controller('LoginModalCtrl', function ($scope, UsersApi) {
	//
	//	this.cancel = $scope.$dismiss;
	//
	//	this.submit = function (email, password) {
	//		UsersApi.login(email, password).then(function (user) {
	//			$scope.$close(user);
	//		});
	//	};
	//
	//})
	//.controller('AuthController', function ($ionicPlatform, $scope, $window, $location, Auth) {
	//	$scope.user = {};
	//
	//	$scope.signin = function () {
	//		Auth.signin($scope.user)
	//			.then(function (token) {
	//				$window.localStorage.setItem('com.shortly', token);
	//				$location.path('/messages');
	//			})
	//			.catch(function (error) {
	//				console.error(error);
	//			});
	//	};
	//
	//	$scope.signup = function () {
	//		Auth.signup($scope.user)
	//			.then(function (token) {
	//				$window.localStorage.setItem('com.shortly', token);
	//				$location.path('/links');
	//			})
	//			.catch(function (error) {
	//				console.error(error);
	//			});
	//	};
	//})

	.controller('HomeCtrl', function ($ionicPlatform, $scope, $state, localStorageService) {

		$scope.lonConfig = {};
		$scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		$scope.lonConfig.savedContacts = localStorageService.get('lonConfig.savedContacts') || [];

		//localStorageService.set('lonConfig.isEnabled', $scope.lonConfig.isEnabled);
		localStorageService.bind($scope, 'lonConfig.isEnabled', $scope.lonConfig.isEnabled);
		localStorageService.bind($scope, 'lonConfig.savedContacts', $scope.lonConfig.savedContacts);

		$scope.toContacts = function () {
			$state.go('contacts');
		};

		$ionicPlatform.ready(function () {

		});

	})

	.controller('QueueCtrl', function ($scope, $ionicPlatform, $ionicLoading, $state, localStorageService, Messages, $http, Contacts) {
		// var getMessage = function () {
		// 	return $http({
		// 		method: 'GET',
		// 		url: 'http://a811eaa4.ngrok.io/api/messages'
		// 	})
		// 		.then(function(response) {
		// 			//alert(JSON.stringify(response.data));
		// 			$scope.allMessages = response.data;
		// 			return response.data;
		// 		});
		// };

		// var updateMessage = function(message){
		// 	$http({
		// 		method: 'POST',
		// 		url: 'https://localhost:3000/api/messages',
		// 		data: message
		// 	});
		// };

		// var deleteMessage = function(message){
		// 	//data.messages.splice(data.messages.indexOf(message),1);
		// 	$http({
		// 		method: 'DELETE',
		// 		url: 'https://localhost:3000o/api/messages',
		// 		data: message.id
		// 	});
		// };



		// $scope.shouldShowDelete = false;
		// //$scope.listCanEdit = true;
		// $scope.listCanSwipe = true;
		// $scope.lonConfig = {};
		// $scope.lonConfig.isEnabled = localStorageService.get('lonConfig.isEnabled') === 'true' ? true : false;
		//
		$scope.removeMessage = function(message){
			console.log("trying to remove message", message)
	  	Messages.removeMessage(message)
	  	.then(function(response){
	  		Messages.getMessages()
	  		console.log('Deleted the message:',response);
	  		// $route.reload();
        return
	  	})
	  	.catch(function(err){
	  		console.error("unable to delete message", err)
	  	})
	  };



		Messages.getMessages()
		.then(function(response){
			$scope.allMessages = response.data;
			console.log("response", response.data)
			return response.data;
		})
		.catch(function(err){
			console.error("cannot get all messages", err)
		})


			Contacts.getAllContacts()
			.then(function(response) {
				$scope.contacts = response.data
				return response.data;
			})
			.catch(function(err){
				console.error("cannot get all contacts", err)
			});

		// $scope.config = function () {
		// 	$state.go('List');
		// };

		// $scope.edit = function (item) {
		// 	$state.go('queue.message', {id: item.id});
		// };


		// $scope.onItemDelete = function (item) {
		// 	$scope.allMessages.messages.splice($scope.allMessages.messages.indexOf(item), 1);
		// };


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


		$ionicPlatform.ready(function () {

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
					//alert('Message sent successfully');
				};
				var error = function (e) {
					alert('Message Failed:' + e);
				};
				// var _u = [];

				// for (var i = 0; i < $scope.allMessages.length; i++) {
				// 	_u.push($scope.allMessages[i].contactId.name);
				// 	sms.send($scope.allMessages[i].contactId.phone,
				// 		$scope.allMessages[i].text, options, success, error);
				// 	//_sms($scope.allMessages.messages[i]);
				// }

				// if (_u.length > 0) {
				// 	window.plugin.notification.local.add({
				// 		autoCancel: true,
				// 		message: 'Messages sent to : ' + _u.join(', ')
				// 	});
				// }
			};
		});
	})

	.controller('MessageCtrl', function ($scope, $ionicPlatform, $ionicLoading, $state, $stateParams, localStorageService, Messages, Contacts, $http) {

		    // Messages.addMessage(message)
      // .success(function () {
      //   $scope.message.contactId = '';
      //   $scope.message.text = '';
      //   $scope.message.date = '';
      //   $scope.loading = false;
      //   $scope.contact = '';
      //   $scope.notification = 'Good work, your message is scheduled!';
      // })
      // .error(function () {
      //   $scope.loading = false;
      // });
    $scope.contactList = function(){
    	console.log("inside of contactList")
    	$state.go('contactList');
    }

  //   function ContentController($scope, $ionicSideMenuDelegate) {
  // 		$scope.toggleLeft = function() {
  //   	$ionicSideMenuDelegate.toggleLeft();
  // 		};
		// }
		//
		//
		$scope.message = {};

		$scope.message.contactId = Contacts.recipients()[0];

		// $scope.setContact = function (contact) {
	 //    if (contact) {
	 //      $scope.message.contactId = contact._id;
	 //    } else {
	 //      $scope.message.contactId = '';
	 //    }
  // 	};

	  $scope.addMessage = function(message){
	  	// console.log(message)
	  	return Messages.addMessage(message);
	  };

		// var a = $stateParams.id;
		// Messages.messages().messages.filter(function(val){
		// 	if(val.id == $stateParams.id){
		// 		$scope.message = val;
		// 	}
		// });

		//$scope.allMessages.messages.filter(function (val) {
		//	if (val.id == $stateParams.id) {
		//		$scope.message = val;
		//	}
		//});

		// $scope.onItemDelete = function (item) {
		// 	Messages.remove(item);
		// 	$state.go('queue.messages');
		// 		//.messages.splice($scope.allMessages.messages.indexOf(item), 1);
		// };
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


		$ionicPlatform.ready(function () {

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
				sms.send($scope.message.contactPhone,
				$scope.message.text, options, success, error);

				// window.plugin.notification.local.add({
				// 	autoCancel: true,
				// 	message: 'Messages sent to : ' + _u.join(', ')
				// });

			};
		});
	})

	.controller('ContactsCtrl', function ($scope, $ionicLoading, $state, $http, localStorageService, Contacts) {

		$scope.contacts= [];

		$scope.checkedContacts = function(contact){
			return Contacts.checkedContacts(contact);
		}

		Contacts.getAllContacts()
			.then(function(response) {
				$scope.contacts = response.data
				return response.data;
			})
			.catch(function(err){
				console.error("cannot get all contacts", err)
			});

  	$scope.addContact = function(){
  		$state.go('addContact');
 		};

    // Update the selection when a checkbox is clicked.
    $scope.updateSelection = function(contact) {
    	Contacts.selectedContacts(contact);
    };

    $scope.removeContact = function(contact){
    	Contacts.removeContact(contact);
    }
		// $ionicLoading.show({
		// 	template: 'Loading Contacts...'
		// });

		// var options = new ContactFindOptions();
		// options.multiple = true;
		// options.desiredFields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers];

		// var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

		// function onSuccess(contacts) {

		// 	var _contacts = contacts.filter(function (c) {
		// 		return (c.displayName && c.phoneNumbers);
		// 	});

		// 	var savedContacts = localStorageService.get('lonConfig.savedContacts');
		// 	savedContacts = savedContacts ? savedContacts : [];

		// 	for (var i = 0; i < _contacts.length; i++) {
		// 		innerLoop: for (var j = 0; j < savedContacts.length; j++) {
		// 			if (savedContacts[j].id === _contacts[i].id) {
		// 				_contacts[i].isChecked = true;
		// 				break innerLoop;
		// 			} else {
		// 				_contacts[i].isChecked = false;
		// 			}
		// 		}
		// 	}

			// $scope.contacts = _contacts;

			$ionicLoading.hide();
		})


	.controller('AddContact', function ($scope, $ionicLoading, $http,localStorageService, $state) {


		$scope.addContact = function(contact){
			var contact = {contacts: [contact]}
    	$http.post('http://a811eaa4.ngrok.io/api/contacts', contact)
	 		return $http({
	  		method: 'POST',
	  		url: 'http://a811eaa4.ngrok.io/api/contacts'
	  		})
	  		.success(function(response){
	  			$state.go('contacts')
	  			return response.data;
	  		})
	  		.error(function(err){
	  			console.error("cannot add contact",err)
	  		})
	  	};
	})
		// function onError(contactError) {
		// 	$scope.error = contactError;
		// 	//alert('onError!');
		// 	$ionicLoading.hide();
		// }

		// get the contacts
		// navigator.contacts.find(fields, onSuccess, onError, options);

		// $scope.handleContact = function (c) {
		// 	var savedContacts = localStorageService.get('lonConfig.savedContacts');
		// 	savedContacts = savedContacts ? savedContacts : [];

		// 	if (c.isChecked) {
		// 		// add to localStorage

		// 		savedContacts.push({
		// 			id: c.id,
		// 			name: c.displayName,
		// 			number: c.phoneNumbers[0].value
		// 		});

		// 		localStorageService.set('lonConfig.savedContacts', savedContacts);

		// 	} else {
		// 		// remove from localStorage
		// 		savedContacts.forEach(function (k, v) {
		// 			if (k.id === c.id) {
		// 				savedContacts.splice(v, 1);
		// 			}
		// 		});

		// 		localStorageService.set('lonConfig.savedContacts', savedContacts);
		// 	}

		// 	$scope.savedContacts = savedContacts;
		// };


	// });
