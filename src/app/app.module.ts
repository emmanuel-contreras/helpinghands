import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule} from "angularfire2";
import { FIREBASE_CONFIG} from "./app.firebase.config";
import { AngularFireAuthModule} from "angularfire2/auth";
import {UserProfilePage} from '../pages/user-profile/user-profile';
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { ProfileProvider } from '../providers/profile/profile';
import { TaskObjectProvider } from '../providers/task-object/task-object'; //provider
import {DashboardPage} from "../pages/dashboard/dashboard";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    UserProfilePage,
    EditProfilePage,
    DashboardPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),  //initialize fire base
    AngularFireAuthModule, //import auth module
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    UserProfilePage,
    EditProfilePage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider,
    TaskObjectProvider,
  ]
})
export class AppModule {}
