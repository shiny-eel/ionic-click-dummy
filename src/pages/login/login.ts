import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';

import { NavController, ViewController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { StorageAccess } from '../../providers/storage-access';

import { AccountPage } from '../account/account';


@Component({
	selector: 'page-user',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: { username?: string, password?: string } = {};
	submitted = false;
	invalidLogin = false;

	constructor(public navCtrl: NavController, public userData: UserData,
		public viewCtrl: ViewController,
		public events: Events,
		public storageAccess: StorageAccess) {

		this.events.subscribe('user:invalid', (event) => {
			console.log('InvalidLogin, keep logon page open');
			//this.goToLogin();
			this.invalidLogin = true;
		});
		let myself = this;
		this.storageAccess.get('login').then(
			data => {
				console.log('found data from storage for login', data);
				myself.login.username = data.username
				myself.login.password = data.password
				
			},
			reject => console.log(reject)
		)
	}

	onLogin(form: NgForm) {
		this.submitted = true;

		if (form.valid) {
			this.userData.login(this.login.username, this.login.password);
			//   this.navCtrl.push(AccountPage);
		}
	}

	onSignup() {
		this.navCtrl.push(SignupPage);
	}
}
