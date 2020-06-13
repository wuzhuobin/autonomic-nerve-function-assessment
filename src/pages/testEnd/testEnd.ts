import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slide, Slides } from 'ionic-angular';

import { TestStartPage } from '../testStart/testStart';
import { Test1Page } from '../test1/test1';
import { Test2Page } from '../test2/test2';
import { Test3Page } from '../test3/test3';
import { Test4Page } from '../test4/test4';
import { Test5Page } from '../test5/test5';

import { HomePage } from '../home/home';

import { TestConfigPage } from '../testConfig/testConfig';

import { Chart } from 'chart.js';
import swal from 'sweetalert2';

import { EmailComposer } from '@ionic-native/email-composer';
import { Clipboard } from '@ionic-native/clipboard';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import moment from 'moment';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-testEnd',
  templateUrl: 'testEnd.html',
})
export class TestEndPage {

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;

  @ViewChild('slidee') slideew:Slides;
  

  lineChart: any;
  lineChart2: any;
  lineChart3: any;


  public datas = [];
  public datab : SQLiteObject;
  public patient_id:any;

  public searchInput:any;

public selected:boolean = false;

  public patient_name:any;
  public patient_age:any;
  public patient_time:any;
//------1---------
  public result1_1 : number[] = [];
  public result1_2 : number[] = [];
  public result1_3 : number[] = [];

  public highest1 : any = 0;
  public highest2 : any = 0; 
  public highest3 : any = 0;

  public lowest1 : any= 0;
  public lowest2 : any= 0;
  public lowest3 : any= 0;

  public ratio1 : any= 0;
  public ratio2 : any= 0;
  public ratio3 : any= 0;

//-------2------------

public result2_1 : number[] = [];
public result2_2 : number[] = [];
public result2_3 : number[] = [];

//--------3----------

public result3_1 : number[] = [];

//--------4----------

public result4_1 : number[] = [];

//--------4b----------

public result4b_1 : number[] = [];


//------------


public result_t1_0 : number[] = [];
public result_t1_1 : number[] = [];
public result_t1_2 : number[] = [];

public result_t2_0 : number[] = [];
public result_t2_1 : number[] = [];
public result_t2_2 : number[] = [];

public result_t3_1 : number[] = [];

public result_t4_1 : number[] = [];
public result_t4_2 : number[] = [];

public average_t1 : any ;
public average_t2 : any ;
public average_t3 : any ;
public average_t4 : any ;

public average_t2_1 : any = 0;
public average_t2_2 : any = 0;
public average_t2_3 : any = 0;

public t3_up1 : any ;
public t3_down1 : any ;
public t3_up2 : any ;
public t3_down2 : any ;
public t3_up3: any;
public t3_down3: any;
public t3_up4: any;
public t3_down4: any;
public t3_up5: any;
public t3_down5: any;
public t3_up6: any;
public t3_down6: any;

public up1 : any = 0;
public down1 : any = 0;
public up2 : any = 0;
public down2 : any = 0;
public up3 : any = 0;
public down3 : any = 0;
public up4 : any = 0;
public down4 : any = 0;


public RRI15 = 0;
public RRI30 = 0;
public average_RRI = 0;


public hide1 : any = false;
public hide2 : any = false;
public hide3 : any = false;




//------------

