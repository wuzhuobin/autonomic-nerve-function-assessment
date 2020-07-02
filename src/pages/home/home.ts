import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Test1Page } from '../test1/test1';
import { TestEndPage } from '../testEnd/testEnd';
import { TestConfigPage } from '../testConfig/testConfig';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import moment from 'moment';

import { Storage } from '@ionic/storage';
import { isNumber } from 'ionic-angular/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public datab : SQLiteObject;

  constructor( private storage: Storage , public navCtrl: NavController , public alertCtrl :AlertController , private sqlite: SQLite) {

  }

  clickStart(){
    this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
  }
   
  clickRecord(){
    this.navCtrl.setRoot(TestEndPage, {}, {animate : false, direction: 'forward'});
  }

  loadConfig(){
    this.navCtrl.setRoot(TestConfigPage, {parent:HomePage}, {animate: true, direction: 'forward'});
  }

  showPrompt(){

    /*this.storage.set('id', "4").then(sss=>{
      this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
    });

    return false;
*/
    let alert = this.alertCtrl.create({
      title: 'Create New Record',
      inputs: [
        {
          name: 'name',
          placeholder: 'Patient Name'
        },
        {
          name: 'age',
          placeholder: 'Age',
          type: 'number'
        }
      ],
      buttons: [
        
        {
          text: 'Create',
          handler: formdata => {



            if (formdata.name=="" || formdata.age=="") {
              this.showAlert();
              return false;
            } else if(parseInt(formdata.age)==0){
              this.showAlert();
              return false;
            } else {

              this.sqlite.create({
                name: 'recorder.db',
                location: 'default'
                    }).then((db: SQLiteObject) => {
                
                        this.datab = db;

                        //this.datab.executeSql(`Drop table patient_table`,{}); 
                        this.datab.executeSql(`create table if not exists patient_table (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name VARCHAR(100), 
                          age VARCHAR(4), 
                          t1_1 VARCHAR(1000), 
                          t1_2 VARCHAR(1000),
                          t1_3 VARCHAR(1000), 
                          t2_1 VARCHAR(1000), 
                          t2_2 VARCHAR(1000), 
                          t2_3 VARCHAR(1000), 
                          t3_1 VARCHAR(1000), 
                          t3_2 VARCHAR(1000), 
                          t3_3 VARCHAR(1000), 
                          t4_1 VARCHAR(1000), 
                          t4_2 VARCHAR(1000), 
                          t4_3 VARCHAR(1000), 
                          t5_1 VARCHAR(1000), 
                          t5_2 VARCHAR(1000), 
                          t5_3 VARCHAR(1000), 
                          createTime VARCHAR(50))`, {
                          });

                          this.datab.executeSql(`insert into patient_table (id , name , age ,
                            t1_1, t1_2, t1_3, t2_1, t2_2 , t2_3 , 
                            t3_1, t3_2 , t3_3 ,t4_1, t4_2 , t4_3 ,
                            t5_1, t5_2 , t5_3 , createTime) 
                          VALUES (null,'`+formdata.name+`','`+formdata.age+`',
                          '[]','[]','[]',
                          '[]','[]','[]',
                          '[]','[]','[]',
                          '[]','[]','[]',
                          '[]','[]','[]','`+moment().format('YYYY-MM-DD HH:mm:ss')+`');`, {}).then((data2) => {
                       
                            this.storage.set('id', data2.insertId).then(sss=>{
                              console.log("RECORD CREATED: "+data2.insertId+" "+formdata.name+" "+formdata.age+" "+moment().format('YYYY-MM-DD HH:mm:ss'));
                              this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
                            });
                           });

                  });
            }

          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present(); 
    
  }

  clickClearData() {
    var alert = this.alertCtrl.create({
      title: 'Do you want to clear all data?',
      buttons: [
        {
          text: 'OK',
          handler: function () {
            this.sqlite.create({
              name: 'recorder.db',
              location: 'default'
            }).then(function (db) {
              this.datab = db;
              this.datab.executeSql("Drop table patient_table", {}).then(function () {
              });
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: function (data) {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title: 'Input Error',
      subTitle: 'Please fill in patient name and age.<BR>Age must be a number.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}

