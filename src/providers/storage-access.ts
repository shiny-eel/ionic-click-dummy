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
 * to keep the application's login details.
 * 
 * NB: For Android devices, a screen lock must be enabled for this to work - See:
 * https://github.com/Crypho/cordova-plugin-secure-storage
 */
@Injectable()
export class StorageAccess {
	private secureStore: SecureStorage;
	STORE_NAME = 'my_store'
	isReady = false;

	constructor(public http: Http,
		public plt: Platform) {

		console.log('Initialising Secure Storage')
		plt.ready().then(
			(readySource) => {
				this.secureStore = new SecureStorage();
				this.secureStore.create(this.STORE_NAME)
					.then(() => {
						console.log('Storage is ready!')
						this.isReady = true;
					},
					error => {
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
			console.log('getting real store item');
			return this.secureStore.get(item);
			// this.secureStore.get(item)
			// 	.then(
			// 	data => {
			// 		console.log('Found this in store: ', data);
			// 		return data;
			// 	},
			// 	error => {
			// 		// Do not return anything
			// 		console.log('Error in finding item.\n', error)
			// 	}
			// 	);
		} else {
			console.log('Stub since fake store');
			return new Promise(function(resolve, reject){
				resolve({data: 'Stub'});
			});
		}
	}

	set(item: string, value: any) {
		if (this.secureStore) {
			console.log('setting real store item');

			return this.secureStore.set(item, value);
			// this.secureStore.set(item, value)
			// 	.then(
			// 	data => console.log(data),
			// 	error => console.log(error)
			// 	);
		} else { 
			console.log('Stub since fake store');
			return new Promise(function(resolve, reject){
				resolve();
			});
		 }
	}

	remove(item: string) {
		if (this.secureStore) {
			this.secureStore.remove(item);

			// this.secureStore.remove('myitem')
			// 	.then(
			// 	data => console.log(data),
			// 	error => console.log(error)
			// 	);
		} else { console.log('Stub since fake store');
		return new Promise(function(resolve, reject){
				resolve();
			}); }

	}

}
