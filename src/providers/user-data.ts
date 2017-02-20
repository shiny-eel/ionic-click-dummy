import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth, User, AuthLoginOptions, UserDetails } from '@ionic/cloud-angular';

/**
 * Code from https://github.com/driftyco/ionic-conference-app
 * Thanks guys :)
 */

/**
 * Responsibility for implementation of login and signup is within this provider.
 * 
 * No individual pages should implement this. However, individual pages will need to
 * implement the front-end for login/signup - i.e. reporting to the user if a logon attempt was invalid.
 */

@Injectable()
export class UserData {
	//   _favorites: string[] = [];
	HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

	constructor(
		public events: Events,
		public storage: Storage,
		public auth: Auth, public user: User
	) {
		auth.logout;
	}

	login(username: string, password: string) {

		// ******* Add Ionic Custom Auth 
		let loginData = { 'id': username, 'passphrase': password };
		let details: UserDetails = { 'email': username, 'password': password };
		var self = this;
		let loginOptions: AuthLoginOptions = { 'inAppBrowserOptions': { 'hidden': true } };

		// this.auth.login('custom', loginData, loginOptions).then(function (result) {
			this.auth.login('basic', details, loginOptions).then(function (result) {
			//  Fulfilled
			// Handle Success
			console.log('Successful Log In');
			self.setUsername(username);
			self.events.publish('user:login');
			return;
		}).catch(function (err) {
			// Handle error
			console.log('Failed to log in \n', err)
			self.events.publish('user:invalid');
		});

		// promise.then(function())
		setTimeout(() => {
			//
		}, 2000);
		// ********
	};

	signup(username: string, password: string) {

		// Yet to implement signup? TODO
		let details: UserDetails = { 'email': username, 'password': password };

		this.auth.signup(details);
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
