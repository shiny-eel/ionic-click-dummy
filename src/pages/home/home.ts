import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { NavController } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service';
import { StorageAccess } from '../../providers/storage-access';

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
		public storageAccess: StorageAccess) {
		this.loadPeople();
		this.navCtrl.viewDidEnter.subscribe((view) => {
			console.log("Hello yes look at the new page", view.instance.constructor.name);
		});
		if (storageAccess) {
			// storageAccess.set('secret', this.secret);
		}
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
