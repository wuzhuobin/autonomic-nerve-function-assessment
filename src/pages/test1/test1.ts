import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TestStartPage } from '../testStart/testStart';
import { Test2Page } from '../test2/test2';
import { Test3Page } from '../test3/test3';
import { Test4Page } from '../test4/test4';
import { Test5Page } from '../test5/test5';
import { TestEndPage } from '../testEnd/testEnd';
import { Test1DetailPage } from '../test1detail/test1detail';

import { TestConfigPage } from '../testConfig/testConfig';

import { Chart } from 'chart.js';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import moment from 'moment';
import { HomePage } from '../home/home';
import { BLE } from '@ionic-native/ble';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-test1',
  templateUrl: 'test1.html',
})
export class Test1Page {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;

  lineChart: any;
  lineChart2: any;
  lineChart3: any;

    currentTime = 10;
    testedTime = 1;
    reading = 50;

    thresholdConfig = {
      '5': {color: '#AFA'},
      '3': {color: '#FFA'},
      '1': {color: '#FAA'}
    };

  public task : any;

  public average_t1 : any ;
  public average_t2 : any ;
  public average_t3 : any ;
  public average_t4 : any ;

  public result_t1_0 : number[] = [];
  public result_t1_1 : number[] = [];
  public result_t1_2 : number[] = [];

  public result_t2_0 : number[] = [];

  public result_t3_1 : number[] = [];

  public result_t4_1 : number[] = [];
  public result_t4_2 : number[] = [];

  public average_t2_1 : any = 0;
  public average_t2_2 : any = 0;
  public average_t2_3 : any = 0;

  public average_RRI = 0;

  public highest1 : any = 0;
  public highest2 : any = 0; 
  public highest3 : any = 0;

  public lowest1 : any= 0;
  public lowest2 : any= 0;
  public lowest3 : any= 0;

  public ratio1 : any= 0;
  public ratio2 : any= 0;
  public ratio3 : any= 0;

  public debugg: any;

  public checkDeviceTask:any;

  public datab : SQLiteObject;

  public hide1 : any = false;
  public hide2 : any = false;
  public hide3 : any = false;

  public patient_age: any;
  public patient_name:any;
  public patient_created:any;
  public patient_elapsed:any = "0:00";

  public patient_id:any;

  public Breathready :boolean = false;
  public HRready :boolean = false;

  public isFullRecord : boolean = false;

