"use strict";
angular.module('starter.contacts', [])


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
