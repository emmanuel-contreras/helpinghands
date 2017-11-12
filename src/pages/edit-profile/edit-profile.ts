import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { TaskObjectProvider } from '../../providers/task-object/task-object'; //provider
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import {ProfilePage} from '../profile/profile';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { nameValidator} from '../../validators/nameValidator';
//import { CameraProvider } from '../../../providers/util/camera.provider';


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

  curUserToken = this.AFcurUser.auth.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  editProfileForm : FormGroup;
  storage = firebase.storage();
  //chosenPicture: any;
  //constructor of the page.
  constructor(
    private AFcurUser: AngularFireAuth,
    private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public firebaseModule : FirebaseProvider,
    public formBuilder : FormBuilder,
    //public currUser : ProfileProvider
  ) {

    this.editProfileForm = formBuilder.group({
      lastName : ['', Validators.compose([nameValidator.isValid, Validators.required])],
      firstName :  ['', Validators.compose([nameValidator.isValid, Validators.required])],
      phone : [''],
      introduction : ['', Validators.required],
      travelRadius : [''],
      zipCode : [''],
    });

    //AFdatabase.list<ProfileProvider>('user').valueChanges().subscribe();
    //read user profile from database
    AFdatabase.object<ProfileProvider>('user/' + this.curUserToken.uid).snapshotChanges().map(action=>{
      const $key = action.payload.key;
      this.CURRENT_USER = { $key, ...action.payload.val()}
    }).subscribe(item =>(console.log("key is ", this.CURRENT_USER)));
  };

  //
  // writeUp = function(message : any)
  // {
  //   //document.getElementById("FN").textContent = message.firstName;
  // }
  /*
  / This funtion will take all the user inputs and update it to corresponding node.
  */
  update = function()
  {

    //if firstName is invalid
    if(!this.editProfileForm.controls.firstName.valid)
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid first name',
        buttons: ['OK']
      });
      alert.present();
    }
    //if lastname is invalid
    else if(!this.editProfileForm.controls.lastName.valid)
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid last name',
        buttons: ['OK']
      });
      alert.present();
    }
    //if introduction is invalid
    else if(!this.editProfileForm.controls.introduction.valid)
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid introduction',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.curUserToken)
    {
      //initialize new User object using input lastname, firstname and current author's uid and email.
      var newUser = new ProfileProvider(this.editProfileForm.value.lastName,
        this.editProfileForm.value.firstName, this.curUserToken.uid, this.curUserToken.email, this.editProfileForm.value.introduction,
        [true], this.editProfileForm.value.zipCode, this.editProfileForm.value.phone, this.editProfileForm.value.travelRadius);

      this.firebaseModule.singleStringUpdate('lastName', newUser.lastName, this.curUserToken.uid);    //update user's last name to the server.
      this.firebaseModule.singleStringUpdate('firstName', newUser.firstName, this.curUserToken.uid);
      this.firebaseModule.singleStringUpdate('introduction', newUser.introduction, this.curUserToken.uid);
      this.firebaseModule.singleStringUpdate('zipCode', newUser.zipCode, this.curUserToken.uid);
      this.firebaseModule.singleStringUpdate('phone', newUser.phone, this.curUserToken.uid);
      this.firebaseModule.singleStringUpdate('phone', newUser.travelRadius, this.curUserToken.uid);


      // var storageRef = this.storage.ref();
      // this.curUserToken.updateProfile({
      //   photoURL: "https://example.com/jane-q-user/profile.jpg"
      // }).then(function() {
      //   // Update successful.
      // }).catch(function(error) {
      //   // An error happened.
      // });



      //TODO: modularize following code
      // var userRef = firebase.database().ref('user/'+ this.curUserToken.uid + '/' + 'owenedTask'); //get node reference.
      // for( let ownedTask of newUser.oTask) {
      //   var ownedTaskRef = userRef.push().key;    //get new key value for a new entry of current path
      //   var updates = {};                         // declare update var to hold update data.
      //   updates['user/' + this.curUserToken.uid + '/' + 'owenedTask' + '/' + ownedTaskRef] = ownedTask; //set path for current task
      //   firebase.database().ref().update(updates);                                      // update to specified path
      // }                                                                                  // in database.
      this.editProfileForm.reset();
    }
    else {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'login first',
        buttons: ['OK']
      });
      alert.present();
    }

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