  constructor( private storage: Storage , private sqlite: SQLite , public alertCtrl : AlertController, private clipboard: Clipboard,private emailComposer: EmailComposer , public navCtrl: NavController, public navParams: NavParams) {

    this.sqlite.create({
      name: 'recorder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
    this.datab = db;

      this.datab.executeSql(`select * from patient_table  order by id desc;`, {})
      .then( data => {

        for(var i=0; i<data.rows.length; i++){

          let tem1 = 0;
          let tem2 = 0;
          let tem3 = 0;
          let tem4 = 0;
          let tem5 = 0;
  
this.ratio1 = 0;
this.ratio2 = 0;
this.ratio3 = 0;

            // start test1 data 
            this.result1_1 = JSON.parse(data.rows.item(i).t1_1);
            this.result1_2 = JSON.parse(data.rows.item(i).t1_2);
            this.result1_3 = JSON.parse(data.rows.item(i).t1_3);
  
            let tempMax = 0;
            let tempMin = 0;
  
            for(let i = 0; i<this.result1_1.length; i++){
    
              if(i == 0 ){
                tempMax = this.result1_1[i];
                tempMin = this.result1_1[i];
              }  
                if(this.result1_1[i]- tempMax >=0)
                tempMax = this.result1_1[i];
    
                if(this.result1_1[i] - tempMin <=0) 
                tempMin = this.result1_1[i];
    
            }
  
            this.highest1 = tempMax;
            this.lowest1 = tempMin;
            if(tempMin >0 && tempMax > 0)
            this.ratio1 = (tempMax* 1.0 ) / (tempMin *1.0);
        
            tempMax = 0;
            tempMin = 0;
        
            for(let i = 0; i<this.result1_2.length; i++){
        
              if(i == 0 ){
                tempMax = this.result1_2[i];
                tempMin = this.result1_2[i];
              } 
                if(this.result1_2[i] - tempMax >= 0){
                tempMax = this.result1_2[i];
               }
                if(this.result1_2[i] - tempMin <= 0){
                tempMin = this.result1_2[i];
                }
            }
    
            this.highest2 = tempMax;
            this.lowest2 = tempMin;
            if(tempMin >0 && tempMax > 0)
            this.ratio2 = (tempMax* 1.0 ) / (tempMin *1.0);
        
            tempMax = 0;
            tempMin = 0;
      
            for(let i = 0; i<this.result1_3.length; i++){
        
              if(i == 0 ){
                tempMax = this.result1_3[i];
                tempMin = this.result1_3[i];
              }
                if(this.result1_3[i] - tempMax >= 0)
                tempMax = this.result1_3[i];
        
                if(this.result1_3[i] -  tempMin <=0)
                tempMin = this.result1_3[i] ;
            }
        
            this.highest3 = tempMax;
            this.lowest3 = tempMin;
    
            if(tempMin >0 && tempMax > 0)
            this.ratio3 = (tempMax* 1.0 ) / (tempMin *1.0) ;
        
            tempMax = 0;
            tempMin = 0;
            if(this.ratio1 != 0) {tempMax += this.ratio1; tempMin++;}
            if(this.ratio2 != 0) {tempMax += this.ratio2; tempMin++;}
            if(this.ratio3 != 0) {tempMax += this.ratio3; tempMin++;}
    
            if(tempMin ==0)
                tem1 = 0;
              else
              tem1 = (tempMax) / tempMin;
            // end test1 data 

            // start test2 data 
  
            this.result2_1 = JSON.parse(data.rows.item(i).t2_1);
  
            let valid_test = 0;
            let sum = 0;
            if(this.result2_1.length>0){
              valid_test++;
              sum += Math.round(((this.result2_1[0] - this.result2_1[1])+
                    (this.result2_1[2] - this.result2_1[3])+
                    (this.result2_1[4] - this.result2_1[5])+
                    (this.result2_1[6] - this.result2_1[7])+
                    (this.result2_1[8] - this.result2_1[9])+
                    (this.result2_1[10] - this.result2_1[11]))/ 6);
            }
  
            if(valid_test == 0)
            tem2 = 0;
            else {
              tem2 = Math.round(sum / valid_test);
            }
            // end test2 data 
            
            // start test3 data
            this.result3_1 = JSON.parse(data.rows.item(i).t3_1);
            if (this.result3_1.length > 0) {
              var max = this.result3_1[3];
              if (this.result3_1[5] > max)
                  max = this.result3_1[5];
              if (this.result3_1[7] > max)
                  max = this.result3_1[7];
              if (this.result3_1[9] > max)
                  max = this.result3_1[9];
              if (this.result3_1[11] > max)
                  max = this.result3_1[11];
              console.log(max, this.result3_1[1]);
              tem3 = max - this.result3_1[1];
          }
          else {
              tem3 = 0;
          }
  
            // end test3 data 
  
            // start test4 data
        
          this.result4_1 = JSON.parse(data.rows.item(i).t4_1);
          if (this.result4_1.length > 0) {
            tem4 = this.result4_1[1] / this.result4_1[0];
          } else {
            tem4 = 0;
          }
            
            // end test4 data 
  
            // start test4b data
          this.result4b_1 = JSON.parse(data.rows.item(0).t4_2);
          if (this.result4b_1.length > 0) {
            var min = this.result4b_1[2];
            if (this.result4b_1[4] < min)
              min = this.result4b_1[4];
            if (this.result4b_1[6] < min)
              min = this.result4b_1[6];
            tem5 = Math.abs(min - this.result4b_1[0]);
          }
          else {
            tem5 = 0;
          }
          // end test4b data 
          var t1_f = 0;
          var t2_f = 0;
          var t3_f = 0;
          var t4_f = 0;
          var t5_f = 0;
          if (tem1 != 0 && tem1 <= 1.1) {
            t1_f = 0;
          }
          else if (tem1 > 1.1 && tem1 <= 1.20) {
            t1_f = 1;
          }
          else {
            t1_f = 2;
          }
          if (tem2 != 0 && tem2 <= 10) {
            t2_f = 0;
          }
          else if (tem2 > 10 && tem2 <= 14) {
            t2_f = 1;
          }
          else {
            t2_f = 2;
          }
          if (tem3 != 0 && tem3 <= 10) {
            t3_f = 0;
          }
          else if (tem3 > 10 && tem3 < 16) {
            t3_f = 1;
          }
          else {
            t3_f = 2;
          }
          if (tem4 != 0 && tem4 <= 1) {
            t4_f = 0;
          }
          else if (tem4 > 1 && tem4 <= 1.03) {
            t4_f = 1;
          }
          else {
            t4_f = 2;
          }
          if (tem5 != 0 && tem5 >= 30) {
            t5_f = 0;
          }
          else if (tem5 > 10 && tem5 < 30) {
            t5_f = 1;
          }
          else {
            t5_f = 2;
          }
          var normal = 0;
          var borderline = 0;
          var abnormal = 0;
          var HR_borderline = 0;
          var HR_abnormal = 0;
          var BP_borderline = 0;
          var BP_abnormal = 0;
          var final_type = 1;
          if (t1_f == 2)
            normal++;
          if (t2_f == 2)
            normal++;
          if (t3_f == 2)
            normal++;
          if (t4_f == 2)
            normal++;
          if (t5_f == 2)
            normal++;
          if (t1_f == 1)
            borderline++;
          if (t2_f == 1)
            borderline++;
          if (t3_f == 1)
            borderline++;
          if (t4_f == 1)
            borderline++;
          if (t5_f == 1)
            borderline++;
          if (t1_f == 0)
            abnormal++;
          if (t2_f == 0)
            abnormal++;
          if (t3_f == 0)
            abnormal++;
          if (t4_f == 0)
            abnormal++;
          if (t5_f == 0)
            abnormal++;
          if (t1_f == 1)
            HR_borderline++;
          if (t2_f == 1)
            HR_borderline++;
          if (t4_f == 1)
            HR_borderline++;
          if (t1_f == 0)
            HR_abnormal++;
          if (t2_f == 0)
            HR_abnormal++;
          if (t4_f == 0)
            HR_abnormal++;
          if (t3_f == 1)
            BP_borderline++;
          if (t5_f == 1)
            BP_borderline++;
          if (t3_f == 0)
            BP_abnormal++;
          if (t5_f == 0)
            BP_abnormal++;
          console.log(t1_f, t2_f, t3_f, t4_f, t5_f);
          if (normal == 5 || (normal == 4 && borderline == 1)) {
            final_type = 1;
          }
          else if (HR_borderline >= 2 || HR_abnormal == 1) {
            final_type = 2;
          }
          else if (HR_abnormal >= 2) {
            if (BP_borderline == 2 || BP_abnormal >= 1)
              final_type = 4;
            else
              final_type = 3;
          }
          else {
            final_type = 5;
          }

          this.datas.push({
            id: data.rows.item(i).id,
            age: data.rows.item(i).age,
            name: data.rows.item(i).name,
            time: data.rows.item(i).createTime,
            t1result: tem1,
            t2result: tem2,
            t3result: tem3,
            t4result: tem4,
            t4result2: tem5,
            failure: final_type
          });

        }



      });


    });


    this.presentPrompt();


  }


