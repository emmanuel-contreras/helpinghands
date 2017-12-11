import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SignupPage } from "../pages/signup/signup";
import { ProfilePage } from "../pages/profile/profile";
import * as firebase from 'firebase';
import { DashboardPage} from "../pages/dashboard/dashboard";
import { SearchPage} from '../pages/search/search';
import { TaskEditPage } from "../pages/task-edit/task-edit";
import { AngularFireAuth } from "angularfire2/auth";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import { NgZone } from "@angular/core";
import { SettingsPage} from "../pages/settings/settings";
import { SignoutPage} from "../pages/signout/signout";
import { IntroductionPage} from "../pages/introduction/introduction";

@Component({
  selector: 'app',
  templateUrl: './app.html'    //TODO change app.html's content. currently it has sidebar created.
})
export class HelpingHands {
  @ViewChild(Nav) nav: Nav;   //auto generated by ionic


  //curUserToken = this.AFcurUser.auth.currentUser;
  public rootPage = HomePage; //set Login page as the first page
  public photoURL = "";
  pages: Array<{title: string, component: any}>; //auto generated by ionic

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _zone : NgZone,
    public menuCtrl: MenuController,
              ) {

    var app = firebase.initializeApp({
      apiKey: "AIzaSyAtXUZCmJgRa_DjLRqqlEiXtGNCMXO0lXo",
      authDomain: "helpinghands506.firebaseapp.com",
      databaseURL: "https://helpinghands506.firebaseio.com",
      projectId: "helpinghands506",
      storageBucket: "helpinghands506.appspot.com",
      messagingSenderId: "652958427997"
    });

      firebase.auth().onAuthStateChanged(user=>{
        if (user) {
          this._zone.run(()=>{
            var curUserToken = firebase.auth().currentUser;
            console.log("ava", curUserToken.photoURL);
            if(curUserToken){
              this.photoURL = curUserToken.photoURL;
            }


          })
        } else {
          // No user is signed in.
        }
      });

      this.initializeApp();
      this.splashScreen.hide();


    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Profile', component: ProfilePage },
      // { title: 'Edit Profile', component: EditProfilePage },
      // { title: 'Home', component: HomePage },
      // { title: 'Login', component: LoginPage },
      //{ title: 'Sign up', component: SignupPage },
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Create Task', component: TaskEditPage },
      { title: 'Search', component: SearchPage },
      { title: 'Settings', component: SettingsPage },
      // { title: 'Home', component: HomePage },
      // { title: 'Sign Out', component: SignoutPage},
      { title: 'How to Use the App', component: IntroductionPage}

    ]
  }

  //auto generated by ionic, this is the start up function for the app
  initializeApp() {

    this.platform.ready().then(() => {

      console.log("appinitiallize");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuCtrl.enable(true, 'right');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //https://ionicthemes.com/tutorials/about/ionic-2-image-handling
  // reduceImages(selected_pictures: any) : any{
  //   return selected_pictures.reduce((promise:any, item:any) => {
  //     return promise.then((result) => {
  //       return this.cropService.crop(item, {quality: 75})
	// 			.then(cropped_image => this.photos.push(cropped_image));
  //     });
  //   }, Promise.resolve());
  // }

  editProfile()
  {
    this.nav.push(EditProfilePage);
  }
}
