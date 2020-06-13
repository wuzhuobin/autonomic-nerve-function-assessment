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

    public reading4_up : any = 0;
    public reading4_down : any = 0;

    public reading4_up_trial : any = [0, 0, 0];
    public reading4_down_trial : any = [0, 0, 0];

    public BP_Trial : any = 0;
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
      console.log(this.RRI15,this.RRI30);
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
                      console.log(data);
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
    var daa = new Uint8Array(1);
    daa[0] = 2;
    this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1218',daa.buffer).then(data2=>{
      this.orthostasis_stage = 3;

      this.testSecondTask = setInterval(()=>{
        this.eachSecond();
      },1000);

      }).catch(error=>{
        console.log(error);
    });

    this.saveDataTask = setInterval(()=>{
      this.readDatafor15and30();
    },200);
    
  }

  takeReading() {
    this.resetValue();
    this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then( () => {
      var daa = new Uint8Array(1);
      daa[0] = 1;
      this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then((data2) => {
        console.log(" reset");
      }).catch(function (error) {
        console.log(error);
      });
    }, function () {
    });
    this.gettingBPTask = setInterval( () => {
      this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then( () => {
        this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1226').then((data2) => {
          this.reading4_status = (new Uint16Array(data2)[0]);
          console.log("this.reading4_status", this.reading4_status, " BP readed", this.bp_readed);
          if (!this.bp_readed) {
            if (this.reading4_status == 0) {
              this.reading4_up_trial[this.BP_Trial] = 0;
              this.reading4_down_trial[this.BP_Trial] = 0;
            }
            else if (this.reading4_status == 1) {
              this.reading4_up_trial[this.BP_Trial] = 0;
              this.reading4_down_trial[this.BP_Trial] = 0;
            }
            else {
              this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1224').then( (dataUP) => {
                if (Math.round((new Uint16Array(dataUP)[0]) / 3) < 300)
                  this.reading4_up_trial[this.BP_Trial] = Math.round((new Uint16Array(dataUP)[0]) / 3);
                else
                  this.reading4_up_trial[this.BP_Trial] = 0;
              }).catch(function (error) {
                console.log(error);
              });
              this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1225').then( (dataDOWN) => {
                if (Math.round((new Uint16Array(dataDOWN)[0]) / 3) < 150)
                  this.reading4_down_trial[this.BP_Trial] = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                else
                  this.reading4_down_trial[this.BP_Trial] = 0;
              }).catch(function (error) {
                console.log(error);
              });
              if (this.reading4_down_trial[this.BP_Trial] != 0 && this.reading4_up_trial[this.BP_Trial] != 0) {
                this.bp_readed = true;
                this.BP_Trial++;
                clearInterval(this.gettingBPTask);
                if (this.BP_Trial >= 3) {
                  this.orthostasis_stage = 5;
                  this.trial = 1;
                }
              }
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      }, function () { });
    }, 300);
  }


  readDatafor15and30() {

    this.result3015 = [];

    if ((this.currentBeatCount - this.baseBeatCount) == 15 && this.RRI15 == 0) {
      this.RRI15 = this.RRIReadng;
    }

    if(( this.currentBeatCount - this.baseBeatCount) == 30 && this.RRI30 == 0 ){
      this.RRI30 = this.RRIReadng;
      this.result3015.push(this.RRI15,this.RRI30);
      
      clearInterval(this.saveDataTask);
    }
    
  }

  clickTestStartOrthostasis(){
  
    this.orthostasis_stage = 1;

    this.bp_readed = false;

     this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 1;
         this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           //console.log(data2);
           }).catch(error=>{
             //console.log(error);
           });
 
       },
       ()=>{
       }
     );

     this.gettingBPTask =  setInterval(()=>{

      this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then( 
        ()=>{ 

          this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1226').then(data2=>{
            
            this.reading4_status = (new Uint16Array(data2)[0]);
  
            if(!this.bp_readed){
                  if(this.reading4_status==0){
                    this.reading4_up = 0;
                    this.reading4_down = 0;
                  } else if(this.reading4_status == 1){
                    this.reading4_up = 0;
                    this.reading4_down = 0;
                  } else {
                    
                    this.bp_readed = true;

                    this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1224').then(dataUP=>{
                      if(Math.round((new Uint16Array(dataUP)[0]) / 3)<150)
                      this.reading4_up  = Math.round((new Uint16Array(dataUP)[0]) / 3);
                      else
                      this.reading4_up  = "0";
                    }).catch(error=>{
                    console.log("e1");
                    });
  
                    this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1225').then(dataDOWN=>{
                      if(Math.round((new Uint16Array(dataDOWN)[0]) / 3)<150)
                      this.reading4_down  = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                      else
                      this.reading4_down  = "0";
                      
                    }).catch(error=>{
                    console.log("e2");
                    });

                    clearInterval(this.gettingBPTask);

                    console.log(this.result.length);
                    console.log(JSON.stringify(this.result));
                    
                    this.orthostasis_stage = 2;
                    this.resetValue();
  
                  }
  
                 }
           }).catch(error=>{
             console.log(error);
           });
  
  
  
            
        },
        ()=>{}
      );
     },1000);

  }


  redoTest(){
    
  this.result = [];
  this.trial = 0;
  this.orthostasis_stage = 0;
    this.currentTime = 180;
    this.loadProgress = 100;
    this.bp_readed = false;
    this.reading4_up = 0;
    this.reading4_down=0;
    this.resetValue();
    this.timesup = false;
    this.RRI15 = 0;
    this.RRI30 = 0;
    this.reading4_up_trial = [0, 0, 0];
    this.reading4_down_trial=[0, 0, 0];

    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);


  }


  eachSecond(){
    this.currentTime--;
    this.currentTimeTextM = Math.floor(this.currentTime / 60);
    this.currentTimeTextS = (this.currentTime % 60);
    this.loadProgress = (this.currentTime / 180) * 100;
    console.log("this.loadProgress", this.loadProgress);
    if (this.currentTime == 125 || this.currentTime == 65 ||
        this.currentTime == 5) {
        this.bp_readed = false;
        this.takeReading();
    }
    if(this.currentTime<=0){

        clearInterval(this.testSecondTask);
        //this.orthostasis_stage = 4;
        //this.bp_readed = false;
      } 
  }

  resetValue(){
     this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           //console.log(data2);
           }).catch(error=>{
             //console.log(error);
           });
 
       },
       ()=>{}
     );
    }

    getRRIvalue(){

      this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(
        ()=>{ 
  
          this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9','19b10000-e8f2-537e-4f6c-d104768a1216','19b10001-e8f2-537e-4f6c-d104768a1216').then(data2=>{
            
            if((new Uint16Array(data2)[0])>500 && (new Uint16Array(data2)[0])<1450)
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
        ()=>{ }
      );
  
    }
  


}
