import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Test3Page } from '../test3/test3';
import { TestStartPage } from '../testStart/testStart';
import { BLE } from '@ionic-native/ble';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import moment from 'moment';


@Component({
  selector: 'page-test3detail',
  templateUrl: 'test3detail.html',
})
export class Test3DetailPage {

    public hardwareReady :boolean = false;

    public checkDeviceTask : any;
    public testSecondTask : any;
    public gettingBPTask : any;
    public gettingGripTask : any;

    public currentTime = 20;
    public currentTimeTextM: any = "5";
    public currentTimeTextS: any = "0";
    public loadProgress = 100;
    public result : number[] = [];
    public BP_Trial: number = 0;
    public BP_Trial_temp = 0;
    public datab: SQLiteObject;

    public patient_id:any;

    public bp_readed : boolean = false; 
    public bp_device_on : boolean = false; 
    public handgrip_stage :any= 0; 

    public reading4_status: any = 0;
    public reading4_up : any = 0;
    public reading4_down : any = 0;

    public reading4_up_trial = [0, 0, 0, 0, 0];
    public reading4_down_trial = [0, 0, 0, 0, 0];

    public grip_reading_max : any = 0;
    public grip_reading : any = 0;

    public trial : any = 0;

    constructor( private storage: Storage , private sqlite: SQLite ,public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get('id').then((val) => {
      // console.log(' id is', val);
      this.patient_id = val;
    });


    this.checkDeviceTask = setInterval(()=>{
      this.checkAllHardware();
    },300);

    this.gettingGripTask = setInterval(()=>{
      this.getGripReading();
    },50);

    this.clickTestStartOrthostasis();

   this.handgrip_stage = 1; 

  }
  
  getGripReading(){
    this.ble.isConnected('3C1FD496-0DEB-4713-662F-FAE7AE85F548').then(
      ()=>{ 

        this.ble.read('3C1FD496-0DEB-4713-662F-FAE7AE85F548','19b10000-e8f2-537e-4f6c-d104768a1220','19b10001-e8f2-537e-4f6c-d104768a1220').then(data2=>{
          this.grip_reading = (new Uint8Array(data2)[0]);
            if(this.handgrip_stage == 15 && this.grip_reading > this.grip_reading_max){
              this.grip_reading_max = this.grip_reading;
            }
          }).catch(error=>{
            console.error("Test3DetailPage#getGripReading");
            console.error(error);
          });

      },
      ()=>{}
    );

  }

  backTest3(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);
    clearInterval(this.gettingGripTask);

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.datab = db;

      this.result.push(this.reading4_up);
      this.result.push(this.reading4_down);
      this.result.push(this.reading4_up_trial[0]);
      this.result.push(this.reading4_down_trial[0]);
      this.result.push(this.reading4_up_trial[1]);
      this.result.push(this.reading4_down_trial[1]);
      this.result.push(this.reading4_up_trial[2]);
      this.result.push(this.reading4_down_trial[2]);
      this.result.push(this.reading4_up_trial[3]);
      this.result.push(this.reading4_down_trial[3]);
      this.result.push(this.reading4_up_trial[4]);
      this.result.push(this.reading4_down_trial[4]);