  onInput(a) {
    this.searchAllRecord();
  }
  onCancel(a) {
    this.searchAllRecord();
  }

  showPatient(id) {
    console.log(id);
    this.datab.executeSql(`select * from patient_table where id = ` + id + `;`, {})
      .then(data => {
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
 
        this.patient_name = data.rows.item(0).name;
        this.patient_age = data.rows.item(0).age;
        this.patient_time = data.rows.item(0).createTime;

        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;

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
this.ratio1 = (tempMax* 1.0 ) / (tempMin *1.0); else{
  this.ratio1 = 0;
}

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
this.ratio2 = (tempMax* 1.0 ) / (tempMin *1.0); else{
  this.ratio2 = 0;
}

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
this.ratio3 = (tempMax* 1.0 ) / (tempMin *1.0) ; else{
  this.ratio3 = 0;
}

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

     let temp = 0;
     let count = 0;
       if(this.average_t2_1>0){temp+=this.average_t2_1; count++;}

     if(count==0) this.average_t2 = 0;
     else { this.average_t2 = Math.round(temp / count) ;}


     console.log(JSON.stringify(this.result_t2_0));
     this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);

     if(this.result_t3_1.length>0){
       this.t3_up1 = this.result_t3_1[0];
       this.t3_down1 = this.result_t3_1[1];
       this.t3_up2 = this.result_t3_1[2];
       this.t3_down2 = this.result_t3_1[3];
       this.t3_up3 = this.result_t3_1[4];
       this.t3_down3 = this.result_t3_1[5];
       this.t3_up4 = this.result_t3_1[6];
       this.t3_down4 = this.result_t3_1[7];
       this.t3_up5 = this.result_t3_1[8];
       this.t3_down5 = this.result_t3_1[9];
       this.t3_up6 = this.result_t3_1[10];
       this.t3_down6 = this.result_t3_1[11];
       var max = this.result_t3_1[3];
       if (this.result_t3_1[5] > max)
         max = this.result_t3_1[5];
       if (this.result_t3_1[7] > max)
         max = this.result_t3_1[7];
       if (this.result_t3_1[9] > max)
         max = this.result_t3_1[9];
       if (this.result_t3_1[11] > max)
         max = this.result_t3_1[11];
       this.average_t3 = max - this.result_t3_1[1];
     
       } else { this.average_t3 = 0;}

       this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);

       if(this.result_t4_1.length>0){
          this.RRI15 = this.result_t4_1[0];
          this.RRI30 = this.result_t4_1[1];
          this.average_RRI = this.result_t4_1[1] / this.result_t4_1[0];

       }
 
       this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);

