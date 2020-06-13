import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Test4Page } from '../test4/test4';
import { TestStartPage } from '../testStart/testStart';
import { Test4DetailPage_2 } from '../test4detail_2/test4detail_2';
import { BLE } from '@ionic-native/ble';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import moment from 'moment';


@Component({
  selector: 'page-test4detail',
  templateUrl: 'test4detail.html',
})
export class Test4DetailPage {

    public heartRateDeviceConnected :boolean = false;
    
    public RRIReadng : any = 0;

    public checkDeviceTask : any;
    public countdownTask : any;
    public testSecondTask : any;
    public saveDataTask : any;

    public gettingBPTask : any;

    public currentTime = 5;
    public trial = 0;

    public loadProgress = 100;

    public baseBeatCount = 0;
    public currentBeatCount = 0;

    public RRI15 = 0;
    public RRI30 = 0;

    public CountdownSecond : any = 3;

    public showDeviceConnectTable : boolean ;
    public showTestingTable : boolean ;
    public showCountdownTable : boolean ;
    
    public tempString = "";

    public stand : boolean = false;
    public result : number[] = [];
    public result3015 : number[] = [];

    public datab: SQLiteObject;

    public patient_id:any;

    constructor( private storage: Storage , private sqlite: SQLite ,public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get('id').then((val) => {
      console.log(' id is', val);
      this.patient_id = val;
    });

    this.showDeviceConnectTable = true;
    this.checkDeviceTask = setInterval(()=>{
      this.checkAllHardware();
    },300);

    setTimeout( ()=>{
      this.connectHeartRate();
    },1000);

    this.clickTestStart();
  }

  gotoOrthostasis(){

    clearInterval(this.checkDeviceTask);
    clearInterval(this.countdownTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.saveDataTask);

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.datab = db;

      let data = [JSON.stringify(this.result3015)]
        this.datab.executeSql("UPDATE patient_table SET t4_1 = ? where id='"+this.patient_id+"';", data)
          .then(() => {
            console.log(data);
            this.navCtrl.setRoot(Test4DetailPage_2, {}, {animate : false, direction: 'forward'});
           });

      });

  }


  backTest4(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.countdownTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.saveDataTask);

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.datab = db;

      let data = [JSON.stringify(this.result3015)]
        this.datab.executeSql("UPDATE patient_table SET t4_1 = ? where id='"+this.patient_id+"';", data)
          .then(() => {
            console.log(data);
            this.navCtrl.setRoot(Test4Page, {}, {animate : false, direction: 'forward'});
           });

      });

  }

  clickTestStart(){

    var daa = new Uint8Array(1);
    daa[0] = 2;
    this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9','19b10000-e8f2-537e-4f6c-d104768a1216','19B10001-E8F2-537E-4F6C-D104768A1218',daa.buffer).then(data2=>{
      console.log(data2);
      }).catch(error=>{
        console.log(error);
      });

    this.showDeviceConnectTable = false;
    
    this.showCountdownTable = true;

    this.stand = false;

    this.countdownTask = setInterval(()=>{
      this.CountdownSecond--;
      if(this.CountdownSecond==0){  //count down up

        this.showCountdownTable= false;
        this.showTestingTable = true;

        this.testSecondTask = setInterval(()=>{
          this.eachSecond();
        },1000); 

        this.saveDataTask = setInterval(()=>{
          this.readDatafor15and30();
        },200);
        
        clearInterval(this.countdownTask);
      }
    },1000);
  }

  redoTestOrthostasis(){

  }

  redoTest(){
  this.result = [];
  this.trial--;
  this.RRI15 = 0;
  this.RRI30 = 0;
    this.CountdownSecond = 3;
    this.currentTime = 5;
    this.loadProgress = 100;
    this.stand = false;

var daa = new Uint8Array(1);
    daa[0] = 2;
    this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9','19b10000-e8f2-537e-4f6c-d104768a1216','19B10001-E8F2-537E-4F6C-D104768A1218',daa.buffer).then(data2=>{
      console.log(data2);
      }).catch(error=>{
        console.log(error);
      });

    this.showDeviceConnectTable = false;
    
    this.showCountdownTable = true;


    this.countdownTask = setInterval(()=>{
      this.CountdownSecond--;
      if(this.CountdownSecond==0){  //count down up

        this.showCountdownTable= false;
        this.showTestingTable = true;

        this.testSecondTask = setInterval(()=>{
          this.eachSecond();
        },1000); 

        this.saveDataTask = setInterval(()=>{
          this.readDatafor15and30();
        },200);
        
        clearInterval(this.countdownTask);
      }
    },1000);

}

  readDatafor15and30(){

    console.log(( this.currentBeatCount - this.baseBeatCount));
    if(this.stand && ( this.currentBeatCount - this.baseBeatCount) >= 15 && this.RRI15 == 0 ){
      this.RRI15 = this.RRIReadng;
    }

    if(this.stand && ( this.currentBeatCount - this.baseBeatCount) >= 30 && this.RRI30 == 0 ){
      this.RRI30 = this.RRIReadng;
      this.showCountdownTable= false;
      this.showTestingTable = false;
      this.finishTaking();
    }
  }

  finishTaking (){

    clearInterval(this.countdownTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.saveDataTask);

    this.result.push(this.RRI15,this.RRI30);

    this.result3015 = this.result;
    this.trial = 1;

    this.showDeviceConnectTable = true;

    this.CountdownSecond = 3;
    this.currentTime = 5;
    this.loadProgress = 100;
    this.stand = false;

  }

  eachSecond(){
    this.currentTime--;
    this.loadProgress = (this.currentTime / 5)*100;

    if(this.currentTime<=0){

        clearInterval(this.testSecondTask);
        this.stand = true;
        this.baseBeatCount = this.currentBeatCount;

      } 
  }


  checkAllHardware(){

    this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(
      ()=>{ 
        this.heartRateDeviceConnected = true; 

        this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9','19b10000-e8f2-537e-4f6c-d104768a1216','19b10001-e8f2-537e-4f6c-d104768a1216').then(data2=>{
          
          if((new Uint16Array(data2)[0])>560 && (new Uint16Array(data2)[0])<1450)
          this.RRIReadng = (new Uint16Array(data2)[0]);

          }).catch(error=>{
            console.log(error);
          });

          this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9','19b10000-e8f2-537e-4f6c-d104768a1216','19b10001-e8f2-537e-4f6c-d104768a1217').then(data2=>{
            this.currentBeatCount = (new Uint16Array(data2)[0]);

            }).catch(error=>{
              console.log(error);
            });

      },
      ()=>{ this.heartRateDeviceConnected = false; 
      }
    );

    if(!this.heartRateDeviceConnected){
      this.connectHeartRate();
    }

  }

  connectHeartRate(){
    this.ble.scan([], 3).subscribe(device => {
      console.log(JSON.stringify(device));
      
      this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(data => {
        this.heartRateDeviceConnected = true;
        },error =>{
          console.log(error);

        });

  });
  }


  resetValue(){
     this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           console.log(data2);
           }).catch(error=>{
             console.log(error);
           });
 
       },
       ()=>{}
     );
    }


}