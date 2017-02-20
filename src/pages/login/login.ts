import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';

import { NavController, ViewController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { AccountPage } from '../account/account';


@Component({
	selector: 'page-user',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: { username?: string, password?: string } = {};
	submitted = false;

	constructor(public navCtrl: NavController, public userData: UserData,
		public viewCtrl: ViewController,
		public events: Events) {
		this.events.subscribe('user:invalid', (event) => {
			console.log('InvalidLogin, keep logon page open');
			//this.goToLogin();
		})
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