       if(this.result_t4_2.length>0){
         this.up1 = this.result_t4_2[0];
         this.down1 = this.result_t4_2[1];
         this.up2 = this.result_t4_2[2];
         this.down2 = this.result_t4_2[3];                
         this.up3 = this.result_t4_2[4];
         this.down3 = this.result_t4_2[5];
         this.up4 = this.result_t4_2[6];
         this.down4 = this.result_t4_2[7];
         var min = this.up2;
         if (this.up3 < min)
           min = this.up3;
         if (this.up4 < min)
           min = this.up4;
         this.average_t4 = Math.abs(min - this.up1);
         } else { this.average_t4 = 0;}



setTimeout(() => {

  this.slideew.slideTo(0,0);
  this.slideew.update();

  console.log(this.ratio1,this.ratio2,this.ratio3);

  if(this.ratio1 != 0 ){
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

if(this.ratio2 != 0 ){
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


if(this.ratio3 != 0){

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
}, 500);

         
  
  });

  this.selected = true;
}

searchAllRecord(){

  let query = `select * from patient_table order by id desc`;
  if(this.searchInput!=""){
   query = `select * from patient_table where name like '%`+this.searchInput+`%'
   OR  age like '%`+this.searchInput+`%'  order by id desc;`;
  }

    this.datab.executeSql(query, {})
    .then( data => {

      this.datas = [];

      for(var i=0; i<data.rows.length; i++){

        let tem1 = 0;
        let tem2 = 0;
        let tem3 = 0;
        let tem4 = 0;
        let tem5 = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;

          // start test1 data 
          this.result1_1 = JSON.parse(data.rows.item(i).t1_1);
          this.result1_2 = JSON.parse(data.rows.item(i).t1_2);
          this.result1_3 = JSON.parse(data.rows.item(i).t1_3);

          let tempMax = 0;
          let tempMin = 0;

          for(let i = 0; i<this.result1_1.length; i++){
  
            if(i == 0 ){
              tempMax = this.result1_1[i];
              tempMin = this.result1_1[i];
            }  
              if(this.result1_1[i]- tempMax >=0)
              tempMax = this.result1_1[i];
  
              if(this.result1_1[i] - tempMin <=0) 
              tempMin = this.result1_1[i];
  
          }

          this.highest1 = tempMax;
          this.lowest1 = tempMin;
          if(tempMin >0 && tempMax > 0)
          this.ratio1 = (tempMax* 1.0 ) / (tempMin *1.0);
      
          tempMax = 0;
          tempMin = 0;
      
          for(let i = 0; i<this.result1_2.length; i++){
      
            if(i == 0 ){
              tempMax = this.result1_2[i];
              tempMin = this.result1_2[i];
            } 
              if(this.result1_2[i] - tempMax >= 0){
              tempMax = this.result1_2[i];
             }
              if(this.result1_2[i] - tempMin <= 0){
              tempMin = this.result1_2[i];
              }
          }
  
          this.highest2 = tempMax;
          this.lowest2 = tempMin;
          if(tempMin >0 && tempMax > 0)
          this.ratio2 = (tempMax* 1.0 ) / (tempMin *1.0);
      
          tempMax = 0;
          tempMin = 0;
    
          for(let i = 0; i<this.result1_3.length; i++){
      
            if(i == 0 ){
              tempMax = this.result1_3[i];
              tempMin = this.result1_3[i];
            }
              if(this.result1_3[i] - tempMax >= 0)
              tempMax = this.result1_3[i];
      
              if(this.result1_3[i] -  tempMin <=0)
              tempMin = this.result1_3[i] ;
          }
      
          this.highest3 = tempMax;
          this.lowest3 = tempMin;
  
          if(tempMin >0 && tempMax > 0)
          this.ratio3 = (tempMax* 1.0 ) / (tempMin *1.0) ;
      
          tempMax = 0;
          tempMin = 0;
          if(this.ratio1 != 0) {tempMax += this.ratio1; tempMin++;}
          if(this.ratio2 != 0) {tempMax += this.ratio2; tempMin++;}
          if(this.ratio3 != 0) {tempMax += this.ratio3; tempMin++;}

          if(tempMin ==0)
              tem1 = 0;
            else
            tem1 = (tempMax) / tempMin;
          // end test1 data 

          // start test2 data 

          this.result2_1 = JSON.parse(data.rows.item(i).t2_1);

          let valid_test = 0;
          let sum = 0;
          if(this.result2_1.length>0){
            valid_test++;
            sum += Math.round(((this.result2_1[0] - this.result2_1[1])+
                  (this.result2_1[2] - this.result2_1[3])+
                  (this.result2_1[4] - this.result2_1[5])+
                  (this.result2_1[6] - this.result2_1[7])+
                  (this.result2_1[8] - this.result2_1[9])+
                  (this.result2_1[10] - this.result2_1[11])) / 6);
          }

          if(valid_test == 0)
          tem2 = 0;
          else {
            tem2 = Math.round(sum / valid_test);
          }
          // end test2 data 

          // start test3 data

          this.result3_1 = JSON.parse(data.rows.item(i).t3_1);

        if (this.result3_1.length > 0) {
          let max = this.result3_1[3];
          if (this.result3_1[5] > max)
            max = this.result3_1[5];
          if (this.result3_1[7] > max)
            max = this.result3_1[7];
          if (this.result3_1[9] > max)
            max = this.result3_1[9];
          if (this.result3_1[11] > max)
            max = this.result3_1[11];
          console.log(max, this.result3_1[1]);
          tem3 = max - this.result3_1[1];
        }
        else{
          tem3 = 0;
        }

          // end test3 data 

          // start test4 data

        this.result4_1 = JSON.parse(data.rows.item(i).t4_1);
        if (this.result4_1.length > 0) {
          tem4 = this.result4_1[1] / this.result4_1[0];
        }
        else {
          tem4 = 0;
        }
        // end test4 data 
        // start test4b data
        this.result4b_1 = JSON.parse(data.rows.item(0).t4_2);
        if (this.result4b_1.length > 0) {
          var min = this.result4b_1[2];
          if (this.result4b_1[4] < min)
            min = this.result4b_1[4];
          if (this.result4b_1[6] < min)
            min = this.result4b_1[6];
          tem5 = Math.abs(min - this.result4b_1[0]);
        }
        else {
          tem5 = 0;
        }

        // end test4b data 
        var t1_f = 0;
        var t2_f = 0;
        var t3_f = 0;
        var t4_f = 0;
        var t5_f = 0;
        if (tem1 != 0 && tem1 <= 1.1) {
          t1_f = 0;
        }
        else if (tem1 > 1.1 && tem1 <= 1.20) {
          t1_f = 1;
        }
        else {
          t1_f = 2;
        }
        if (tem2 != 0 && tem2 <= 10) {
          t2_f = 0;
        }
        else if (tem2 > 10 && tem2 <= 14) {
          t2_f = 1;
        }
        else {
          t2_f = 2;
        }
        if (tem3 != 0 && tem3 <= 10) {
          t3_f = 0;
        }
        else if (tem3 > 10 && tem3 < 16) {
          t3_f = 1;
        }
        else {
          t3_f = 2;
        }
        if (tem4 != 0 && tem4 <= 1) {
          t4_f = 0;
        }
        else if (tem4 > 1 && tem4 <= 1.03) {
          t4_f = 1;
        }
        else {
          t4_f = 2;
        }
        if (tem5 != 0 && tem5 >= 30) {
          t5_f = 0;
        }
        else if (tem5 > 10 && tem5 < 30) {
          t5_f = 1;
        }
        else {
          t5_f = 2;
        }
        let normal = 0;
        let borderline = 0;
        let abnormal = 0;
        let HR_borderline = 0;
        let HR_abnormal = 0;
        let BP_borderline = 0;
        let BP_abnormal = 0;
        let final_type = 1;
        if (t1_f == 2)
          normal++;
        if (t2_f == 2)
          normal++;
        if (t3_f == 2)
          normal++;
        if (t4_f == 2)
          normal++;
        if (t5_f == 2)
          normal++;
        if (t1_f == 1)
          borderline++;
        if (t2_f == 1)
          borderline++;
        if (t3_f == 1)
          borderline++;
        if (t4_f == 1)
          borderline++;
        if (t5_f == 1)
          borderline++;
        if (t1_f == 0)
          abnormal++;
        if (t2_f == 0)
          abnormal++;
        if (t3_f == 0)
          abnormal++;
        if (t4_f == 0)
          abnormal++;
        if (t5_f == 0)
          abnormal++;
        if (t1_f == 1)
          HR_borderline++;
        if (t2_f == 1)
          HR_borderline++;
        if (t4_f == 1)
          HR_borderline++;
        if (t1_f == 0)
          HR_abnormal++;
        if (t2_f == 0)
          HR_abnormal++;
        if (t4_f == 0)
          HR_abnormal++;
        if (t3_f == 1)
          BP_borderline++;
        if (t5_f == 1)
          BP_borderline++;
        if (t3_f == 0)
          BP_abnormal++;
        if (t5_f == 0)
          BP_abnormal++;
        console.log(t1_f, t2_f, t3_f, t4_f, t5_f);
        if (normal == 5 || (normal == 4 && borderline == 1)) {
          final_type = 1;
        }
        else if (HR_borderline >= 2 || HR_abnormal == 1) {
          final_type = 2;
        }
        else if (HR_abnormal >= 2) {
          if (BP_borderline == 2 || BP_abnormal >= 1)
            final_type = 4;
          else
            final_type = 3;
        }
        else {
          final_type = 5;
        }

        this.datas.push({
          id:data.rows.item(i).id,
          age:data.rows.item(i).age,
          name:data.rows.item(i).name,
          time:data.rows.item(i).createTime,
          t1result: tem1,
          t2result: tem2,
          t3result: tem3,
          t4result: tem4,
          t4result2: tem5,
          failure: final_type
        });

    
      }

    });

}

