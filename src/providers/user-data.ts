import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth, User, AuthLoginOptions, UserDetails } from '@ionic/cloud-angular';
import { StorageAccess } from './storage-access';

/**
 * Code from https://github.com/driftyco/ionic-conference-app
 * Thanks guys :)
 */

/**
 * Responsibility for implementation of login and signup - communicating with the server.
 * Currently this is done through Ionic's cloud Auth. Will need to be converted to use ECANS own auth backend.
 * 
 * No individual pages should implement this same function. However, individual pages will need to
 * implement the front-end for login/signup - i.e. reporting to the user if a logon attempt was invalid.
 */

@Injectable()
export class UserData {
	HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
	LOGIN_OPTIONS: AuthLoginOptions =
	{ 'inAppBrowserOptions': { 'hidden': true }, 'remember': false };

	constructor(
		public events: Events,
		public storage: Storage,
		public auth: Auth, public user: User,
		public storageAccess: StorageAccess
	) {
		auth.logout;
		console.log('Hello UserData');
	}

	// When using own login backend, change this to LoginDetails
	login(username: string, password: string) {

		// ******* Add Ionic  Auth 
		let loginData = new LoginDetails(username, password); // Own class for login details
		let details: UserDetails = { 'email': username, 'password': password }; // Ionic Auth class for login details
		var self = this;

		// this.auth.login('custom', loginData, loginOptions).then(function (result) {
		this.auth.login('basic', details, this.LOGIN_OPTIONS).then( (result) => {
			// Handle Success
			console.log('Successful Log In');
			//self.setUsername(username);
			self.events.publish('user:login');
			console.log('login event published');
		},
		(err) => {
			// Handle error
			console.log('Failed to log in \n', err)
			self.events.publish('user:invalid');
		});
		
	};

	saveLogin(logDetails: LoginDetails) {
		// Securely store login details
		this.storageAccess.set(this.storageAccess.LOGIN_KEY, JSON.stringify(logDetails)).then(
			() => console.log('saved login'),
			(err) => console.log('failed to save login\n', err)
		)
	}

	signup(username: string, password: string) {

		// Yet to implement signup? TODO
		let details: UserDetails = { 'email': username, 'password': password };

		this.auth.signup(details).then(() => {
			return this.auth.login('basic', details, this.LOGIN_OPTIONS);
		});
		this.setUsername(username);
		this.events.publish('user:signup');
	};

	logout() {
		// Ionic Custom Auth
		this.auth.logout()

		this.storage.remove('username');
		this.events.publish('user:logout');
	};

	setUsername(username: string) {
		this.storage.set('username', username);
	};

	getUsername() {
		return this.storage.get('username').then((value) => {
			if (value == null) {
				return 'default'
			}
			return value;
		});
	};

	// return a promise
	hasLoggedIn() {
		// return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
		// 	console.log('storage shows logged in as:', value);
		// 	return false;
		// //	return value === true;
		// });
		console.log('auth shows logged in as:', this.auth.isAuthenticated());

		return this.auth.isAuthenticated();
	};

	checkHasSeenTutorial() {
		return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
			return value;
		})
	};
}

export class LoginDetails {
	constructor(username: string, password: string) {
		this.password = password;
		this.username = username;
	}
	username?: string 
	password?: string
}
