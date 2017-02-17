import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth, User, AuthLoginOptions } from '@ionic/cloud-angular';

/**
 * Code from https://github.com/driftyco/ionic-conference-app
 * Thanks guys :)
 */

@Injectable()
export class UserData {
	//   _favorites: string[] = [];
	HAS_LOGGED_IN = 'hasLoggedIn';
	HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

	constructor(
		public events: Events,
		public storage: Storage,
		public auth: Auth, public user: User
	) {

	}

	login(username: string, password: string) {

		// ******* Add Ionic Custom Auth 
		let loginData = { 'id': username, 'passphrase': password };
		let loginOptions: AuthLoginOptions = { 'inAppBrowserOptions': { 'hidden': true } };

		this.auth.login('custom', loginData, loginOptions).then( 
			//  Fulfilled
		);
		// ********
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.setUsername(username);
		this.events.publish('user:login');
	};

	signup(username: string, password: string) {

		// Yet to implement signup? TODO

		this.storage.set(this.HAS_LOGGED_IN, true);
		this.setUsername(username);
		this.events.publish('user:signup');
	};

	logout() {
		// Ionic Custom Auth
		this.auth.logout();

		this.storage.remove(this.HAS_LOGGED_IN);
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
		return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
			return value === true;
		});
	};

	checkHasSeenTutorial() {
		return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
			return value;
		})
	};
}
