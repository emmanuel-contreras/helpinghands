import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { TaskObjectProvider } from '../../providers/task-object/task-object'; //provider
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import {ProfilePage} from '../profile/profile';
import firebase from 'firebase';
 /**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  //constructor of the page.
  constructor(
    private AFcurUser: AngularFireAuth,
    //private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
  ) { }
  result = this.AFcurUser.auth.currentUser;   //get current logged in user

  /*
  / This funtion will take all the user inputs and update it to corresponding node.
  */
  update = function(firstName, lastName)
  {
    if(this.result)
    {
      //initialize new User object using input lastname, firstname and current author's uid and email.
      var newUser = new ProfileProvider(lastName, firstName, this.result.uid, this.result.email);
      newUser.createTask();                                         //create test task list

      this.singleStringUpdate('lastName', lastName);    //update user's last name to the server.
      this.singleStringUpdate('firstName', firstName);
      //TODO modularize following code
      var userRef = firebase.database().ref('user/'+ this.result.uid + '/' + 'owenedTask');
      for( let ownedTask of newUser.oTask) {
        var ownedTaskRef = userRef.push().key;    //get new key value for a new entry of current path
        var updates = {};                         // declare update var to hold update data.
        updates['user/' + this.result.uid + '/' + 'owenedTask' + '/' + ownedTaskRef] = ownedTask; //set path for current task
        firebase.database().ref().update(updates);                                      // update to specified path
      }                                                                                  // in database.
    }
  }

  /*
  / This function is to add updateMessage to the specified sub path of the user node
  / that represents current user.
   */
  singleStringUpdate = function(subPath : string, updateMessage : string)
  {
    var updateMsg = {}
    updateMsg['user/' + this.result.uid + '/' + subPath] = updateMessage;
    firebase.database().ref().update(updateMsg);

  }


}

