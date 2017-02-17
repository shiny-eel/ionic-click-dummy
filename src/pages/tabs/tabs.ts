import { Component, ViewChild } from '@angular/core';
import { AccountPage } from '../account/account';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Tabs } from 'ionic-angular';


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
  tab4Root: any = LoginPage;

  constructor( public events: Events,
              public navCtrl: NavController) {
      this.events.subscribe('user:login', (event) => {
        console.log('Logged On');
        this.giveAccountAccess();
      });
       this.events.subscribe('user:logout', (event) => {
        console.log('Logged Off');
        this.removeAccountAccess();
      })
  }

  giveAccountAccess() {
    this.tab4Root = AccountPage;
    var pageStack = [AccountPage];
    this.navCtrl.setPages(pageStack);


  }

  removeAccountAccess() {
    this.tab4Root = LoginPage;
 var pageStack = [LoginPage];
    this.navCtrl.setPages(pageStack);

  }
}
