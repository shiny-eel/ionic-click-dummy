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
  @Input()	parentPage: DetailsPage;
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
    dismiss() {
    this.viewCtrl.dismiss();
	//DetailsPage.goToHome();
  }

}
