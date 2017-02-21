import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';

import { NavController, ViewController, AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { LoginDetails } from '../../providers/user-data';

import { StorageAccess } from '../../providers/storage-access';

import { AccountPage } from '../account/account';


@Component({
	selector: 'page-user',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: LoginDetails = new LoginDetails(null, null);
	submitted = false;
	invalidLogin = false;
	askToSaveLogin = true;

	constructor(public navCtrl: NavController, public userData: UserData,
		public viewCtrl: ViewController,
		public events: Events,
		public storageAccess: StorageAccess,
		private alertCtrl: AlertController) {

		this.events.subscribe('user:invalid', (event) => {
			console.log('InvalidLogin, keep logon page open');
			this.invalidLogin = true;

		});

		this.events.subscribe('user:login', (event) => {
			console.log('User Login, ask to save login');
			this.presentConfirm();
		});

		let myself = this;
		this.storageAccess.get(this.storageAccess.LOGIN_KEY).then(
			data => {
				console.log('found data from storage for login\n', data);
				// Need to add type safety here TODO
				myself.login = JSON.parse(data);
				console.log(myself.login);
				myself.askToSaveLogin = true;

			},
			reject => {
				console.log('Did not find login in storage\n', reject)
				myself.askToSaveLogin = false;

			}
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

	presentConfirm() {
		let alert = this.alertCtrl.create({
			title: 'Remember You',
			message: 'Do you want us to remember your login deets?',
			buttons: [
				{
					text: 'No Thanks',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Remember Me!',
					handler: () => {
						console.log('Buy clicked');
						this.userData.saveLogin(this.login);
					}
				}
			]
		});
		alert.present();
	}
}
