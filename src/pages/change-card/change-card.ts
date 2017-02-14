import { Component, Input } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DetailsPage } from '../details/details';

/*
  Generated class for the ChangeCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-card',
  templateUrl: 'change-card.html'
})
export class ChangeCardPage {
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
