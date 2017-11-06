import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { TaskObjectProvider } from '../../providers/task-object/task-object'; //provider
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import {ProfilePage} from '../profile/profile';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
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
    private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public firebaseModule : FirebaseProvider,
    //public currUser : ProfileProvider
  ) {
    AFdatabase.list<ProfileProvider>('user').valueChanges().subscribe();
    // var tmpUser = this.getUserProfile(this.result.uid, function(userp){ tmpUser = userp});
    // this.user1 = tmpUser;
    // console.log("4", this.user1);
    AFdatabase.object<ProfileProvider>('user/' + this.result.uid).snapshotChanges().map(action=>{
        const $key = action.payload.key;
         this.user1 = { $key, ...action.payload.val()}
        return this.user1;
     }).subscribe();
    console.log(this.user1.lastName);
 }
  result = this.AFcurUser.auth.currentUser;   //get current logged in user
   //TODO figure out a way to replace placehold value to the database value after the profile been created.
  testValue = "first name";                   //test value for input field.

  user1 = {} as ProfileProvider;
  
  
  
  /*
  / This funtion will take all the user inputs and update it to corresponding node.
  */
  update = function(firstName, lastName)
  {
    if(this.result)
    {
      //initialize new User object using input lastname, firstname and current author's uid and email.
      var newUser = new ProfileProvider(lastName, firstName, this.result.uid, this.result.email, "intro", [true]);
      newUser.createTask();                                         //create test task list

      this.firebaseModule.singleStringUpdate('lastName', lastName, this.result.uid);    //update user's last name to the server.
      this.singleStringUpdate('firstName', firstName);
      console.log("1", newUser);
      
      //TODO: find a way to display data in html page
      var tmpUser;
      this.getUserProfile(this.result.uid, function(userp){ tmpUser = userp});
      //this.firebaseModule.getUserProfile(this.result.uid, function(userp){ console.log(userp)});
      //this.user1 = tmpUser;
     
      console.log("2", this.user1);
      //TODO: modularize following code
      var userRef = firebase.database().ref('user/'+ this.result.uid + '/' + 'owenedTask'); //get node reference.
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
    var updateMsg = {}                                                        //declare and initialize updateMsg variable
    updateMsg['user/' + this.result.uid + '/' + subPath] = updateMessage;     //set correct path using subPath and assign update value
    firebase.database().ref().update(updateMsg);                              // updating to firebase using firebase API

  }

   /*
   /  this function will find user node using userId and return value
   /  of the node
    */
  getUserProfile = function(userId : string, profile) : any
  {
    var user;
    var userRef = firebase.database().ref('user/' + userId);            //get a node reference with path specified by userId
    userRef.once('value', function(snapshot)         // read node value once use firebase API
    {
      user = snapshot.val()                                               //return node value.
      profile(user);
      return user;
    })
  }

  


}

