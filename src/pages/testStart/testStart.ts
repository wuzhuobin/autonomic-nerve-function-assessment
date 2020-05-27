import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Test1Page } from '../test1/test1';
import { Test2Page } from '../test2/test2';
import { Test3Page } from '../test3/test3';
import { Test4Page } from '../test4/test4';
import { Test5Page } from '../test5/test5';
import { TestEndPage } from '../testEnd/testEnd';

import { TestConfigPage } from '../testConfig/testConfig';

@Component({
  selector: 'page-testStart',
  templateUrl: 'testStart.html',
})
export class TestStartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  }

  loadConfig(){
    this.navCtrl.push(TestConfigPage, {});
  }
}
