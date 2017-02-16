import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details';
import { ChangeCardPage } from '../pages/change-card/change-card';
import { ReceivePayPage } from '../pages/receive-pay/receive-pay';
import { UserData } from '../providers/user-data';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { SignupPage } from '../pages/signup/signup';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyB3MC4SI6-zB89wy3kyzJxQN5qCHP6onCk",
    authDomain: "ionic-alpha.firebaseapp.com",
    databaseURL: "https://ionic-alpha.firebaseio.com",
    storageBucket: "ionic-alpha.appspot.com",
    messagingSenderId: "1074544308976"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
	DetailsPage,
	ChangeCardPage,
  ReceivePayPage,
  LoginPage,
  AccountPage,
  SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
	DetailsPage,
	ChangeCardPage,
  ReceivePayPage,
  LoginPage,
  AccountPage,
  SignupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserData, Storage]
})
export class AppModule {}
