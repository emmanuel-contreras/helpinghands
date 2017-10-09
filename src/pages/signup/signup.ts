import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import { User } from "../../models/user";
import { AngularFireAuth} from "angularfire2/auth";


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user = {} as User;

  constructor(
    private authp: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,) {


  }


  signUp = function(user : User, passwordRe) {
    console.log(user);

    if(user.password.localeCompare(passwordRe) != 0)  //password doesn't match the reenter password.
    {
      const loading = this.loadingCtrl.create({
        duration: 500
      });

      loading.onDidDismiss(() => {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Two passwords are not the same',
          buttons: ['Dismiss']
        });
        alert.present();
      });
      loading.present();
    }
    /*
    else if()  //not a valid wisc email
    {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-word-boundary
    }*/
    //TODO catch the error that the email acc is already used.
    else if(user.password.length < 6) //passwaord is at least 6 digits.
    {
      const loading = this.loadingCtrl.create({
        duration: 500
      });

      loading.onDidDismiss(() => {
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Password should have at least 6 letters',
          buttons: ['Dismiss']
        });
        alert.present();
      });
      loading.present();
    }
    else
    {
      try
      {
        //https://firebase.google.com/docs/reference/js/firebase.User
        //https://firebase.google.com/docs/reference/js/firebase.auth.Auth
        const result = this.authp.auth.createUserWithEmailAndPassword(user.email, user.password);

      }
      catch(e)
      {
        console.log(e);
      }
    }
    //
  }

  backToLogin(){
    this.navCtrl.push(LoginPage);
  }
}
