import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';

import { NavController, ViewController, AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { UserData } from '../../providers/user-data';
import { LoginDetails } from '../../providers/user-data';
import { StorageAccess } from '../../providers/storage-access';

@Component({
	selector: 'page-user',
	templateUrl: 'login.html'
})
export class LoginPage {
	login: LoginDetails = new LoginDetails(null, null);
	submitted = false;
	invalidLogin = false;
	askToSaveLogin = true;
	dead = false;
	constructor(public navCtrl: NavController, public userData: UserData,
		public viewCtrl: ViewController,
		public events: Events,
		public storageAccess: StorageAccess,
		private alertCtrl: AlertController) {
		var myself = this;
		this.events.subscribe('user:invalid', (event) => {
			console.log('InvalidLogin, keep logon page open');
			this.invalidLogin = true;

		});

		this.events.subscribe('user:login', (event) => {
			if (!myself.dead) {
				myself.dead = true;
				console.log('Login: heard login event');
				//	this.events.unsubscribe('user:login', this);
				if (myself.askToSaveLogin) {
					console.log('User Login, ask to save login');
					myself.presentConfirm();
				}
			}
		});

		// Try load user login
		this.storageAccess.get(this.storageAccess.LOGIN_KEY).then(
			data => {
				console.log('found data from storage for login\n', data);
				// Need to add type safety here TODO
				let parsedObj = JSON.parse(data)
				// if (parsedObj.) {
				myself.login = parsedObj
				console.log('login object is now:\n', myself.login);
				// } else { console.log('Saved obj was not a logindetail')}
				myself.askToSaveLogin = false; // Don't ask to save login again

			},
			reject => {
				console.log('Did not find login in storage\n', reject)
				myself.askToSaveLogin = true; // No memory of login - ask to save
			}
		)
	}

	onLogin(form: NgForm) {
		this.submitted = true;
		if (form.valid) {
			console.log('Calling userdata to login');
			this.userData.login(this.login.username, this.login.password);
		}
	}

	onSignup() {
		this.navCtrl.push(SignupPage);
	}

	showingAlert = false;
	presentConfirm() {
		if (!this.showingAlert) {
			this.showingAlert = true;
			let alert = this.alertCtrl.create({
				title: 'Remember You',
				message: 'Do you want us to remember your login deets?',
				buttons: [
					{
						text: 'No Thanks',
						role: 'cancel',
						handler: () => {
							console.log('Cancel clicked');
							this.askToSaveLogin = false;
						}
					},
					{
						text: 'Remember Me!',
						handler: () => {
							console.log('Remember clicked');
							this.userData.saveLogin(this.login);
							this.askToSaveLogin = false;
							this.showingAlert = false;
						}
					}
				]
			});
			alert.present();
		}
	}
}
