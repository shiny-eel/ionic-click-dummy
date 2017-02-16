import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Code from https://github.com/driftyco/ionic-conference-app
 * Thanks guys :)
 */

@Injectable()
export class UserData {
//   _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {
      // timeout(function(){         // added dummy timeout to simulate delay
      //               this.storage.remove(this.HAS_LOGGED_IN);   
      //           }, 3000);         
  }

//   hasFavorite(sessionName: string) {
//     return (this._favorites.indexOf(sessionName) > -1);
//   };

//   addFavorite(sessionName: string) {
//     this._favorites.push(sessionName);
//   };

//   removeFavorite(sessionName: string) {
//     let index = this._favorites.indexOf(sessionName);
//     if (index > -1) {
//       this._favorites.splice(index, 1);
//     }
//   };

  login(username: string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      if (value == null) {
        return 'default'
      }
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial() {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    })
  };
}
