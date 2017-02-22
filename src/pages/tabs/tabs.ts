import { Component, ViewChild } from '@angular/core';
import { AccountPage } from '../account/account';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { Events } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = AccountPage;

  constructor( public events: Events,
              public navCtrl: NavController,
              public userData: UserData) {


      // Tabs must subscribe with the UserData provider to know if login has occurred.
      // if (userData.hasLoggedIn()) {
      //   this.tab4Root = AccountPage;
      // }
      // this.events.subscribe('user:login', (event) => {
      //   console.log('Logged On');
      //   this.giveAccountAccess();
      // });
      //  this.events.subscribe('user:logout', (event) => {
      //   console.log('Logged Off');
      //   this.removeAccountAccess();
      // })
  }

  // giveAccountAccess() {
  //   this.tab4Root = AccountPage;
  // }

  // removeAccountAccess() {
  //   this.tab4Root = LoginPage;
  // }
}
