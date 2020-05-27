import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import swal from 'sweetalert2';

@Component({
  selector: 'page-testConfig',
  templateUrl: 'testConfig.html',
})


export class TestConfigPage {

  public task : any;
  public task2 : any;

public getReading1 : any;
public getReading2 : any;

public hardware1ready : boolean;
public hardware2ready : boolean;
public hardware3ready : boolean;
public hardware4ready : boolean;

public reading1 : any;
public reading2 : any = 0;
public reading3 : any = 0;
public reading4_up : any = 0;
public reading4_down : any = 0;
public reading4_status : any = 0;

public bp_readed : boolean = false; 

public pulseCount : any;

public calibrating3 : boolean;

public backParent : any;

  constructor(public ble: BLE, public navCtrl: NavController, public navParams: NavParams) {

    
    this.task = setInterval(()=>{
      this.checkAllHardware();
    },3000);

    this.task2 = setInterval(()=>{
      this.updateAllHardwareValue();      
    },200);

    this.backParent = navParams.data.parent;

  }

  checkAllHardware(){


    this.ble.scan([], 2).subscribe(device => {
          
      
      if(!this.hardware1ready){
        this.ble.connect('48A655A2-4501-85DC-3C66-567AB4B05570').subscribe(data => {
          this.hardware1ready = true; 
          },error =>{
            //console.log(error);
            this.hardware1ready = false; 
          });
      }

      if(!this.hardware2ready){
        this.ble.connect('E69A1D2B-7877-E45B-A5AB-19D0D4C6C22F').subscribe(data => {
          this.hardware2ready = true; 
          },error =>{
            //console.log(error);
            this.hardware2ready = false; 
          });
      }

      if(!this.hardware3ready){
        this.ble.connect('1299559F-DF0D-783C-9E47-DB2E6CFA82F3').subscribe(data => {
          this.hardware3ready = true; 
          },error =>{
            //console.log(error);
            this.hardware3ready = false; 
          });
      }

      if(!this.hardware4ready){
        this.ble.connect('BEE5D114-1482-A85C-6861-256ABE298898').subscribe(data => {
          this.hardware4ready = true; 
          },error =>{
            //console.log(error);
            this.hardware4ready = false; 
          });
      }


      
      });

  }


