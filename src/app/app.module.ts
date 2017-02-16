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
    IonicModule.forRoot(MyApp)
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
