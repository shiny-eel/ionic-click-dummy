import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SecureStorage } from 'ionic-native';

/*
  Generated class for the StorageAccess provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

/**
 * StorageAccess holds the responsibility for implementing the Ionic Native 'SecureStorage' plugin,
 * to keep the application's login details.
 */
@Injectable()
export class StorageAccess {
	secureStore: SecureStorage;
	STORE_NAME = 'my_store'

	constructor(public http: Http) {
		console.log('Hello StorageAccess Provider');
	}

	initSecureStorage(){
		this.secureStore = new SecureStorage();
		this.secureStore.create(this.STORE_NAME)
			.then(  () => console.log('Storage is ready!'),
			error => console.log(error)
		);
	}

	get(item: string) {
		let guff = 'Nothing Here'
		this.secureStore.get(item)
 			.then(
				data => {
					console.log(data);
					guff = data;
				},
				error => console.log(error)
			);
		return guff;
	}

	set(item: string, value: any) {
		this.secureStore.set(item, value)
			.then(
				data => console.log(data),
				error => console.log(error)
			);
	}

	remove(item: string) {	
		this.secureStore.remove('myitem')
			.then(
				data => console.log(data),
				error => console.log(error)
			);
	}

}
