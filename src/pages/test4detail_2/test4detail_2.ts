import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Test4Page } from '../test4/test4';
import { TestStartPage } from '../testStart/testStart';
import { BLE } from '@ionic-native/ble';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import moment from 'moment';


@Component({
  selector: 'page-test4detail_2',
  templateUrl: 'test4detail_2.html',
})
export class Test4DetailPage_2 {

    public testSecondTask : any;
    public gettingBPTask : any;
    public gettingHRTask : any;
    public countdownTask : any;
    public saveDataTask : any;

    public currentTime = 180;
    public currentTimeTextM: any = "3";
    public currentTimeTextS: any = "0";
    public loadProgress = 100;
    public result : number[] = [];

    public datab: SQLiteObject;

    public patient_id:any;

    public bp_readed : boolean = false; 
    public orthostasis_stage :any= 0; 

    public reading4_status: any = 0;

    public reading4_up : number = 0;
    public reading4_down : number = 0;

    public reading4_up_trial : number[] = [0, 0, 0];
    public reading4_down_trial : number[] = [0, 0, 0];

    public BP_Trial : number = 0;
    public BP_Trial_temp : number = 0;
    public trial : any = 0;
    
    public RRIReadng : any = 0;

    public baseBeatCount = 0;
    public currentBeatCount = 0;

    public RRI15 = 0;
    public RRI30 = 0;

    public CountdownSecond : any = 3;
    
    public tempString = "";

    public stand : boolean = false;
    public result2 : number[] = [];
    public result3015 : number[] = [];

    public timesup:boolean = false;

    constructor( private storage: Storage , private sqlite: SQLite ,public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get('id').then((val) => {
      //console.log(' id is', val);
      this.patient_id = val;
    });


    this.resetValue(); 

    this.gettingHRTask = setInterval(()=>{
      this.getRRIvalue();
      // console.log(this.RRI15,this.RRI30);
    },200);

  }

  backTest4(){
    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);
    clearInterval(this.gettingHRTask);
    clearInterval(this.countdownTask);
    clearInterval(this.saveDataTask);

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
      let data = [JSON.stringify(this.result)]
      let data2 = [JSON.stringify(this.result3015)]

