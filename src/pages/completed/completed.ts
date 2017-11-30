import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskObjectProvider} from "../../providers/task-object/task-object";
import { TaskViewPage} from "../task-view/task-view";
import { AngularFireDatabase } from "angularfire2/database";
import { ProfileProvider} from "../../providers/profile/profile";
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { cloudProvider } from '../../providers/cloudbase';
import {isDefined, noUndefined} from "@angular/compiler/src/util";
import {isNullOrUndefined} from "util";


/**
 * Generated class for the CompletedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})

export class CompletedPage {

  tasks: Array<TaskObjectProvider> = [];
  skills: Array<boolean>;
  curUserToken = this.AFcurUser.auth.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  db = firebase.firestore();

  taskOwnerDict = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private AFdatabase: AngularFireDatabase,
              public AFcurUser: AngularFireAuth,
  ) {
      // Wait for view to load to generate list of tasks
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
    this.loadCompletedTasks();
  }

  loadCompletedTasks(){


    /** Testing getting list of owned tasks**/
    // console.log('current user: ', this.curUserToken.uid );
    // this.db.collection("users").doc(this.curUserToken.uid).collection('ownedTask').get().then((ownedTasks)=> {
    //   ownedTasks.forEach( (doc)=>{
    //     let task = new TaskObjectProvider(
    //       doc.data()['taskName'],
    //       doc.data()['timeDuration'],
    //       doc.data()['timeStart'],
    //       doc.data()['taskDescription'],
    //       doc.data()['timeEnd'],
    //       doc.data()['wantedSkills'],
    //       doc.data()['completed'],
    //       doc.data()['ownerUserId']
    //     );
    //
    //     console.log("log task:", task);
    //
    //   });
    // });


    /** Get completed tasks for current owner  **/
    var self = this; //This is needed because "this" loses context inside next "function"
    // this.db.collection("tasks").get().then(function(querySnapshot) {
    // this.db.collection("users").doc(this.curUserToken.uid).collection('ownedTask').get().then(function(task) {
    //   task.forEach(function(doc) {
    //     console.log(doc.id, " => ", doc.data());
    //     //Create new task for each doc
    //     let task = new TaskObjectProvider(
    //       doc.data()['taskName'],
    //       doc.data()['timeDuration'],
    //       doc.data()['timeStart'],
    //       doc.data()['taskDescription'],
    //       doc.data()['timeEnd'],
    //       doc.data()['wantedSkills'],
    //       doc.data()['completed'],
    //       doc.data()['ownerUserId']
    //     );


    this.db.collection("users").doc(this.curUserToken.uid).collection('ownedTask').get().then((ownedTasks)=> {
      ownedTasks.forEach( (doc)=>{
        console.log('display doc: ', doc);
        let task = new TaskObjectProvider(
          doc.data()['taskName'],
          doc.data()['taskId'],
          doc.data()['timeDuration'],
          doc.data()['timeStart'],
          doc.data()['timeEnd'],
          doc.data()['TaskDescription'],
          doc.data()['wantedSkills'],
          doc.data()['complete'],
          doc.data()['ownerName'],
          doc.data()['ownerUserId'],
          doc.data()['location'],
        );
        // console.log("complete: ", doc.data()['Complete']);
        console.log("log task:", task);


        task.setTaskId(doc.data()['taskId']);

        if (task.completed == true /*&& self.curUserToken.uid == task.ownerUserId */)
        { self.tasks.push(task); }
        //this.completedTasks.push(doc);


        /* Print out owners name*/
        let taskOwner: string = 'Task Owner\'s Name';
        console.log(doc.data()['ownerUserId']);
        console.log(task.ownerUserId);

        /** Get owners name **/
        if( typeof task.ownerUserId  !== 'undefined'){

          var userRef = self.db.collection("users").doc(task.ownerUserId);
          userRef.get().then(function(doc) {
            if (doc.exists) {
              console.log("Document has data: ", doc.data());
              taskOwner = doc.data()['firstName'] + ' ' + doc.data()['lastName'];
              // Store ownerID --> ownerName in dictionary
              console.log('taskId: ', task.getTaskId(), 'taskOwner', taskOwner);
              self.taskOwnerDict[task.getTaskId()] = taskOwner;
            } else {
              console.log("No such document!");
              taskOwner = 'No Owner';
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
            taskOwner = error;
          });
        } //END get owners Name

      }); //END .then function
    });

  }


  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