      if (this.reading4_up == 0 || this.reading4_down == 0 || this.reading4_down_trial[0] == 0) {
        this.datab.executeSql("UPDATE patient_table SET t3_1 = '[]' where id='"+this.patient_id+"';", {})
          .then(() => {
            // console.log("update empty");
            this.navCtrl.setRoot(Test3Page, {}, {animate : false, direction: 'forward'});
           });
      } else {
        let data = [JSON.stringify(this.result)]
        this.datab.executeSql("UPDATE patient_table SET t3_1 = ? where id='"+this.patient_id+"';", data)
          .then(() => {
            // console.log("update");
            this.navCtrl.setRoot(Test3Page, {}, {animate : false, direction: 'forward'});
           });
      }



      });

  }

  clickTestStartOrthostasis(){


    this.bp_readed = false;

     this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 5;
         this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           }).catch(error=>{
             console.error("Test3DetailPage#clickTestStartOrthostasis");
             console.error("BP writing");
             console.error(error);
           });
 
       },
       ()=>{
       }
     );

                    
    this.loadProgress = 100;
    this.currentTime = 300;
    this.bp_readed = false;
    this.resetValue();

  }

  skipSecond(){
    this.currentTime = 10;
  }

  gotoStage2(){
    this.handgrip_stage = 2;
    this.loadProgress = 100;
    this.currentTime = 300;
    this.currentTimeTextM = "5";
    this.currentTimeTextS = "0";
    this.testSecondTask = setInterval(()=>{

      this.eachSecond2();

    },1000);
  }


  completeTest3() {
    this.handgrip_stage = 4;
    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then( () => {
      var daa = new Uint8Array(1);
      daa[0] = 4;
      this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
        // console.log("power");
      }).catch(function (error) {
        console.error("Test3DetailPage#completeTest3");
        console.error("BP writing");
        console.error(error);
      });
    }, function () { });
    clearInterval(this.testSecondTask);
  }

  gotoStage15() {
    this.handgrip_stage = 15;
  }

  takeReading(){
    this.BP_Trial_temp = this.BP_Trial;
    this.resetValue();
    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
      ()=>{ 
        var daa = new Uint8Array(1);
        daa[0] = 1;
        this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
          }).catch(error=>{
            console.error("Test3DetailPage#takeReading");
            console.error("BP writing");
            console.error(error);
          });

      },
      ()=>{
      });

    this.bp_readed = true;
    clearInterval(this.gettingBPTask);
    this.BP_Trial++;
    if (this.BP_Trial >= 5) {
      this.trial = 1;
    }
  }

  redoTest(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);
    clearInterval(this.gettingGripTask);

    this.currentTimeTextM = "5";
    this.currentTimeTextS = "0";
    this.result = [];
    this.trial = 0;
    this.handgrip_stage = 1;
    this.currentTime = 20;
    this.loadProgress = 100;
    this.bp_readed = false;
    this.reading4_status = 1;
    this.reading4_up = 0;
    this.reading4_down_trial = [0, 0, 0, 0, 0];
    this.reading4_down = 0;
    this.reading4_up_trial = [0, 0, 0, 0, 0];
    this.grip_reading_max  = 0;
    this.grip_reading = 0;
    this.resetValue();
    this.powerSignal();
    this.resetValue();
    setTimeout(() => { this.clickTestStartOrthostasis(); }, 1000);        
  }

  eachSecond2() {
    this.currentTime--;
    this.currentTimeTextM = Math.floor(this.currentTime / 60);
    this.currentTimeTextS = (this.currentTime % 60);
    this.loadProgress = (this.currentTime / 300) * 100;
    if (this.currentTime == 245 || this.currentTime == 185 ||
      this.currentTime == 125 || this.currentTime == 65 || this.currentTime == 5) {
      this.bp_readed = false;
      // Power off the BP device first
      this.powerSignal();
      this.takeReading();
    }
    if (this.currentTime <= 0) {
      clearInterval(this.testSecondTask);
      //this.loadProgress = 100;
      //this.currentTime = 300;
      //this.handgrip_stage = 3;
    }
  }
  
  checkAllHardware(){
    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
      ()=>{ 
        this.hardwareReady = true; 
      },
      ()=>{ this.hardwareReady = false; 
      }
    );
  }

  resetValue(){
     this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
          //  console.log("reset");
           }).catch(error=>{
             console.error("Test3DetailPage#resetValue");
             console.error("Bp writing");
             console.error(error);
           });
 
       },
       ()=>{}
     );
    }

    
    powerSignal() {
        this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then( () => {
            var daa = new Uint8Array(1);
            daa[0] = 3;
            this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                // console.log("power");
            }).catch(function (error) {
                console.error("Test3Detail#powerSignal");
                console.error("BP writing");
                console.error(error);
            });
        }, function () { });
    }

}