  clickPage(a){
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
    else if(a==9)
    this.navCtrl.setRoot(HomePage, {}, {animate: false, direction: 'forward'});
  }

  loadConfig(){
    this.navCtrl.push(TestConfigPage, {});
  }

  copy_csv(){

    let dataCSV = "";

    for(var i=0; i<this.datas.length; i++){

      dataCSV += "\""+this.datas[i].pid+"\","+
      "\""+this.datas[i].time+"\","+
      "\""+this.datas[i].breath+"\","+
      "\""+this.datas[i].hg+"\","+
      "\""+this.datas[i].blood+"\","+
      "\""+this.datas[i].heartrate+"\"\r\n";

    }

    this.clipboard.copy(dataCSV);

  }


  presentPrompt() {

    /*
    let alert = this.alertCtrl.create({
      title: 'Record',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            document.getElementById("contentRight").style.display="block";
            document.getElementById("contentLeft").style.display="block";
           // document.getElementById("contentLeft").style.boxShadow="0px 10px 10px 0 #aaa"; 
          }
        },
        {
          text: 'Login',
          handler: data => {
            
            if(data.password=="123"){

                document.getElementById("contentRight").style.display="block";
                document.getElementById("contentLeft").style.display="block";
               // document.getElementById("contentLeft").style.boxShadow="0px 10px 10px 0 #aaa"; 

            } else {

              this.navCtrl.setRoot(HomePage, {}, {animate: false, direction: 'forward'});
            }

          }
        }
      ]
    });

    alert.present();
    */
  }
  
}
