import { Component, Input } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DetailsPage } from '../details/details';

/*
  Generated class for the ConfirmPay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm-pay',
  templateUrl: 'confirm-pay.html'
})
export class ConfirmPayPage {
  parentPage: DetailsPage;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ){
	  this.parentPage = params.get('parentPage');
	  console.log('hola', this.parentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPayPage');
  }

  // This is called when the auto-created 'x' in the corner is clicked
  dismiss() {
    this.viewCtrl.dismiss();
    console.log('this is it ', this.parentPage.sliderValue)
  }

  continue() {
    this.viewCtrl.dismiss();
    this.parentPage.goToNext();
  }
}
