import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { ConfirmPayPage } from '../confirm-pay/confirm-pay';

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
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
	  this.sliderValue = "40";
	  this.pumpNumber = "1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  goToPay() {
	      console.log('Button Clicked');

	  let modal = this.modalCtrl.create(ConfirmPayPage)
	  modal.present();
  }

}
