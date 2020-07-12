import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Test1Page } from '../test1/test1';
import { TestStartPage } from '../testStart/testStart';
import { BLE } from '@ionic-native/ble';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

import { Chart } from 'chart.js';

import { Storage } from '@ionic/storage';
import moment from 'moment';

@Component({
  selector: 'page-test1detail',
  templateUrl: 'test1detail.html',
})
export class Test1DetailPage {


  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

    public heartRateDeviceConnected :boolean = false;
    public breathDeviceConnected :boolean = false;
    
    public breathReading : any = 0;
    public RRIReadng : any = 0;
    public RRITemp : any = 0;

    public checkDeviceTask : any;
    public countdownTask : any;
    public testSecondTask : any;
    public saveDataTask : any;

    public loadProgress = 100;

    public currentTime = 15;
    public trial = 0;

    public CountdownSecond : any = 3;

    public showDeviceConnectTable : boolean ;
    public showTestingTable : boolean ;
    public showCountdownTable : boolean ;
    
    public under40 : boolean = true;
    public tempString = "";

    thresholdConfig = {
      '5': {color: '#AFA'},
      '3': {color: '#FFA'},
      '1': {color: '#FAA'}
    };

    public debugg : any = "123131231";

    public result0 : string[] = [];

    public tempArray : string[] = [];

    public datab: SQLiteObject;

    public patient_id:any;

    constructor( private storage: Storage , private sqlite: SQLite ,public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {


      this.storage.get('id').then((val) => {
        // console.log(' id is', val);
        this.patient_id = val;
      });

    this.checkDeviceTask = setInterval(()=>{
      this.checkAllHardware();
    },50);


    this.clickTestStart();

  }
  
  backTest1(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.countdownTask);
    clearInterval(this.testSecondTask);
    clearInterval(this.saveDataTask);

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.datab = db;

      let dataSent = [JSON.stringify(this.result0)]
        
      this.datab.executeSql(`select * from patient_table where id=`+this.patient_id+`;`, {})
      .then( data => {    

        let t1 = JSON.parse(data.rows.item(0).t1_1);
        let t2 = JSON.parse(data.rows.item(0).t1_2);
        let t3 = JSON.parse(data.rows.item(0).t1_3);

        if(t1.length==0){
          this.datab.executeSql("UPDATE patient_table SET t1_1 = ? where id='"+this.patient_id+"';", dataSent)
          .then(() => {
            // console.log(data);
            this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
          });
        } else if(t2.length==0){
          this.datab.executeSql("UPDATE patient_table SET t1_2 = ? where id='"+this.patient_id+"';", dataSent)
          .then(() => {
            // console.log(data);
            this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
          });
        } else{
          this.datab.executeSql("UPDATE patient_table SET t1_3 = ? where id='"+this.patient_id+"';", dataSent)
          .then(() => {
            // console.log(data);
            this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
          });
        } 

      });
      

    
    
    });

  }

  clickTestStart(){
    this.showDeviceConnectTable = false;
    this.showCountdownTable = true;

    this.countdownTask = setInterval(()=>{
      this.CountdownSecond--;
      if(this.CountdownSecond==0){

        this.RRITemp = this.RRIReadng;
        this.tempArray.push(this.RRIReadng.toString());
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

    this.countdownTask = setInterval(()=>{
      this.CountdownSecond--;
      if(this.CountdownSecond==0){

        this.RRITemp = this.RRIReadng;
        this.tempArray.push(this.RRIReadng.toString());
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

    if(this.RRIReadng>520 && (Math.abs(this.RRITemp - this.RRIReadng) < 350)){
      this.tempArray.push(this.RRIReadng.toString());
      this.RRITemp = this.RRIReadng;
    } else {
      this.tempArray.push(this.RRITemp.toString());
    }
      
  }

  eachSecond(){
    this.currentTime--;
    this.loadProgress = (this.currentTime / 15)*100;

    if(this.currentTime<=0){
      this.tempArray.push(this.RRIReadng.toString());
      clearInterval(this.saveDataTask);
      clearInterval(this.testSecondTask);

      this.tempString = "";

      let finishChart = false;

      this.result0 = this.tempArray;

      this.showTestingTable = false;
      this.showDeviceConnectTable = true;
      
    
      this.trial++;
      this.CountdownSecond = 3;
      this.currentTime = 15;
      this.loadProgress = 100;
      setTimeout( ()=>{
        this.createChart();
      },200);

    }
  }

  createChart(){
              if(this.lineCanvas != undefined){
                this.lineChart = new Chart(this.lineCanvas.nativeElement, {

              type: 'line',
              options:
            {legend: {
              display: false,
          },
                scales:
                {
                    xAxes: [{
                        display: true
                    }]
                }
            },
              data: {
                  labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                  datasets: [
                    {
                        label: "",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "rgba(237,125,49,1)",
                        borderColor: "rgba(237,125,49,1)",
                        borderCapStyle: 'butt',
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(237,125,49,1)",
                        pointBackgroundColor: "rgba(237,125,49,1)",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(237,125,49,1)",
                        pointHoverBorderColor: "rgba(237,125,49,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.tempArray,
                        spanGaps: true
                    }
                ]
              }
          
          });
          }

          this.tempArray = [];
  }

  checkAllHardware(){
    this.ble.isConnected('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78').then(
      ()=>{ 
        this.breathDeviceConnected = true; 

        this.ble.read('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78','19b10000-e8f2-537e-4f6c-d104768a1214','19b10001-e8f2-537e-4f6c-d104768a1214').then(data2=>{
          
          this.breathReading = (new Uint8Array(data2)[0]);

          if(this.breathReading < 40)
            this.under40 = true;
            else
            this.under40 = false;
          }).catch(error=>{
            console.error("Test1DetailPage#checkAllHardware");
            console.error("breathDevice reading");
            console.error(error);
          });

      },
      ()=>{ this.breathDeviceConnected = false; 
      }
    );

    if(!this.breathDeviceConnected){
      this.connectBreath();
    }

    this.ble.isConnected('F14956A6-16EC-88BA-1426-03749EBE87DE').then(
      ()=>{ 
        this.heartRateDeviceConnected = true; 

        this.ble.read('F14956A6-16EC-88BA-1426-03749EBE87DE','180D','2A37').then(data2=>{
          
          //this.RRIReadng = Math.round((new Uint16Array(data2)[0])/5) * 5;
          this.RRIReadng = (new Uint16Array(data2)[0]);
          }).catch(error=>{
            console.error("Test1DetailPage#checkAllHardWare");
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

  connectBreath(){
 
    this.ble.scan([], 3).subscribe(device => {

      // console.log(JSON.stringify(device));
        this.ble.connect('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78').subscribe(data => {
          this.breathDeviceConnected  = true;
           },error =>{
            console.error("Test1DetailPage#connectBreath");
            console.error(error);
          }); 
    });

  }

  connectHeartRate(){
    this.ble.scan([], 3).subscribe(device => {
      // console.log(JSON.stringify(device));
      
      this.ble.connect('F14956A6-16EC-88BA-1426-03749EBE87DE').subscribe(data => {
        this.heartRateDeviceConnected = true;
        },error =>{
          console.error("Test1DetailPage#connectHeartRate");
          console.error(error);

        });

  });
  }


}
