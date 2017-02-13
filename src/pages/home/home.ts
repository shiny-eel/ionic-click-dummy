import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  goToProcess() {
	      console.log('Button Clicked');

	  this.navCtrl.push(DetailsPage);
  }
	
}
