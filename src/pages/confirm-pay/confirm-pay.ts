import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

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

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPayPage');
  }
    dismiss() {
    this.viewCtrl.dismiss();
  }

}
