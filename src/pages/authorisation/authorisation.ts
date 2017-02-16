import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, AbstractControl, FormGroup  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
/*
  Generated class for the Authorisation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authorisation',
  templateUrl: 'authorisation.html'
})
export class AuthorisationPage {
  private todo : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuild: FormBuilder) {
      this.todo = this.formBuild.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorisationPage');
  }
 logForm(){
    console.log(this.todo.value)
  }
}
