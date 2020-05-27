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
    public loadProgress = 100;
    public result : number[] = [];

    public datab: SQLiteObject;

    public patient_id:any;

    public bp_readed : boolean = false; 
    public handgrip_stage :any= 0; 

    public reading4_status: any = 0;
    public reading4_up : any = 0;
    public reading4_down : any = 0;

    public reading4_up2 : any = 0;
    public reading4_down2 : any = 0;

    public grip_reading_max : any = 0;
    public grip_reading : any = 0;

    public trial : any = 0;

    constructor( private storage: Storage , private sqlite: SQLite ,public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get('id').then((val) => {
      console.log(' id is', val);
      this.patient_id = val;
    });


    this.checkDeviceTask = setInterval(()=>{
      this.checkAllHardware();
    },300);

    this.gettingGripTask = setInterval(()=>{
      this.getGripReading();
    },50);

    this.clickTestStartOrthostasis();

   this.handgrip_stage = 0; 

  }
  
  getGripReading(){
    this.ble.isConnected('E69A1D2B-7877-E45B-A5AB-19D0D4C6C22F').then(
      ()=>{ 

        this.ble.read('E69A1D2B-7877-E45B-A5AB-19D0D4C6C22F','19b10000-e8f2-537e-4f6c-d104768a1220','19b10001-e8f2-537e-4f6c-d104768a1220').then(data2=>{
          this.grip_reading = (new Uint8Array(data2)[0]);
            if(this.handgrip_stage == 1 && this.grip_reading > this.grip_reading_max){
              this.grip_reading_max = this.grip_reading;
            }
          }).catch(error=>{
            console.log(error);
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
      this.result.push(this.reading4_up2);
      this.result.push(this.reading4_down2);

      if(this.reading4_up == 0 || this.reading4_down == 0 || this.reading4_up2 == 0 || this.reading4_down2 == 0 ){
        this.datab.executeSql("UPDATE patient_table SET t3_1 = '[]' where id='"+this.patient_id+"';", {})
          .then(() => {
            console.log("update empty");
            this.navCtrl.setRoot(Test3Page, {}, {animate : false, direction: 'forward'});
           });
      } else {
        let data = [JSON.stringify(this.result)]
        this.datab.executeSql("UPDATE patient_table SET t3_1 = ? where id='"+this.patient_id+"';", data)
          .then(() => {
            console.log("update");
            this.navCtrl.setRoot(Test3Page, {}, {animate : false, direction: 'forward'});
           });
      }



      });

  }

  clickTestStartOrthostasis(){


    this.bp_readed = false;

     this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 1;
         this.ble.write('BEE5D114-1482-A85C-6861-256ABE298898','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           }).catch(error=>{
             console.log(error);
           });
 
       },
       ()=>{
       }
     );

     this.gettingBPTask =  setInterval(()=>{

      this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then( 
        ()=>{ 

          this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1226').then(data2=>{
            
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

                    this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1224').then(dataUP=>{
                      if(Math.round((new Uint16Array(dataUP)[0]) / 3)<300)
                      this.reading4_up  = Math.round((new Uint16Array(dataUP)[0]) / 3);
                      else
                      this.reading4_up  = "0";
                    }).catch(error=>{
                    console.log(error);
                    });
  
                    this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1225').then(dataDOWN=>{
                      if(Math.round((new Uint16Array(dataDOWN)[0]) / 3)<150)
                      this.reading4_down  = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                      else
                      this.reading4_down  = "0";

                    }).catch(error=>{
                    console.log(error);
                    });

                    clearInterval(this.gettingBPTask);
                    
                    this.loadProgress = 100;
                    this.currentTime = 300;
                    this.handgrip_stage = 1;
                    this.bp_readed = false;
                    /*this.testSecondTask = setInterval(()=>{
                      this.eachSecond();
                    },1000);*/

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

  skipSecond(){
    this.currentTime = 10;
  }

  gotoStage2(){
    this.handgrip_stage = 2;
    this.loadProgress = 100;
    this.currentTime = 300;
    this.testSecondTask = setInterval(()=>{

      this.eachSecond2();

    },1000);
  }

  redoTest(){
    clearInterval(this.testSecondTask);
    clearInterval(this.gettingBPTask);

    this.result = [];
    this.trial = 0;
    this.handgrip_stage = 0;
    this.currentTime = 20;
    this.loadProgress = 100;
    this.bp_readed = false;
    this.reading4_status = 0;
    this.reading4_up = 0;
    this.reading4_up2 = 0;
    this.reading4_down=0;
    this.reading4_down2=0;
    this.grip_reading_max  = 0;
    this.grip_reading = 0;
    this.resetValue();



    this.clickTestStartOrthostasis();


  }


  eachSecond2(){

    this.currentTime--;
    this.loadProgress = (this.currentTime / 300 )*100;

    if(this.currentTime<=0){

        clearInterval(this.testSecondTask);
        this.loadProgress = 100;
        this.currentTime = 300;
        this.handgrip_stage = 3;
        this.bp_readed = false;

        this.stage3();

      } 
  }

  stage3(){

    this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then(
      ()=>{ 
        var daa = new Uint8Array(1);
        daa[0] = 1;
        this.ble.write('BEE5D114-1482-A85C-6861-256ABE298898','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
          console.log("stage3 reset");
          }).catch(error=>{
            console.log(error);
          });

      },
      ()=>{
      }
    );

    this.gettingBPTask =  setInterval(()=>{

      this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then( 
        ()=>{ 

          this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1226').then(data2=>{

            this.reading4_status = (new Uint16Array(data2)[0]);
  
            if(!this.bp_readed){
                  if(this.reading4_status==0){
                    this.reading4_up2 = 0;
                    this.reading4_down2 = 0;
                  } else if(this.reading4_status == 1){
                    this.reading4_up2 = 0;
                    this.reading4_down2 = 0;
                  } else {
                    
                    this.bp_readed = true;

                    this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1224').then(dataUP=>{
                      if(Math.round((new Uint16Array(dataUP)[0]) / 3)<300)
                      this.reading4_up2  = Math.round((new Uint16Array(dataUP)[0]) / 3);
                      else
                      this.reading4_up2  = "ERR";
                    }).catch(error=>{
                    console.log(error);
                    });
  
                    this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1225').then(dataDOWN=>{
                      if(Math.round((new Uint16Array(dataDOWN)[0]) / 3)<150)
                      this.reading4_down2  = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                      else
                      this.reading4_down2  = "ERR";
                    }).catch(error=>{
                    console.log(error);
                    });

                    clearInterval(this.gettingBPTask);
                    
                    this.handgrip_stage = 4;
                    this.trial = 1;
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


  checkAllHardware(){
    this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then(
      ()=>{ 
        this.hardwareReady = true; 
      },
      ()=>{ this.hardwareReady = false; 
      }
    );
  }

  resetValue(){
     this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then(
       ()=>{ 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('BEE5D114-1482-A85C-6861-256ABE298898','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           console.log("reset");
           }).catch(error=>{
             console.log(error);
           });
 
       },
       ()=>{}
     );
    }


}
