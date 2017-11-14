import { Component } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile'
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile;
  skills : Array<boolean>;
  curUserToken = this.AFcurUser.auth.currentUser;
  userPhotoUrl = this.curUserToken.photoURL;
  db = firebase.firestore();

  CURRENT_USER = {} as ProfileProvider;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private AFcurUser: AngularFireAuth,
              private AFdatabase: AngularFireDatabase,
              private photoviewer : PhotoViewer,
              )
  {
    //get user node specificed by current userId.
    var userRef = this.db.collection('users').doc(this.curUserToken.uid);
    userRef.get() //read
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          for(const field in doc.data())
          {
            //have to be careful that we have to store exactly same property
            //  in userProvider obeject and users node.
            this.CURRENT_USER[field] = doc.data()[field];
          }
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  expandPic(){
    this.photoviewer.show(this.userPhotoUrl, this.curUserToken.displayName ,{share : false});
    console.log(this.userPhotoUrl);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
