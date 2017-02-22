import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SecureStorage } from 'ionic-native';
import { Platform } from 'ionic-angular';

/*
  Generated class for the StorageAccess provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

/**
 * StorageAccess holds the responsibility for implementing the Ionic Native 'SecureStorage' plugin,
 * to keep the application's login details. (And possibly other things that need to be secure)
 * 
 * NB: For Android devices, a screen lock must be enabled for this to work - See:
 * https://github.com/Crypho/cordova-plugin-secure-storage
 */
@Injectable()
export class StorageAccess {
	private secureStore: SecureStorage;
	STORE_NAME = 'my_store'
	isReady = false;
	LOGIN_KEY = 'eels in my hovercraft'

	constructor(public http: Http,
		public plt: Platform) {

		console.log('StorageAccess: Initialising Secure Storage')
		plt.ready().then(
			(readySource) => {
				this.secureStore = new SecureStorage();
				this.secureStore.create(this.STORE_NAME)
					.then(() => {
						console.log('Storage is ready!')
						this.isReady = true;
					},
					error => { // Handle error in creating store
						console.log('Secure Storage Error:\n', error)
						this.secureStore = null;
						// Shouldn't be in final code:
						this.isReady = true;
					}
					);
			}
		)
		console.log('Hello StorageAccess Provider');
	}

	storageReady(){
		console.log('Checking if storage ready');
		let myself = this;
		var promise = new Promise(function(resolve, reject) {
			if (myself.isReady) {
				resolve();
			} else {
				reject();
			}
		});
		return promise;
	}

	get(item: string) {
		if (this.secureStore) {
			console.log('Getting ', item, ' from real store.');
			return this.secureStore.get(item);

		} else {
			console.log('Fake Secure Store: getting ', item);
			return new Promise(function(resolve, reject){
				resolve(JSON.stringify({data: 'Stub'}));
			});
		}
	}

	set(item: string, value: any) {
		if (this.secureStore) {
			console.log('Setting ', item, ' in real store.');

			return this.secureStore.set(item, value);
	
		} else { 
			console.log('Fake Secure Store: setting ', item);
			return new Promise(function(resolve, reject){
				resolve();
			});
		 }
	}

	remove(item: string) {
		if (this.secureStore) {
			console.log('Removing ', item, ' from real store.');
			this.secureStore.remove(item);

			console.log('Fake Secure Store: removing ', item);
		return new Promise(function(resolve, reject){
				resolve();
			}); }

	}

}
