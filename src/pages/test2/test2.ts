import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TestStartPage } from '../testStart/testStart';
import { Test1Page } from '../test1/test1';
import { Test3Page } from '../test3/test3';
import { Test4Page } from '../test4/test4';
import { Test5Page } from '../test5/test5';
import { TestEndPage } from '../testEnd/testEnd';
import { Test2DetailPage } from '../test2detail/test2detail';
import { BLE } from '@ionic-native/ble';
import { TestConfigPage } from '../testConfig/testConfig';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import moment from 'moment';
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page {

  public checkDeviceTask : any;

  public result_t1_0 : number[] = [];
  public result_t1_1 : number[] = [];
  public result_t1_2 : number[] = [];

  public result_t2_0 : number[] = [];
  public result_t2_1 : number[] = [];
  public result_t2_2 : number[] = [];

  public result_t3_1 : number[] = [];

  public result_t4_1 : number[] = [];
  public result_t4_2 : number[] = [];

  public ratio1 : any= 0;
  public ratio2 : any= 0;
  public ratio3 : any= 0;

  public datab : SQLiteObject;

  public patient_id:any;
  public patient_age: any;
  public patient_name:any;
  public patient_created:any;
  public patient_elapsed:any = "0:00";


  public allDeviceReady : boolean = false;
  public task:any;

  public average_t2_1 : any = 0;
  public average_t2_2 : any = 0;
  public average_t2_3 : any = 0;

  public average_t1 : any ;
  public average_t2 : any ;
  public average_t3 : any ;
  public average_t4 : any ;
  public average_RRI = 0;

  public highest1 : any = 0;
  public highest2 : any = 0; 
  public highest3 : any = 0;

  public lowest1 : any= 0;
  public lowest2 : any= 0;
  public lowest3 : any= 0;


  constructor( private storage: Storage ,private sqlite: SQLite , public ble: BLE,public navCtrl: NavController, public navParams: NavParams) {


    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.datab = db;

      this.storage.get('id').then((val) => {
        console.log(' id is', val);
        this.patient_id = val;

        this.datab.executeSql(`select * from patient_table where id='`+this.patient_id+`';`, {})
        .then( data => {

          this.patient_age = data.rows.item(0).age;
          this.patient_name = data.rows.item(0).name;
          this.patient_created = data.rows.item(0).createTime;

          this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
          this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
          this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
        

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
       this.result_t2_1 = JSON.parse(data.rows.item(0).t2_2);
       this.result_t2_2 = JSON.parse(data.rows.item(0).t2_3);  

       if(this.result_t2_0.length >0){
       this.average_t2_1 = Math.round(
       ((this.result_t2_0[0] - this.result_t2_0[1])+
       (this.result_t2_0[2] - this.result_t2_0[3])+
       (this.result_t2_0[4] - this.result_t2_0[5])+
       (this.result_t2_0[6] - this.result_t2_0[7])+
       (this.result_t2_0[8] - this.result_t2_0[9])+
       (this.result_t2_0[10] - this.result_t2_0[11])) /6 ); 
       }

       if(this.result_t2_1.length >0){
         this.average_t2_2 = Math.round(
         ((this.result_t2_1[0] - this.result_t2_1[1])+
         (this.result_t2_1[2] - this.result_t2_1[3])+
         (this.result_t2_1[4] - this.result_t2_1[5])+
         (this.result_t2_1[6] - this.result_t2_1[7])+
         (this.result_t2_1[8] - this.result_t2_1[9])+
         (this.result_t2_1[10] - this.result_t2_1[11])) /6 ); 
         }

       if(this.result_t2_2.length >0){
         this.average_t2_3 = Math.round(
         ((this.result_t2_2[0] - this.result_t2_2[1])+
         (this.result_t2_2[2] - this.result_t2_2[3])+
         (this.result_t2_2[4] - this.result_t2_2[5])+
         (this.result_t2_2[6] - this.result_t2_2[7])+
         (this.result_t2_2[8] - this.result_t2_2[9])+
         (this.result_t2_2[10] - this.result_t2_2[11])) /6 ); 
       }

       let temp = 0;
       let count = 0;
         if(this.average_t2_1>0){temp+=this.average_t2_1; count++;}
         if(this.average_t2_2>0){temp+=this.average_t2_2; count++;}
         if(this.average_t2_3>0){temp+=this.average_t2_3; count++;}

       if(count==0) this.average_t2 = 0;
       else { this.average_t2 = Math.round(temp / count) ;}


       this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);  

       if(this.result_t3_1.length>0){
        this.average_t3 = Math.abs(this.result_t3_1[1] - this.result_t3_1[3]);
    
      } else { this.average_t3 = 0;}

       

      this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);

      if(this.result_t4_1.length>0){
    this.average_RRI = this.result_t4_1[1] / this.result_t4_1[0];
      }

      this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);

      if(this.result_t4_2.length>0){              
          this.average_t4 = Math.abs(this.result_t4_2[0] - this.result_t4_2[2]);
        } else { this.average_t4 = 0; }

          

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

 
        });

      });


      });

      this.checkDeviceTask = setInterval(()=>{
        this.checkAllHardware();
      },1000);

}


checkAllHardware(){

  this.ble.isConnected('1299559F-DF0D-783C-9E47-DB2E6CFA82F3').then(
    ()=>{ 
      this.allDeviceReady = true; 
    },
    ()=>{ this.allDeviceReady = false; 
    }
  );

  if(!this.allDeviceReady){
    this.connectHeartRate();
  }

}

connectHeartRate(){
  this.ble.scan([], 3).subscribe(device => {
    console.log(JSON.stringify(device));
    
    this.ble.connect('1299559F-DF0D-783C-9E47-DB2E6CFA82F3').subscribe(data => {
      this.allDeviceReady = true;
      },error =>{
        console.log(error);

      });

});
}


  loadConfig(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.task);
    this.navCtrl.setRoot(TestConfigPage, {parent:Test2Page}, {animate: true, direction: 'forward'});
  }

  enterTest(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.task);
    this.datab.close();
    this.navCtrl.setRoot(Test2DetailPage, {}, {animate: false, direction: 'forward'});
  }

  clickPage(a){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.task);
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

}
