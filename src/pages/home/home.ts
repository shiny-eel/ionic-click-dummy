import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { NavController } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service';
import { StorageAccess } from '../../providers/storage-access';
import { SecureStorage } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [PeopleService, StorageAccess]
})
export class HomePage {
	public people: any;
	secret: string = 'lol';
	constructor(public navCtrl: NavController,
		public peopleService: PeopleService,
		public storageAccess: StorageAccess,
		public plt: Platform) {
		this.loadPeople();
		this.navCtrl.viewDidEnter.subscribe((view) => {
			console.log("Hello yes look at the new page", view.instance.constructor.name);
		});

		// Chained promises to ensure storage access works
		let myself = this;
		var myVar = setInterval(function () {
			storageAccess.storageReady()
				.then(() => {
					clearInterval(myVar)
					console.log('storage ready')
					storageAccess.set('secret', 'set from Home')
						.then(() => storageAccess.get('secret'))
							// Unchecked cast from any to string
							// Also, this does not show the correct thing in
							// ionic serve, but it works on Android.
							.then(data => myself.secret = data,
							error => console.log(error));
				},
					() => console.log('not ready'))
		}, 500);
	}

	goToProcess() {
		console.log('Button Clicked');
		this.navCtrl.push(DetailsPage);
	}

	loadPeople() {
		this.peopleService.load()
			.then(data => {
				this.people = data;
			});
	}

}
