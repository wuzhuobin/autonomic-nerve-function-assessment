import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TestStartPage } from '../testStart/testStart';
import { Test1Page } from '../test1/test1';
import { Test2Page } from '../test2/test2';
import { Test4Page } from '../test4/test4';
import { Test5Page } from '../test5/test5';
import { TestEndPage } from '../testEnd/testEnd';
import { TestConfigPage } from '../testConfig/testConfig';

import { Test3DetailPage } from '../test3detail/test3detail';
import { BLE } from '@ionic-native/ble';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import moment from 'moment';

@Component({
  selector: 'page-test3',
  templateUrl: 'test3.html',
})
export class Test3Page {

  public datab : SQLiteObject;

  public patient_id:any;
  public patient_age: any;
  public patient_name:any;
  public patient_created:any;
  public patient_elapsed:any = "0:00";

  public Gripready:boolean = false;
  public BPready:boolean = false;

  public checkDeviceTask:any;

  public task:any;

  public result : number[] = [];

  public result_t1_0 : number[] = [];
  public result_t1_1 : number[] = [];
  public result_t1_2 : number[] = [];

  public result_t2_0 : number[] = [];
  public result_t2_1 : number[] = [];
  public result_t2_2 : number[] = [];

  public result_t3_1 : number[] = [];

  public result_t4_1 : number[] = [];
  public result_t4_2 : number[] = [];

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


  public up1 : any = 0;
  public down1 : any = 0;
  public up2 : any = 0;
  public down2 : any = 0;
  public up3 : any = 0;
  public down3 : any = 0;
  public up4 : any = 0;
  public down4 : any = 0;
  public up5 : any = 0;
  public down5 : any = 0;
  public up6 : any = 0;
  public down6 : any = 0;
  
  public ratio1 : any= 0;
  public ratio2 : any= 0;
  public ratio3 : any= 0;

  constructor( public ble:BLE,private storage: Storage ,private sqlite: SQLite , public navCtrl: NavController, public navParams: NavParams) {


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
        this.average_t3 = Math.abs(this.result_t3_1[1] - this.result_t3_1[3]);
    
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
          this.result = JSON.parse(data.rows.item(0).t3_1);
          if (this.result.length > 0) {
            this.up1 = this.result[0];
            this.down1 = this.result[1];
            this.up2 = this.result[2];
            this.down2 = this.result[3];
            this.up3 = this.result[4];
            this.down3 = this.result[5];
            this.up4 = this.result[6];
            this.down4 = this.result[7];
            this.up5 = this.result[8];
            this.down5 = this.result[9];
            this.up6 = this.result[10];
            this.down6 = this.result[11];
            var max = this.down2;
            if (this.down3 > max)
              max = this.down3;
            if (this.down4 > max)
              max = this.down4;
            if (this.down5 > max)
              max = this.down5;
            if (this.down6 > max)
              max = this.down6;
            this.average_t3 = Math.abs(max - this.down1);

            } else { this.average_t3 = 0;}

          




          let diffTime = moment().diff(this.patient_created, 'seconds', false);
          let duration = moment.duration(diffTime, 'seconds');

          if (duration.seconds() < 10) {
            this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
          } else {
            this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
          }

          this.task = setInterval(() => {

            let diffTime = moment().diff(this.patient_created, 'seconds', false);
            let duration = moment.duration(diffTime, 'seconds');

            if (duration.seconds() < 10) {
              this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
            } else {
              this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
            }
          }, 1000);
        });

      });


    });


    this.checkDeviceTask = setInterval(() => {
      this.checkAllHardware();
    }, 1000);
      /*this.BPready = true;
      this.Gripready = true;
      */
  }
  
  checkAllHardware(){

    this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(
      ()=>{ 
        this.BPready = true; 
      },
      ()=>{ this.BPready = false; 

              this.ble.scan([], 3).subscribe(device => {
              
                this.ble.connect('9ADE4682-C753-3B3A-7454-50123794CAF4').subscribe(data => {
                  this.BPready = true;
                  },error =>{
                    console.log(error);
            
                  });
            
            });
      }
    );

      this.ble.isConnected('58A8CA24-F894-D922-0462-A287BE6D53FE').then(
        ()=>{ 
          this.Gripready = true; 
        },
        ()=>{ this.Gripready = false; 

                this.ble.scan([], 3).subscribe(device => {
                  
                  this.ble.connect('58A8CA24-F894-D922-0462-A287BE6D53FE').subscribe(data => {
                    this.Gripready = true;
                    },error =>{
                      console.log(error);
              
                    });
              
              });
        }
      );

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

  loadConfig(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.task);
    this.navCtrl.setRoot(TestConfigPage, {parent:Test3Page}, {animate: true, direction: 'forward'});
  }

  enterTest(){
    clearInterval(this.checkDeviceTask);
    clearInterval(this.task);
    this.datab.close();
    this.navCtrl.setRoot(Test3DetailPage, {}, {animate: false, direction: 'forward'});
    //this.navCtrl.setRoot(Test4DetailPage_2, {}, {animate: false, direction: 'forward'});
  }
  

}
