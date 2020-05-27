
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestStartPage } from '../pages/testStart/testStart';
import { Test1Page } from '../pages/test1/test1';
import { Test1DetailPage } from '../pages/test1detail/test1detail';
import { Test2Page } from '../pages/test2/test2';
import { Test2DetailPage } from '../pages/test2detail/test2detail';
import { Test3Page } from '../pages/test3/test3';
import { Test3DetailPage } from '../pages/test3detail/test3detail';
import { Test4Page } from '../pages/test4/test4';
import { Test4DetailPage } from '../pages/test4detail/test4detail';
import { Test4DetailPage_2 } from '../pages/test4detail_2/test4detail_2';
import { Test5Page } from '../pages/test5/test5';
import { TestEndPage } from '../pages/testEnd/testEnd';

import { TestConfigPage } from '../pages/testConfig/testConfig';

import { Clipboard } from '@ionic-native/clipboard';
import { EmailComposer } from '@ionic-native/email-composer';
import { Keyboard } from '@ionic-native/keyboard';

import { BLE } from '@ionic-native/ble';

import { IonicStorageModule } from '@ionic/storage';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestStartPage,
    Test1Page,
    Test1DetailPage,
    Test2Page,
    Test2DetailPage,
    Test3Page,
    Test3DetailPage,
    Test4Page,
    Test4DetailPage,
    Test4DetailPage_2,
    Test5Page,
    TestEndPage,
    TestConfigPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
        platforms : {
          ios : {
            // These options are available in ionic-angular@2.0.0-beta.2 and up.
            scrollAssist: false,    // Valid options appear to be [true, false]
            autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
          }
          // http://ionicframework.com/docs/v2/api/config/Config/)
        }
      }
      /*
       * END MODIFY
       */),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestStartPage,
    Test1Page,
    Test1DetailPage,
    Test2Page,
    Test2DetailPage,
    Test3Page,
    Test3DetailPage,
    Test4Page,
    Test4DetailPage,
    Test4DetailPage_2,
    Test5Page,
    TestEndPage,
    TestConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmailComposer,
    Clipboard,
    Keyboard,
    BLE,
    SQLite
  ]
})
export class AppModule {}