  constructor( public ble : BLE,private storage: Storage , private sqlite: SQLite , public navCtrl: NavController, public navParams: NavParams) {

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    this.datab = db;

            this.datab.executeSql(`select count(1) as abc from patient_table `, {})
              .then((countdata) => {
               if(parseInt(countdata.rows.item(0).abc) == 0){

                this.navCtrl.setRoot(HomePage, {}, {animate : false, direction: 'forward'});
               
              }

              this.storage.get('id').then((val) => {
                // console.log(' id is', val); 
                this.patient_id = val;

                this.datab.executeSql(`select * from patient_table where id=`+this.patient_id+`;`, {})
                .then( data => {
  
                  this.patient_age = data.rows.item(0).age;
                  this.patient_name = data.rows.item(0).name;
                  this.patient_created = data.rows.item(0).createTime;
  
                  this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
                  this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
                  this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
                  
                  let diffTime = moment().diff(this.patient_created,'seconds',false);
                  let duration = moment.duration(diffTime,'seconds');

                  if(duration.seconds()<10){
                    this.patient_elapsed = duration.minutes().toString()+":0"+duration.seconds().toString();
                  }else{
                    this.patient_elapsed = duration.minutes().toString()+":"+duration.seconds().toString();
                  } 

                  this.task = setInterval(()=>{ 
  
                    let diffTime = moment().diff(this.patient_created,'seconds',false);
                     let duration = moment.duration(diffTime,'seconds');
  
                    if(duration.seconds()<10){
                      this.patient_elapsed = duration.minutes().toString()+":0"+duration.seconds().toString();
                    }else{
                     this.patient_elapsed = duration.minutes().toString()+":"+duration.seconds().toString();
                    } 
                  },1000);
          
                  if(this.result_t1_0.length>0 && this.result_t1_1.length>0 && this.result_t1_2.length>0){
                    this.isFullRecord = true;
                  }

          let tempMax = 0;
          let tempMin = 0;
  
          for(let i = 0; i<this.result_t1_0.length; i++){
  
            if(i == 0 ){
              tempMax = this.result_t1_0[i];
              tempMin = this.result_t1_0[i];
            }  
              if(this.result_t1_0[i]- tempMax >=0)
              tempMax = this.result_t1_0[i];
  
              if(this.result_t1_0[i] - tempMin <=0) 
              tempMin = this.result_t1_0[i];
  
          }
      
          if(tempMax==0){this.highest1 = "-";} else { this.highest1 = tempMax;}
          if(tempMin==0){this.lowest1 = "-";} else { this.lowest1 = tempMin;}

          if(tempMin >0 && tempMax > 0)
          this.ratio1 = (tempMax* 1.0 ) / (tempMin *1.0);
      
          tempMax = 0;
          tempMin = 0;
      
          for(let i = 0; i<this.result_t1_1.length; i++){
      
            if(i == 0 ){
              tempMax = this.result_t1_1[i];
              tempMin = this.result_t1_1[i];
            } 
              if(this.result_t1_1[i] - tempMax >= 0){
              tempMax = this.result_t1_1[i];
             }
              if(this.result_t1_1[i] - tempMin <= 0){
              tempMin = this.result_t1_1[i];
              }
          }
  
          if(tempMax==0){this.highest2 = "-";} else { this.highest2 = tempMax;}
          if(tempMin==0){this.lowest2 = "-";} else { this.lowest2 = tempMin;}

          if(tempMin >0 && tempMax > 0)
          this.ratio2 = (tempMax* 1.0 ) / (tempMin *1.0);
      
          tempMax = 0;
          tempMin = 0;
    
          for(let i = 0; i<this.result_t1_2.length; i++){
      
            if(i == 0 ){
              tempMax = this.result_t1_2[i];
              tempMin = this.result_t1_2[i];
            }
              if(this.result_t1_2[i] - tempMax >= 0)
              tempMax = this.result_t1_2[i];
      
              if(this.result_t1_2[i] -  tempMin <=0)
              tempMin = this.result_t1_2[i] ;
          }
      
          if(tempMax==0){this.highest3 = "-";} else { this.highest3 = tempMax;}
          if(tempMin==0){this.lowest3 = "-";} else { this.lowest3 = tempMin;}
  
          if(tempMin >0 && tempMax > 0)
          this.ratio3 = (tempMax* 1.0 ) / (tempMin *1.0) ;
      
          tempMax = 0;
          tempMin = 0;

          if(this.ratio1 != 0) {tempMax += this.ratio1; tempMin++;}
          if(this.ratio2 != 0) {tempMax += this.ratio2; tempMin++;}
          if(this.ratio3 != 0) {tempMax += this.ratio3; tempMin++;}
  
          if(tempMin ==0)
              this.average_t1 = 0;
            else
               this.average_t1 = (tempMax) / tempMin;
  
  
               this.result_t2_0 = JSON.parse(data.rows.item(0).t2_1);
     
               if(this.result_t2_0.length >0){
               this.average_t2_1 = Math.round(
               ((this.result_t2_0[0] - this.result_t2_0[1])+
               (this.result_t2_0[2] - this.result_t2_0[3])+
               (this.result_t2_0[4] - this.result_t2_0[5])+
               (this.result_t2_0[6] - this.result_t2_0[7])+
               (this.result_t2_0[8] - this.result_t2_0[9])+
               (this.result_t2_0[10] - this.result_t2_0[11])) /6 ); 
               }
     
               let temp = 0;
               let count = 0;
                 if(this.average_t2_1>0){temp+=this.average_t2_1; count++;}
     
               if(count==0) this.average_t2 = 0;
               else { this.average_t2 = Math.round(temp / count) ;}


               this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);  

               if(this.result_t3_1.length>0){
                let max = this.result_t3_1[3];
                if(this.result_t3_1[5] > max)
                  max = this.result_t3_1[5];
                if(this.result_t3_1[7] > max)
                  max = this.result_t3_1[7];
                if(this.result_t3_1[9] > max)
                  max = this.result_t3_1[9];
                if(this.result_t3_1[11] > max)
                  max = this.result_t3_1[11];
                 this.average_t3 = Math.abs(max - this.result_t3_1[1]);
            
              } else { this.average_t3 = 0;}

               

              this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);

              if(this.result_t4_1.length>0){
            this.average_RRI = this.result_t4_1[1] / this.result_t4_1[0];
              }

              this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);

              if(this.result_t4_2.length>0){              
                let min = this.result_t4_2[2];
                if (this.result_t4_2[4] < min)
                  min = this.result_t4_2[4];
                if (this.result_t4_2[6] < min)
                  min = this.result_t4_2[6];
                this.average_t4 = Math.abs(min - this.result_t4_2[0]);
                } else { this.average_t4 = 0; }





















                if(this.ratio1 > 0 ){
               this.lineChart = new Chart(this.lineCanvas.nativeElement, {
   
                type: 'line',
                options:
              {legend: {
                display: false
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
                          label: "1st",
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
                          data: this.result_t1_0,
                          spanGaps: true
                      }
                  ]
                }
          
            });
  
          }else {
            this.hide1 = true; 
          }
          // console.log("2:"+this.ratio2);
  if(this.ratio2 > 0 ){
  
            this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
   
              type: 'line',
              options:
            {legend: {
              display: false
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
                      label: "2nd",
                      fill: false,
                      lineTension: 0.3,
                      backgroundColor: "rgba(255,192,0,1)",
                      borderColor: "rgba(255,192,0,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(255,192,0,1)",
                      pointBackgroundColor:  "rgba(255,192,0,1)",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(255,192,0,1)",
                      pointHoverBorderColor: "rgba(255,192,0,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.result_t1_1,
                      spanGaps: true,
                    }
                ]
              }
        
          });
        } else {
          this.hide2 = true; 
        }
  
