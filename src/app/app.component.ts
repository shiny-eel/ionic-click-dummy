import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Push} from 'ionic-native';
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
      Splashscreen.hide();
      
      var push = Push.init({
        android: {
          senderID: "XXXXXXXXX"
        },
        ios: {
          alert: "true",
          badge: true,
          sound: 'false'
        },
        windows: {}
      });
      push.on('registration', (data) => {
        console.log(data.registrationId);
        alert(data.registrationId.toString());
      });
      push.on('notification', (data) => {
        console.log(data);
        alert("Hi, Am a push notification");
      });
      push.on('error', (e) => {
        console.log(e.message);
      });
      this.initialisePushing();
    });
  }

  initialisePushing(){
    // var push = Push.init({
    //     android: {
    //       senderID: "XXXXXXXXX"
    //     },
    //     ios: {
    //       alert: "true",
    //       badge: true,
    //       sound: 'false'
    //     },
    //     windows: {}
    //   });
    //   push.on('registration', (data) => {
    //     console.log(data.registrationId);
    //     alert(data.registrationId.toString());
    //   });
    //   push.on('notification', (data) => {
    //     console.log(data);
    //     alert("Hi, Am a push notification");
    //   });
    //   push.on('error', (e) => {
    //     console.log(e.message);
    //   });
  }
}
