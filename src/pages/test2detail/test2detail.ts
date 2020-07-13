import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Test2Page } from '../test2/test2';
import { TestStartPage } from '../testStart/testStart';
import { BLE } from '@ionic-native/ble';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import moment from 'moment';

@Component({
  selector: 'page-test2detail',
  templateUrl: 'test2detail.html',
})
export class Test2DetailPage {

    public heartRateDeviceConnected :boolean = false;
    
    public RRIReadng : any = 0;

    public checkDeviceTask : any;
    public countdownTask : any;
    public testSecondTask : any;
    public saveDataTask : any;

    public loadProgress = 100;

    public currentTime = 10;
    public trial = 0;

    public loop = 1;

    public CountdownSecond : any = 3;

    public showDeviceConnectTable : boolean ;
    public showTestingTable : boolean ;
    public showCountdownTable : boolean ;
    
    public tempString = "";

    public inhale : boolean = true;

    public result0 : number[] = [];
    public result1 : number[] = [];
    public result2 : number[] = [];

    public inter01 : number[] = [];
    public inter02 : number[] = [];
    public inter03 : number[] = [];
    public inter04 : number[] = [];
    public inter05 : number[] = [];
    public inter06 : number[] = [];

    public tempArray : number[] = [];

    public datab: SQLiteObject;

    constructor( private storage: Storage ,private sqlite: SQLite ,public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {

    this.showDeviceConnectTable = true;
    this.checkDeviceTask = setInterval(()=>{
      this.checkAllHardware();
    },200);

    this.clickTestStart();

  }
  
  backTest2(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.countdownTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.saveDataTask);

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.datab = db;
      this.storage.get('id').then((val) => {
         let data = [JSON.stringify(this.result0),JSON.stringify(this.result1),JSON.stringify(this.result2)]
      
          this.datab.executeSql("UPDATE patient_table SET t2_1 = ? , t2_2 = ? , t2_3 = ? where id='"+val+"'", data)
              .then(() => {
                // console.log(data);
                this.navCtrl.setRoot(Test2Page, {}, {animate : false, direction: 'forward'});
              });

          });

      });


     

  }

  clickTestStart(){
    this.showDeviceConnectTable = false;
    
    this.showCountdownTable = true;

    this.loop = 1;

    this.inter01 = [];
    this.inter02 = [];
    this.inter03 = [];
    this.inter04 = [];
    this.inter05 = [];
    this.inter06 = [];

    this.inhale = true;

    this.countdownTask = setInterval(()=>{
      this.CountdownSecond--;
      if(this.CountdownSecond==0){

        this.showCountdownTable= false;
        this.showTestingTable = true;


        this.testSecondTask = setInterval(()=>{
          this.eachSecond();
        },1000); 

        this.saveDataTask = setInterval(()=>{
          this.addData();
        },1000);
        
        clearInterval(this.countdownTask);
      }
    },1000);
  }