  updateAllHardwareValue(){

    this.ble.isConnected('48A655A2-4501-85DC-3C66-567AB4B05570').then(
      ()=>{ 
        this.hardware1ready = true; 

        this.ble.read('48A655A2-4501-85DC-3C66-567AB4B05570','19b10000-e8f2-537e-4f6c-d104768a1214','19b10001-e8f2-537e-4f6c-d104768a1214').then(data2=>{
          
          this.reading1 = (new Uint8Array(data2)[0]).toString();
          }).catch(error=>{
            //console.log(error);
          });

      },
      ()=>{ this.hardware1ready = false; }
    );
    
    this.ble.isConnected('E69A1D2B-7877-E45B-A5AB-19D0D4C6C22F').then(
      ()=>{ 
        this.hardware2ready = true; 

        this.ble.read('E69A1D2B-7877-E45B-A5AB-19D0D4C6C22F','19b10000-e8f2-537e-4f6c-d104768a1220','19b10001-e8f2-537e-4f6c-d104768a1220').then(data2=>{
          this.reading2 = (new Uint8Array(data2)[0]);
          }).catch(error=>{
            //console.log(error);
          });

      },
      ()=>{ this.hardware2ready = false; }
    );



    this.ble.isConnected('1299559F-DF0D-783C-9E47-DB2E6CFA82F3').then( 
      ()=>{ 
        this.hardware3ready = true; 

        this.ble.read('1299559F-DF0D-783C-9E47-DB2E6CFA82F3','19b10000-e8f2-537e-4f6c-d104768a1216','19B10001-E8F2-537E-4F6C-D104768A1216').then(data2=>{

          this.reading3 = (new Uint16Array(data2)[0]);
          }).catch(error=>{
            ////console.log(error);
          });

          this.ble.read('1299559F-DF0D-783C-9E47-DB2E6CFA82F3','19b10000-e8f2-537e-4f6c-d104768a1216','19B10001-E8F2-537E-4F6C-D104768A1219').then(data2=>{
            console.log(new Uint8Array(data2)[0]);
            if(new Uint8Array(data2)[0]==1){
             this.calibrating3 = false;  
            } else {
              this.calibrating3 = true;  
            }

            }).catch(error=>{
              ////console.log(error);
            });


          this.ble.read('1299559F-DF0D-783C-9E47-DB2E6CFA82F3','19b10000-e8f2-537e-4f6c-d104768a1216','19B10001-E8F2-537E-4F6C-D104768A1217').then(data2=>{
             this.pulseCount = (new Uint8Array(data2)[0]);
            }).catch(error=>{
              //console.log(error);
            });
          
      },
      ()=>{ this.hardware3ready = false; }
    );
       
    
    this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then( 
      ()=>{ 
        this.hardware4ready = true; 

console.log("reading4_status:"+this.reading4_status);

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
                  
                  this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1224').then(dataUP=>{
                  
                  if(Math.round((new Uint16Array(dataUP)[0]) / 3)<300)
                    this.reading4_up  = Math.round((new Uint16Array(dataUP)[0]) / 3);
                    else
                    this.reading4_up  = "ERR";
                  }).catch(error=>{
                  //console.log(error);
                  });

                  this.ble.read('BEE5D114-1482-A85C-6861-256ABE298898','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1225').then(dataDOWN=>{
                    if(Math.round((new Uint16Array(dataDOWN)[0]) / 3)<150)
                    this.reading4_down  = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                    else
                    this.reading4_down  = "ERR";
                  }).catch(error=>{
                  //console.log(error);
                  });

                  this.bp_readed = true;
                  this.resetValue();

                }

               }
         }).catch(error=>{
           //console.log(error);
         });



          
      },
      ()=>{ this.hardware4ready = false;}
    );



  }




    bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
   }

   popThis(){
     clearInterval(this.task);
     clearInterval(this.task2);
    this.navCtrl.setRoot(this.backParent, {}, {animate: true, direction: 'back'});
   }


   clickCalibrate(){

   this.calibrating3 = true;

    this.ble.isConnected('1299559F-DF0D-783C-9E47-DB2E6CFA82F3').then(
      ()=>{ 
        this.hardware3ready = true; 
        var daa = new Uint8Array(1);
        daa[0] = 1;
        this.ble.write('1299559F-DF0D-783C-9E47-DB2E6CFA82F3','19b10000-e8f2-537e-4f6c-d104768a1216','19B10001-E8F2-537E-4F6C-D104768A1218',daa.buffer).then(data2=>{
         // console.log(data2);
          }).catch(error=>{
            //console.log(error);
          });

      },
      ()=>{ 
        this.hardware3ready = false; 
        this.calibrating3 = false;
      }
    );
   }

   resetValue(){
 
     this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then(
       ()=>{ 
         this.hardware4ready = true; 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('BEE5D114-1482-A85C-6861-256ABE298898','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           console.log(data2);
           }).catch(error=>{
             //console.log(error);
           });
 
       },
       ()=>{ this.hardware4ready = false; 
       }
     );
    }

   clickStartBP(){

    this.bp_readed = false;
     this.ble.isConnected('BEE5D114-1482-A85C-6861-256ABE298898').then(
       ()=>{ 
         this.hardware4ready = true; 
         var daa = new Uint8Array(1);
         daa[0] = 1;
         this.ble.write('BEE5D114-1482-A85C-6861-256ABE298898','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
           console.log(data2);
           }).catch(error=>{
             //console.log(error);
           });
 
       },
       ()=>{ this.hardware4ready = false; 
       }
     );
     
    }


}
