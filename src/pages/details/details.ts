import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
	sliderValue: string;
	pumpNumber: string;
	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.sliderValue = "40";
	  this.pumpNumber = "1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  goToPay() {
	      console.log('Button Clicked');

	  this.navCtrl.push(DetailsPage);
  }

}