        // console.log("3:"+this.ratio3);
        if(this.ratio3 > 0){
          this.lineChart3 = new Chart(this.lineCanvas3.nativeElement, {
   
            type: 'line',
            options:
          {legend: {
            display: false
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
                  label: "3rd",
                  fill: false,
                  lineTension: 0.3,
                  backgroundColor: "rgba(112,173,71,1)",
                  borderColor: "rgba(112,173,71,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(112,173,71,1)",
                  pointBackgroundColor: "rgba(112,173,71,1)",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(112,173,71,1)",
                  pointHoverBorderColor: "rgba(112,173,71,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.result_t1_2,
                  spanGaps: true,
              }
              ]
            }
      
        });
      } else {
        this.hide3 = true; 
      }
  
              });

              });


          });
      });

      this.checkDeviceTask = setInterval(()=>{
        this.checkAllHardware();
      },1000);
}


  loadConfig(){
    clearInterval(this.task);
    clearInterval(this.checkDeviceTask);
    this.navCtrl.setRoot(TestConfigPage, {parent:Test1Page}, {animate: true, direction: 'forward'});
  }

  enterTest(){

    clearInterval(this.task);
    clearInterval(this.checkDeviceTask);
    
    this.datab.close();
    this.navCtrl.setRoot(Test1DetailPage, {}, {animate: false, direction: 'forward'});
  }

  clickPage(a){
    clearInterval(this.task);
    clearInterval(this.checkDeviceTask);
    if(a==0)
    this.navCtrl.setRoot(TestStartPage, {}, {animate: false, direction: 'forward'});
    else if(a==1)
    this.navCtrl.setRoot(Test1Page, {}, {animate: false, direction: 'forward'});
    else if(a==2)
    this.navCtrl.setRoot(Test2Page, {}, {animate: false, direction: 'forward'});
    else if(a==3)
    this.navCtrl.setRoot(Test3Page, {}, {animate: false, direction: 'forward'});
    else if(a==4)
    this.navCtrl.setRoot(Test4Page, {}, {animate: false, direction: 'forward'});
    else if(a==5)
    this.navCtrl.setRoot(Test5Page, {}, {animate: false, direction: 'forward'});
    else if(a==6)
    this.navCtrl.setRoot(TestEndPage, {}, {animate: false, direction: 'forward'});
  }

  deleteRecord(a){

      this.sqlite.create({
        name: 'recorder.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
  
        this.datab = db;
  
          if(a==1){

            if(this.result_t1_1.length > 0){
              this.datab.executeSql("UPDATE patient_table SET t1_1 = t1_2 , t1_2 = t1_3 , t1_3 = '[]' where id=(select max(id) from patient_table)", {})
              .then(() => {
                this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
              });
            } else {
              this.datab.executeSql("UPDATE patient_table SET t1_1 = t1_3 where id=(select max(id) from patient_table);", {})
              .then(() => {
                this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
              });
            }


          } else if(a==2){

            this.datab.executeSql("UPDATE patient_table SET t1_2 = t1_3 where id=(select max(id) from patient_table);", {})
            .then(() => {
              this.datab.executeSql("UPDATE patient_table SET t1_3 ='[]' where id=(select max(id) from patient_table);", {})
              .then(() => {
                this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
              });
            });

          } else {

            this.datab.executeSql("UPDATE patient_table SET t1_3 ='[]' where id=(select max(id) from patient_table);", {})
            .then(() => {
              this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
            });
          }


  
        });

  }

  checkAllHardware(){

    this.ble.isConnected('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78').then(
      ()=>{ 
        this.Breathready = true; 
      },
      ()=>{ this.Breathready = false;  this.connectBreath();
      }
    );

  this.ble.isConnected('F14956A6-16EC-88BA-1426-03749EBE87DE').then(
    ()=>{ 
      this.HRready = true; 
    },
    ()=>{ this.HRready = false; this.connectHeartRate();
    }
  );

}

connectBreath(){
  this.ble.scan([], 3).subscribe(device => {
    this.ble.connect('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78').subscribe(data => {
      this.Breathready = true; 
      },error =>{
        console.error("Test1Page#connectBreath");
        console.error(error);
      });
});
}

connectHeartRate(){
  this.ble.scan([], 3).subscribe(device => {
    this.ble.connect('F14956A6-16EC-88BA-1426-03749EBE87DE').subscribe(data => {
      this.HRready = true; 
      },error =>{
        console.error("Test1Page#connectHeartRate");
        console.error(error);
      });
});
}

}
