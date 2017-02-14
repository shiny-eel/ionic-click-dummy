import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ChangeCardPage } from '../change-card/change-card';
import { ReceivePayPage } from '../receive-pay/receive-pay';

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
	
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public modalCtrl: ModalController,
  public loadingCtrl: LoadingController) {
	  this.sliderValue = "40";
	  this.pumpNumber = "Pump 1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  goToChangeCard() {
    console.log('Button Clicked');
	  let modal = this.modalCtrl.create(ChangeCardPage, { parentPage: this })
	  modal.present();
 //   this.navCtrl.pop();
  }
  
  public goToNext() {
	  console.log('Going next');
	  this.navCtrl.push(ReceivePayPage);
  }

presentLoadingText() {
  let loading = this.loadingCtrl.create({
    content: 'Waiting for POS Confirmation...',
    dismissOnPageChange: true
  });

  loading.present();

  setTimeout(() => {
    this.goToNext();
  }, 3000);

  setTimeout(() => {
    loading.dismiss();
  }, 3000);
}


}