        this.datab.executeSql("UPDATE patient_table SET t4_2 = ? where id='"+this.patient_id+"';", data)
          .then(() => {
                    this.datab.executeSql("UPDATE patient_table SET t4_1 = ? where id='"+this.patient_id+"';", data2)
                    .then(() => {
                      // console.log(data);
                      this.navCtrl.setRoot(Test4Page, {}, {animate : false, direction: 'forward'});
                    });
           });

      });

  }
  
  standup25() {
    this.orthostasis_stage = 25;
  }

  standup(){
    this.RRI15 = 0;
    this.RRI30 = 0;
    this.currentBeatCount = 0;
    // var daa = new Uint8Array(1);
    // daa[0] = 2;
    // this.ble.write('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C', '180D', '2A37',daa.buffer).then(data2=>{
      this.orthostasis_stage = 3;

      this.testSecondTask = setInterval(()=>{
        this.eachSecond();
      },1000);

    //   }).catch(error=>{
    //     console.log(error);
    // });

    this.saveDataTask = setInterval(()=>{
      this.readDatafor15and30();
    },200);
    
  }

  takeReading() {
    this.resetValue();
    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then( () => {
      var daa = new Uint8Array(1);
      daa[0] = 1;
      this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then((data2) => {
        // console.log(" reset");
      }).catch(function (error) {
        console.error("Test4Detail_2Page#takeReading");
        console.error("BP writing");
        console.error(error);
      });
    }, function () {
    });
    this.bp_readed = true;
    this.BP_Trial++;
    if (this.BP_Trial >= 3) {
      this.trial = 1;
    }
  }


  readDatafor15and30() {

    this.result3015 = [];

    if ((this.currentBeatCount - this.baseBeatCount) == 15 && this.RRI15 == 0) {
      this.RRI15 = this.RRIReadng;
    }

    if(( this.currentBeatCount - this.baseBeatCount) == 30 && this.RRI30 == 0 ){
      this.RRI30 = this.RRIReadng;
      this.result3015[0] = this.RRI15;
      this.result3015[1] = this.RRI30;
      // this.result3015.push(this.RRI15,this.RRI30);
      
      clearInterval(this.saveDataTask);
    }
    console.log("//////////////////////////////////////////////////");
    console.log("this.currentBeatCount - this.baseBeatCount");
    console.log(this.currentBeatCount - this.baseBeatCount);
    console.log("RRI15");
    console.log(this.RRI15)
    console.log("RRI30");
    console.log(this.RRI30);
    console.log("//////////////////////////////////////////////////");
    
  }

  clickTestStartOrthostasis() {

    this.orthostasis_stage = 2;

    this.bp_readed = false;

    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
      () => {
        var daa = new Uint8Array(1);
        daa[0] = 5;
        this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(data2 => {
          //console.log(data2);
        }).catch(error => {
          console.error("Test4Detail_2Page#clickTestStartOrthostasis");
          console.error("BP writing");
          console.error(error);
        });

      },
      () => {
      }
    );
    this.resetValue();
  }

  redoTest() {
    this.result = [];
    this.trial = 0;
    this.orthostasis_stage = 0;
    this.currentTime = 180;
    this.loadProgress = 100;
    this.bp_readed = false;
    this.reading4_up = 0;
    this.reading4_down = 0;
    this.resetValue();
    this.timesup = false;
    this.RRI15 = 0;
    this.RRI30 = 0;
    this.reading4_up_trial = [0, 0, 0];
    this.reading4_down_trial = [0, 0, 0];

    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);
  }

  redoTest2() {

    this.result = [];
    this.trial = 0;
    this.orthostasis_stage = 0;
    this.currentTime = 180;
    this.loadProgress = 100;
    this.bp_readed = false;
    this.reading4_up = 0;
    this.reading4_down = 0;
    this.resetValue();

    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(() => {
      let daa: Uint8Array = new Uint8Array(1);
      daa[0] = 4;
      this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then((data2) => {
        // console.log('power');
      }).catch(error => {
        console.error("Test4Detail_2Page#redoTest2");
        console.error("BP writing");
        console.error(error)
      });

    }, () => { });
    this.timesup = false;
    this.RRI15 = 0;
    this.RRI30 = 0;
    this.reading4_up_trial = [0, 0, 0];
    this.reading4_down_trial = [0, 0, 0];

    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);


  }



  eachSecond(){
    this.currentTime--;
    this.currentTimeTextM = Math.floor(this.currentTime / 60);
    this.currentTimeTextS = (this.currentTime % 60);
    this.loadProgress = (this.currentTime / 180) * 100;
    // console.log("this.loadProgress", this.loadProgress);
    if (this.currentTime == 125 || this.currentTime == 65 ||
        this.currentTime == 5) {
        this.bp_readed = false;
        this.powerSignal();
        this.takeReading();
    }
    if(this.currentTime<=0){

        clearInterval(this.testSecondTask);
        //this.orthostasis_stage = 4;
        //this.bp_readed = false;
      } 
  }

  powerSignal() {
    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(() => {
      var daa = new Uint8Array(1);
      daa[0] = 3;
      this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
        // console.log("power");
      }).catch(function (error) {
        console.error("Test4Detail_2Page#powerSignal");
        console.error("BP writing");
        console.error(error);
      });
    }, function () { });
  }

  resetValue(){
     this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           //console.log(data2);
           }).catch(error=>{
             console.error("Test4Detail_2Page#resetValue");
             console.error("BP Writing");
             console.error(error);
           });
 
       },
       ()=>{}
     );
    }

    getRRIvalue(){

      this.ble.isConnected('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C').then(
        ()=>{ 
          this.ble.startNotification('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C', '0x180D', '0x2A37').subscribe((data) => {
          let dataArray = new Uint8Array(data);
          let hasHr = dataArray[0] & 0x01;
          let hasRri = ((dataArray[0] & (0x01 << 4)) >> 4) & 0x01;
          let highByte = 0;
          let lowByte = 0;
          let rri = 0;

          if (hasHr == 0) {
            if (hasRri) {
              highByte = dataArray[3];
              lowByte = dataArray[2];
              rri = (highByte << 8) + lowByte;
              this.RRIReadng = rri;
              this.currentBeatCount += Math.floor((dataArray.length - 2) / 2);
            }
          }
          else if (hasHr == 1) {
            if (hasRri) {
              highByte = dataArray[4];
              lowByte = dataArray[3];
              rri = (highByte << 8) + lowByte;
              this.RRIReadng = rri;
              this.currentBeatCount += Math.floor((dataArray.length - 2) / 2);
            }
          }
          console.log("//////////////////////////////////////////////////");
          console.log("Notified.");
          console.log("");
          console.log("");
          console.log("data:")
          console.log(data);
          console.log("dataArray:");
          console.log(dataArray);
          console.log("hasHr:");
          console.log(hasHr);
          console.log("hasRri:");
          console.log(hasRri);
          console.log("highByte: ");
          console.log(highByte);
          console.log("lowByte: ");
          console.log(lowByte);
          console.log("rri: ");
          console.log(rri);
          console.log("**NEW RRI**");
          console.log(this.RRIReadng);
          console.log("PLUSE COUNT");
          console.log(this.currentBeatCount);
          console.log("//////////////////////////////////////////////////");

        });
          // this.ble.read('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C','180D','2A37').then(data2=>{
            
          //   if((new Uint16Array(data2)[0])>500 && (new Uint16Array(data2)[0])<1450)
          //   this.RRIReadng = (new Uint16Array(data2)[0]);
  
          //   }).catch(error=>{
          //     console.log(error);
          //   });
  
          //   this.ble.read('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C','180D','2A37').then(data2=>{
          //     this.currentBeatCount = (new Uint16Array(data2)[0]);
  
          //     }).catch(error=>{
          //       console.log(error);
          //     });
  
        },
        ()=>{ }
      );
  
    }
  
    completeTest4() {
        this.orthostasis_stage = 5;
        this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(() => {
            var daa = new Uint8Array(1);
            daa[0] = 4;
            this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                // console.log("power");
            }).catch(function (error) {
                console.error("Test4Detail_2Page#completeTest4");
                console.error("BP writing")
                console.error(error);
            });
        }, function () { });
        clearInterval(this.testSecondTask);        
    };


}
