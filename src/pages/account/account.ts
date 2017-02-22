import { Component } from '@angular/core';

import { AlertController, NavController, ModalController, Modal } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';


@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage {
	username: string;
	logonModal: Modal;

	constructor(public alertCtrl: AlertController, public nav: NavController,
		public userData: UserData, public modalCtrl: ModalController,
		public events: Events
		) {
		this.username = 'default';
		//this.logonModal = this.modalCtrl.create(LoginPage, { parentPage: this }, { enableBackdropDismiss: false });
		if (userData.hasLoggedIn()) {
			console.log('Account Page constructed - user already logged in.');
		} else {
			this.goToLogin();
		}
		// userData.hasLoggedIn().then(any => console.log('User has logged in already!'))
		// .catch(any => console.log('User has not logged in yet'));
		//  Tabs must subscribe with the UserData provider to know if login has occurred.

		this.events.subscribe('user:login', (event) => {
			console.log('Account: heard login event');
			console.log('Removing login screen');
			this.logonModal.dismiss().then(any => {
				console.log('successful dismiss')
			},
			err => console.log('failed to dismiss\n', err))
		
		});

		this.events.subscribe('user:logout', (event) => {
			console.log('Logged Off');
			this.goToLogin();
		})
	
	}

	ngAfterViewInit() {
		this.getUsername();
	}

	goToLogin() {
		console.log('Creating and Presenting Modal');

		this.logonModal = this.modalCtrl
			.create(LoginPage, { parentPage: this }, { enableBackdropDismiss: false });
		this.logonModal.present();
		console.log('Modal created');
	}

	updatePicture() {
		console.log('Clicked to update picture');
	}

	// Present an alert with the current username populated
	// clicking OK will update the username and display it
	// clicking Cancel will close the alert and do nothing
	changeUsername() {
		let alert = this.alertCtrl.create({
			title: 'Change Username',
			buttons: [
				'Cancel'
			]
		});
		alert.addInput({
			name: 'username',
			value: this.username,
			placeholder: 'username'
		});
		alert.addButton({
			text: 'Ok',
			handler: (data: any) => {
				this.userData.setUsername(data.username);
				this.getUsername();
			}
		});

		alert.present();
	}

	getUsername() {
		this.userData.getUsername().then((username) => {
			this.username = username;
		});
	}

	changePassword() {
		console.log('Clicked to change password');
	}

	requestLogout() {
		this.userData.logout();
		// this.nav.push(LoginPage);
		//     this.nav.setRoot(LoginPage);
	}


}
