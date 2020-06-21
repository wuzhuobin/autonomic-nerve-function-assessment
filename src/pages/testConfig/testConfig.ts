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
        this.ble.connect('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78').subscribe(data => {
          this.hardware1ready = true; 
          },error =>{
            //console.log(error);
            this.hardware1ready = false; 
          });
      }

      if(!this.hardware2ready){
        this.ble.connect('3C1FD496-0DEB-4713-662F-FAE7AE85F548').subscribe(data => {
          this.hardware2ready = true; 
          },error =>{
            //console.log(error);
            this.hardware2ready = false; 
          });
      }

      if(!this.hardware3ready){
        this.ble.connect('F14956A6-16EC-88BA-1426-03749EBE87DE').subscribe(data => {
          this.hardware3ready = true; 
          },error =>{
            //console.log(error);
            this.hardware3ready = false; 
          });
      }

      if(!this.hardware4ready){
        this.ble.connect('B2BA478A-1212-5501-3801-2153FC58CE65').subscribe(data => {
          this.hardware4ready = true; 
          },error =>{
            //console.log(error);
            this.hardware4ready = false; 
          });
      }


      
      });

  }


  updateAllHardwareValue(){

    this.ble.isConnected('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78').then(
      ()=>{ 
        this.hardware1ready = true; 
        // getting result from hardware
        this.ble.read('3896CAC8-C2CD-C0CA-679D-9CDCC9E4FE78','19b10000-e8f2-537e-4f6c-d104768a1214','19b10001-e8f2-537e-4f6c-d104768a1214').then(data2=>{
          
          this.reading1 = (new Uint8Array(data2)[0]).toString();
          }).catch(error=>{
            //console.log(error);
          });

      },
      ()=>{ this.hardware1ready = false; }
    );
    
    this.ble.isConnected('3C1FD496-0DEB-4713-662F-FAE7AE85F548').then(
      ()=>{ 
        this.hardware2ready = true; 
        // getting result from hardware
        this.ble.read('3C1FD496-0DEB-4713-662F-FAE7AE85F548','19b10000-e8f2-537e-4f6c-d104768a1220','19b10001-e8f2-537e-4f6c-d104768a1220').then(data2=>{
          this.reading2 = (new Uint8Array(data2)[0]);
          }).catch(error=>{
            //console.log(error);
          });

      },
      ()=>{ this.hardware2ready = false; }
    );



    this.ble.isConnected('F14956A6-16EC-88BA-1426-03749EBE87DE').then( 
      ()=>{ 
        this.hardware3ready = true; 
        // getting result from hardware
        this.ble.read('F14956A6-16EC-88BA-1426-03749EBE87DE','180D','2A37').then(data2=>{

          this.reading3 = (new Uint16Array(data2)[0]);
          }).catch(error=>{
            ////console.log(error);
          });
          // getting calibration status from hardware
          this.ble.read('F14956A6-16EC-88BA-1426-03749EBE87DE','180D','2A37').then(data2=>{
            console.log(new Uint8Array(data2)[0]);
            if(new Uint8Array(data2)[0]==1){
             this.calibrating3 = false;  
            } else {
              this.calibrating3 = true;  
            }

            }).catch(error=>{
              ////console.log(error);
            });


          // getting pulseCount from hardware
          this.ble.read('F14956A6-16EC-88BA-1426-03749EBE87DE','180D','2A37').then(data2=>{
             this.pulseCount = (new Uint8Array(data2)[0]);
            }).catch(error=>{
              //console.log(error);
            });
          
      },
      ()=>{ this.hardware3ready = false; }
    );
       
    
    this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then( 
      ()=>{ 
        this.hardware4ready = true; 
        // getting if BP is processing from hardware

        this.ble.read('B2BA478A-1212-5501-3801-2153FC58CE65','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1226').then(data2=>{
          this.reading4_status = (new Uint16Array(data2)[0]);

          if(!this.bp_readed){
                if(this.reading4_status==0){
                  this.reading4_up = 0;
                  this.reading4_down = 0;
                } else if(this.reading4_status == 1){
                  this.reading4_up = 0;
                  this.reading4_down = 0;
                } else {
                  // getting BP data
                  this.ble.read('B2BA478A-1212-5501-3801-2153FC58CE65','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1224').then(dataUP=>{
                  
                  if(Math.round((new Uint16Array(dataUP)[0]) / 3)<300)
                    this.reading4_up  = Math.round((new Uint16Array(dataUP)[0]) / 3);
                    else
                    this.reading4_up  = "ERR";
                  }).catch(error=>{
                  //console.log(error);
                  });

                  // getting BP data
                  this.ble.read('B2BA478A-1212-5501-3801-2153FC58CE65','19B10000-E8F2-537E-4F6C-D104768A1223','19B10001-E8F2-537E-4F6C-D104768A1225').then(dataDOWN=>{
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

    this.ble.isConnected('F14956A6-16EC-88BA-1426-03749EBE87DE').then(
      ()=>{ 
        this.hardware3ready = true; 
        var daa = new Uint8Array(1);
        daa[0] = 1;
        this.ble.write('F14956A6-16EC-88BA-1426-03749EBE87DE','180D','2A37',daa.buffer).then(data2=>{
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
 
     this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
       ()=>{ 
         this.hardware4ready = true; 
         var daa = new Uint8Array(1);
         daa[0] = 2;
         this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
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
     this.ble.isConnected('B2BA478A-1212-5501-3801-2153FC58CE65').then(
       ()=>{ 
         this.hardware4ready = true; 
         var daa = new Uint8Array(1);
         daa[0] = 1;
         this.ble.write('B2BA478A-1212-5501-3801-2153FC58CE65','19b10000-e8f2-537e-4f6c-d104768a1223','19B10001-E8F2-537E-4F6C-D104768A1223',daa.buffer).then(data2=>{
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
