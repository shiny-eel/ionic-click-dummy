import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { UserData } from '../providers/user-data';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      var millisecondsToWait = 2000;
      // setTimeout(function () {
      //   // Whatever you want to do after the wait
      // }, millisecondsToWait);
       Splashscreen.hide();
    });
  }
}