redoTest(){
this.trial--;
this.showDeviceConnectTable = false;
    
this.showCountdownTable = true;

this.loop = 1;

this.inter01 = [];
this.inter02 = [];
this.inter03 = [];
this.inter04 = [];
this.inter05 = [];
this.inter06 = [];

this.inhale = true;

this.countdownTask = setInterval(()=>{
  this.CountdownSecond--;
  if(this.CountdownSecond==0){

    this.showCountdownTable= false;
    this.showTestingTable = true;


    this.testSecondTask = setInterval(()=>{
      this.eachSecond();
    },1000); 

    this.saveDataTask = setInterval(()=>{
      this.addData();
    },1000);
    
    clearInterval(this.countdownTask);
  }
},1000);

}

  addData(){

    if(this.loop == 1){
      this.inter01.push( Math.round( 60000 / this.RRIReadng));
    } else if(this.loop == 2){
      this.inter02.push( Math.round( 60000 / this.RRIReadng));
    } else if(this.loop == 3){
      this.inter03.push( Math.round( 60000 / this.RRIReadng));
    } else if(this.loop == 4){
      this.inter04.push( Math.round( 60000 / this.RRIReadng));
    } else if(this.loop == 5){
      this.inter05.push( Math.round( 60000 / this.RRIReadng));
    } else if(this.loop == 6){
      this.inter06.push( Math.round( 60000 / this.RRIReadng));
    } 
      
  }

  eachSecond(){
    this.currentTime--;
    this.loadProgress = (this.currentTime / 10)*100;

  if(this.currentTime>5){
    this.inhale = true;
  } else {
    this.inhale = false;
  }

    if(this.currentTime<=0){

      if(this.loop == 1){
        // console.log(this.inter01);
      } else if(this.loop == 2){
        // console.log(this.inter02);
      } else if(this.loop == 3){
        // console.log(this.inter03);
      } else if(this.loop == 4){
        // console.log(this.inter04);
      } else if(this.loop == 5){
        // console.log(this.inter05);
      } else if(this.loop == 6){
        // console.log(this.inter06);
      } 

      if(this.loop == 6){

        this.loop++;

        clearInterval(this.saveDataTask);
        clearInterval(this.testSecondTask);

        this.showTestingTable = false;
        this.tempArray = [];

        this.tempArray.push(this.returnLargestAndSmallest(this.inter01)[0]);
        this.tempArray.push(this.returnLargestAndSmallest(this.inter01)[1]);

        this.tempArray.push(this.returnLargestAndSmallest(this.inter02)[0]);
        this.tempArray.push(this.returnLargestAndSmallest(this.inter02)[1]);

        this.tempArray.push(this.returnLargestAndSmallest(this.inter03)[0]);
        this.tempArray.push(this.returnLargestAndSmallest(this.inter03)[1]);

        this.tempArray.push(this.returnLargestAndSmallest(this.inter04)[0]);
        this.tempArray.push(this.returnLargestAndSmallest(this.inter04)[1]);

        this.tempArray.push(this.returnLargestAndSmallest(this.inter05)[0]);
        this.tempArray.push(this.returnLargestAndSmallest(this.inter05)[1]);

        this.tempArray.push(this.returnLargestAndSmallest(this.inter06)[0]);
        this.tempArray.push(this.returnLargestAndSmallest(this.inter06)[1]);

      if(this.trial == 0)
        this.result0 = this.tempArray;

      this.showDeviceConnectTable = true;
      this.trial++;
      this.CountdownSecond = 3;
      this.currentTime = 10;
      this.loadProgress = 100;

      } else {

        this.inhale = true;
        this.currentTime = 10;
        this.loadProgress = 100;
        this.loop++;

      }
    }
  }

  returnLargestAndSmallest(arr){
    let tempMax = 0;
    let tempMin = 0;
    
    tempMax = arr[0];
    tempMin = arr[0];

        for(let i = 0; i<arr.length; i++){
    
          if(i == 0 ){
            tempMax = arr[i];
            tempMin = arr[i];
          } 
            if(arr[i] - tempMax >= 0){
            tempMax = arr[i];
           }
            if(arr[i] - tempMin <= 0){
            tempMin = arr[i];
            }
        }

        return [tempMax,tempMin];
  }

  checkAllHardware(){

    this.ble.isConnected('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C').then(
      ()=>{ 
        this.heartRateDeviceConnected = true; 

        this.ble.read('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C','180D','2A37').then(data2=>{
          
          if((new Uint16Array(data2)[0])>560 && (new Uint16Array(data2)[0])<1450)
          this.RRIReadng = (new Uint16Array(data2)[0]);

          }).catch(error=>{
            console.error("Test2DetailPage#checkAllHardware");
            console.error("heartRateDevice reading");
            console.error(error);
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
      // console.log(JSON.stringify(device));
      
      this.ble.connect('813A1F6C-0006-7DF0-7CE2-0F7AFF15630C').subscribe(data => {
        this.heartRateDeviceConnected = true;
        },error =>{
          console.error("Test2DetailPage#connectHeartRate");
          console.error(error);

        });

  });
  }


}
