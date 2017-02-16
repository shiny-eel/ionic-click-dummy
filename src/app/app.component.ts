import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Push } from 'ionic-native';
import { UserData } from '../providers/user-data';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  platform: Platform;
  constructor(platform: Platform,
    public alertCtrl: AlertController
    ) {
    this.platform = platform;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();


    });
    
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    let push = Push.init({
      android: {
        senderID: "YOUR_SENDER_ID"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              //     self.nav.push(DetailsPage, {message: data.message});
              console.log("Push notification Action");

            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        //  self.nav.push(DetailsPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);

    });
  }

  initialisePushing() {
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
