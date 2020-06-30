webpackJsonp([0],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test4DetailPage_2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Test4DetailPage_2 = (function () {
    function Test4DetailPage_2(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.currentTime = 180;
        this.currentTimeTextM = "3";
        this.currentTimeTextS = "0";
        this.loadProgress = 100;
        this.result = [];
        this.bp_readed = false;
        this.orthostasis_stage = 0;
        this.reading4_status = 0;
        this.reading4_up = 0;
        this.reading4_down = 0;
        this.reading4_up_trial = [0, 0, 0];
        this.reading4_down_trial = [0, 0, 0];
        this.BP_Trial = 0;
        this.trial = 0;
        this.RRIReadng = 0;
        this.baseBeatCount = 0;
        this.currentBeatCount = 0;
        this.RRI15 = 0;
        this.RRI30 = 0;
        this.CountdownSecond = 3;
        this.tempString = "";
        this.stand = false;
        this.result2 = [];
        this.result3015 = [];
        this.timesup = false;
        this.storage.get('id').then(function (val) {
            //console.log(' id is', val);
            _this.patient_id = val;
        });
        this.resetValue();
        this.gettingHRTask = setInterval(function () {
            _this.getRRIvalue();
            console.log(_this.RRI15, _this.RRI30);
        }, 200);
    }
    Test4DetailPage_2.prototype.backTest4 = function () {
        var _this = this;
        clearInterval(this.testSecondTask);
        clearInterval(this.gettingBPTask);
        clearInterval(this.gettingHRTask);
        clearInterval(this.countdownTask);
        clearInterval(this.saveDataTask);
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.result.push(_this.reading4_up);
            _this.result.push(_this.reading4_down);
            _this.result.push(_this.reading4_up_trial[0]);
            _this.result.push(_this.reading4_down_trial[0]);
            _this.result.push(_this.reading4_up_trial[1]);
            _this.result.push(_this.reading4_down_trial[1]);
            _this.result.push(_this.reading4_up_trial[2]);
            _this.result.push(_this.reading4_down_trial[2]);
            var data = [JSON.stringify(_this.result)];
            var data2 = [JSON.stringify(_this.result3015)];
            _this.datab.executeSql("UPDATE patient_table SET t4_2 = ? where id='" + _this.patient_id + "';", data)
                .then(function () {
                _this.datab.executeSql("UPDATE patient_table SET t4_1 = ? where id='" + _this.patient_id + "';", data2)
                    .then(function () {
                    console.log(data);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
                });
            });
        });
    };
    Test4DetailPage_2.prototype.standup25 = function () {
        this.orthostasis_stage = 25;
    };
    Test4DetailPage_2.prototype.standup = function () {
        var _this = this;
        this.RRI15 = 0;
        this.RRI30 = 0;
        var daa = new Uint8Array(1);
        daa[0] = 2;
        this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1218', daa.buffer).then(function (data2) {
            _this.orthostasis_stage = 3;
            _this.testSecondTask = setInterval(function () {
                _this.eachSecond();
            }, 1000);
        }).catch(function (error) {
            console.log(error);
        });
        this.saveDataTask = setInterval(function () {
            _this.readDatafor15and30();
        }, 200);
    };
    Test4DetailPage_2.prototype.takeReading = function () {
        var _this = this;
        this.resetValue();
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 1;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                console.log(" reset");
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
        });
        this.gettingBPTask = setInterval(function () {
            _this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
                _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1226').then(function (data2) {
                    _this.reading4_status = (new Uint16Array(data2)[0]);
                    console.log("this.reading4_status", _this.reading4_status, " BP readed", _this.bp_readed);
                    if (!_this.bp_readed) {
                        if (_this.reading4_status == 0) {
                            _this.reading4_up_trial[_this.BP_Trial] = 0;
                            _this.reading4_down_trial[_this.BP_Trial] = 0;
                        }
                        else if (_this.reading4_status == 1) {
                            _this.reading4_up_trial[_this.BP_Trial] = 0;
                            _this.reading4_down_trial[_this.BP_Trial] = 0;
                        }
                        else {
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1224').then(function (dataUP) {
                                if (Math.round((new Uint16Array(dataUP)[0]) / 3) < 300)
                                    _this.reading4_up_trial[_this.BP_Trial] = Math.round((new Uint16Array(dataUP)[0]) / 3);
                                else
                                    _this.reading4_up_trial[_this.BP_Trial] = 0;
                            }).catch(function (error) {
                                console.log(error);
                            });
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1225').then(function (dataDOWN) {
                                if (Math.round((new Uint16Array(dataDOWN)[0]) / 3) < 150)
                                    _this.reading4_down_trial[_this.BP_Trial] = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                                else
                                    _this.reading4_down_trial[_this.BP_Trial] = 0;
                            }).catch(function (error) {
                                console.log(error);
                            });
                            if (_this.reading4_down_trial[_this.BP_Trial] != 0 && _this.reading4_up_trial[_this.BP_Trial] != 0) {
                                _this.bp_readed = true;
                                _this.BP_Trial++;
                                clearInterval(_this.gettingBPTask);
                                if (_this.BP_Trial >= 3) {
                                    _this.orthostasis_stage = 5;
                                    _this.trial = 1;
                                }
                            }
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }, function () { });
        }, 300);
    };
    Test4DetailPage_2.prototype.readDatafor15and30 = function () {
        this.result3015 = [];
        if ((this.currentBeatCount - this.baseBeatCount) == 15 && this.RRI15 == 0) {
            this.RRI15 = this.RRIReadng;
        }
        if ((this.currentBeatCount - this.baseBeatCount) == 30 && this.RRI30 == 0) {
            this.RRI30 = this.RRIReadng;
            this.result3015.push(this.RRI15, this.RRI30);
            clearInterval(this.saveDataTask);
        }
    };
    Test4DetailPage_2.prototype.clickTestStartOrthostasis = function () {
        var _this = this;
        this.orthostasis_stage = 1;
        this.bp_readed = false;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 1;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                //console.log(data2);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () {
        });
        this.gettingBPTask = setInterval(function () {
            _this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
                _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1226').then(function (data2) {
                    _this.reading4_status = (new Uint16Array(data2)[0]);
                    if (!_this.bp_readed) {
                        if (_this.reading4_status == 0) {
                            _this.reading4_up = 0;
                            _this.reading4_down = 0;
                        }
                        else if (_this.reading4_status == 1) {
                            _this.reading4_up = 0;
                            _this.reading4_down = 0;
                        }
                        else {
                            _this.bp_readed = true;
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1224').then(function (dataUP) {
                                if (Math.round((new Uint16Array(dataUP)[0]) / 3) < 150)
                                    _this.reading4_up = Math.round((new Uint16Array(dataUP)[0]) / 3);
                                else
                                    _this.reading4_up = "0";
                            }).catch(function (error) {
                                console.log("e1");
                            });
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1225').then(function (dataDOWN) {
                                if (Math.round((new Uint16Array(dataDOWN)[0]) / 3) < 150)
                                    _this.reading4_down = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                                else
                                    _this.reading4_down = "0";
                            }).catch(function (error) {
                                console.log("e2");
                            });
                            clearInterval(_this.gettingBPTask);
                            console.log(_this.result.length);
                            console.log(JSON.stringify(_this.result));
                            _this.orthostasis_stage = 2;
                            _this.resetValue();
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }, function () { });
        }, 1000);
    };
    Test4DetailPage_2.prototype.redoTest = function () {
        this.result = [];
        this.trial = 0;
        this.orthostasis_stage = 0;
        this.currentTime = 180;
        this.loadProgress = 100;
        this.bp_readed = false;
        this.reading4_up = 0;
        this.reading4_down = 0;
        this.resetValue();
        this.timesup = false;
        this.RRI15 = 0;
        this.RRI30 = 0;
        this.reading4_up_trial = [0, 0, 0];
        this.reading4_down_trial = [0, 0, 0];
        clearInterval(this.testSecondTask);
        clearInterval(this.gettingBPTask);
    };
    Test4DetailPage_2.prototype.eachSecond = function () {
        this.currentTime--;
        this.currentTimeTextM = Math.floor(this.currentTime / 60);
        this.currentTimeTextS = (this.currentTime % 60);
        this.loadProgress = (this.currentTime / 180) * 100;
        console.log("this.loadProgress", this.loadProgress);
        if (this.currentTime == 125 || this.currentTime == 65 ||
            this.currentTime == 5) {
            this.bp_readed = false;
            this.takeReading();
        }
        if (this.currentTime <= 0) {
            clearInterval(this.testSecondTask);
            //this.orthostasis_stage = 4;
            //this.bp_readed = false;
        }
    };
    Test4DetailPage_2.prototype.resetValue = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 2;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                //console.log(data2);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () { });
    };
    Test4DetailPage_2.prototype.getRRIvalue = function () {
        var _this = this;
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19b10001-e8f2-537e-4f6c-d104768a1216').then(function (data2) {
                if ((new Uint16Array(data2)[0]) > 500 && (new Uint16Array(data2)[0]) < 1450)
                    _this.RRIReadng = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                console.log(error);
            });
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19b10001-e8f2-537e-4f6c-d104768a1217').then(function (data2) {
                _this.currentBeatCount = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                console.log(error);
            });
        }, function () { });
    };
    Test4DetailPage_2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test4detail_2',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test4detail_2/test4detail_2.html"*/'\n\n<ion-content text-left no-bounce style="overflow:none;background:rgb(240, 240, 240)">\n    <div class="ext-box" style=" background:#fff;box-shadow: 0 15px 15px -15px #888; width:120%; margin-left:-10%;padding-left:7%; font-family:\'Calibri\' ; height:12%; z-index:99; position:relative"> \n        <div class="int-box" style="padding-left:5%">\n            <table border="0" style="width:90%" >\n\n                <tr>\n                    <td style="width: 50%; vertical-align:middle"><B style="font-size:5em ; color:#444">30:15 Ratio &amp;<BR>Orthostasis</B> {{RRIReadng}} - {{currentBeatCount}}</td>\n                        <td style="text-align:right;width:25%;font-size:3em; vertical-align:middle">trials<BR>completed</td>\n                        <td style="text-align:right;width:25%;font-size:10em; font-weight:bold;  vertical-align:middle">{{trial}}/1</td>\n                </tr>\n            </table>\n            \n        </div>\n    </div>\n\n<div style="background:rgb(240, 240, 240);text-align:center; padding-top:40px; color:rgb(46,138,212) ;  ">\n \n    <div style="position:absolute; right:30px; top:32%;" *ngIf="orthostasis_stage==0">\n        <div (tap)="clickTestStartOrthostasis()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n            NEXT\n            </div>\n        </div>\n\n        <div style="position:absolute; right:30px; top:32%;" *ngIf="orthostasis_stage==2">\n            <div (tap)="standup25()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n                NEXT\n                </div>\n            </div>\n\n\n        <div style="position:absolute; right:30px; top:39%;" *ngIf="orthostasis_stage==2">\n                <div (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n                    REDO\n                    </div>\n                </div>\n\n            <div style="position:absolute; right:30px; top:32%;" *ngIf="orthostasis_stage==25">\n                    <div (tap)="standup()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n                        NEXT\n                        </div>\n                    </div>\n\n<table style="width:80%; margin-left:10%; text-align:left;" border=0 id="testingTable">\n<tr>\n    <td colspan="2">\n        <div>\n            <div *ngIf=" orthostasis_stage==0" style="font-size:8.5em; padding-top:100px">Lay down<br>and rest.</div>\n            <span *ngIf=" orthostasis_stage==1" style="font-size:7.5em; "><BR>Baseline BP<BR>Measuring...</span>\n            <div  *ngIf="orthostasis_stage==2" style="font-size:1em">\n                    <div style="font-size:6em; padding-top:70px;">\n                            Baseline BP<BR>SYS&nbsp;<span *ngIf="reading4_up!=0">{{reading4_up}}</span>\n                            <span *ngIf="reading4_up==0">ERR</span><BR>DIA&nbsp;<span *ngIf="reading4_down!=0">{{reading4_down}}</span>\n                             <span *ngIf="reading4_down==0">ERR</span>\n                              </div>\n                      </div>\n            <div *ngIf="orthostasis_stage==25" style="font-size:8.5em; padding-top:130px ">Stand up.</div>\n            <span *ngIf=" orthostasis_stage==4" style="font-size:7.5em; ">Taking Blood Pressure value.</span>\n        </div>\n    </td>\n</tr>\n           <tr *ngIf=" orthostasis_stage==2"> \n                <td style="width:100%; text-align:left;">\n                   </td>\n                   </tr>\n\n    <tr *ngIf="orthostasis_stage==3"> \n            <td style="width:100%; text-align:left;" colspan="2">\n                    <table cellspading=0 cellpadding=0 border=0 style="margin-top:10px; width:110%; font-size:4em">\n                        <tr style="font-size:1.5em"><td>RRI</td><td colspan="4">BP</td></tr>\n                            <tr>\n                                    <td style="width: 27%">15<sup>th</sup> {{RRI15}}</td>\n                                    <td style="width: 15%">Base</td><td style="width: 23%">{{reading4_up}}/{{reading4_down}}</td>\n                                    <td style="width: 15%">2<sup>nd</sup></td><td style="width: 23%">{{reading4_up_trial[1]}}/{{reading4_down_trial[1]}}</td>\n                            </tr>\n                            <tr>\n                                    <td style="width: 27%">30<sup>th</sup> {{RRI30}}</td>\n                                    <td style="width: 15%">1<sup>st</sup></td><td style="width: 23%">{{reading4_up_trial[0]}}/{{reading4_down_trial[0]}}</td>\n                                    <td style="width: 15%">3<sup>rd</sup></td><td style="width: 23%">{{reading4_up_trial[2]}}/{{reading4_down_trial[2]}}</td>\n                            </tr>\n                            </table>\n            </td>\n    </tr>\n\n    <tr *ngIf="orthostasis_stage==3"> \n    <td style="width:40%; text-align:left;">\n            <span style="font-size:8em; font-weight:bold;">{{currentTimeTextM}}</span>\n            <span style="font-size:5em">m</span>\n            <span style="font-size:8em; font-weight:bold;">{{currentTimeTextS}}</span>\n            <span style="font-size:5em">s</span>\n        </td>\n    <td style="width:70%">\n            <progress-bar [progress]="loadProgress"></progress-bar>\n    </td>\n    </tr>\n\n\n    <tr *ngIf="orthostasis_stage==4"> \n            <td style="width:100%; text-align:left;">\n                </td>\n      </tr>\n      <tr *ngIf="orthostasis_stage==5"> \n            <td style="width:100%; text-align:left; ">\n                    <table cellspading=0 cellpadding=0 border=0 style="margin-top:10px; width:110%; font-size:4em">\n                            <tr style="font-size:1.5em"><td>RRI</td><td colspan="4">BP</td></tr>\n                                <tr>\n                                        <td style="width: 27%">15<sup>th</sup> {{RRI15}}</td>\n                                        <td style="width: 15%">Base</td><td style="width: 23%">{{reading4_up}}/{{reading4_down}}</td>\n                                        <td style="width: 15%">2<sup>nd</sup></td><td style="width: 23%">{{reading4_up_trial[1]}}/{{reading4_down_trial[1]}}</td>\n                                </tr>\n                                <tr>\n                                        <td style="width: 27%">30<sup>th</sup> {{RRI30}}</td>\n                                        <td style="width: 15%">1<sup>st</sup></td><td style="width: 23%">{{reading4_up_trial[0]}}/{{reading4_down_trial[0]}}</td>\n                                        <td style="width: 15%">3<sup>rd</sup></td><td style="width: 23%">{{reading4_up_trial[2]}}/{{reading4_down_trial[2]}}</td>\n                                </tr>\n                                </table>\n\n<BR>\n                         <div> \n                         <div (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                                    Redo\n                                    </div>\n                                    &nbsp;&nbsp;\n                            <div (tap)="backTest4()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                                    Finish\n                                    </div>\n                                </div>\n           </td>\n           </tr>        \n    </table>\n\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 40px #888" (click)="backTest4()">\n      <ion-icon name="close" style="zoom:2.5"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test4detail_2/test4detail_2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test4DetailPage_2);
    return Test4DetailPage_2;
}());

//# sourceMappingURL=test4detail_2.js.map

/***/ }),

/***/ 132:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 132;

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__test1detail_test1detail__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var Test1Page = (function () {
    function Test1Page(ble, storage, sqlite, navCtrl, navParams) {
        var _this = this;
        this.ble = ble;
        this.storage = storage;
        this.sqlite = sqlite;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.currentTime = 10;
        this.testedTime = 1;
        this.reading = 50;
        this.thresholdConfig = {
            '5': { color: '#AFA' },
            '3': { color: '#FFA' },
            '1': { color: '#FAA' }
        };
        this.result_t1_0 = [];
        this.result_t1_1 = [];
        this.result_t1_2 = [];
        this.result_t2_0 = [];
        this.result_t3_1 = [];
        this.result_t4_1 = [];
        this.result_t4_2 = [];
        this.average_t2_1 = 0;
        this.average_t2_2 = 0;
        this.average_t2_3 = 0;
        this.average_RRI = 0;
        this.highest1 = 0;
        this.highest2 = 0;
        this.highest3 = 0;
        this.lowest1 = 0;
        this.lowest2 = 0;
        this.lowest3 = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;
        this.hide1 = false;
        this.hide2 = false;
        this.hide3 = false;
        this.patient_elapsed = "0:00";
        this.Breathready = false;
        this.HRready = false;
        this.isFullRecord = false;
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.datab.executeSql("select count(1) as abc from patient_table ", {})
                .then(function (countdata) {
                if (parseInt(countdata.rows.item(0).abc) == 0) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_13__home_home__["a" /* HomePage */], {}, { animate: false, direction: 'forward' });
                }
                _this.storage.get('id').then(function (val) {
                    console.log(' id is', val);
                    _this.patient_id = val;
                    _this.datab.executeSql("select * from patient_table where id=" + _this.patient_id + ";", {})
                        .then(function (data) {
                        _this.patient_age = data.rows.item(0).age;
                        _this.patient_name = data.rows.item(0).name;
                        _this.patient_created = data.rows.item(0).createTime;
                        _this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
                        _this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
                        _this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
                        var diffTime = __WEBPACK_IMPORTED_MODULE_12_moment___default()().diff(_this.patient_created, 'seconds', false);
                        var duration = __WEBPACK_IMPORTED_MODULE_12_moment___default.a.duration(diffTime, 'seconds');
                        if (duration.seconds() < 10) {
                            _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                        }
                        else {
                            _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                        }
                        _this.task = setInterval(function () {
                            var diffTime = __WEBPACK_IMPORTED_MODULE_12_moment___default()().diff(_this.patient_created, 'seconds', false);
                            var duration = __WEBPACK_IMPORTED_MODULE_12_moment___default.a.duration(diffTime, 'seconds');
                            if (duration.seconds() < 10) {
                                _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                            }
                            else {
                                _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                            }
                        }, 1000);
                        if (_this.result_t1_0.length > 0 && _this.result_t1_1.length > 0 && _this.result_t1_2.length > 0) {
                            _this.isFullRecord = true;
                        }
                        var tempMax = 0;
                        var tempMin = 0;
                        for (var i = 0; i < _this.result_t1_0.length; i++) {
                            if (i == 0) {
                                tempMax = _this.result_t1_0[i];
                                tempMin = _this.result_t1_0[i];
                            }
                            if (_this.result_t1_0[i] - tempMax >= 0)
                                tempMax = _this.result_t1_0[i];
                            if (_this.result_t1_0[i] - tempMin <= 0)
                                tempMin = _this.result_t1_0[i];
                        }
                        if (tempMax == 0) {
                            _this.highest1 = "-";
                        }
                        else {
                            _this.highest1 = tempMax;
                        }
                        if (tempMin == 0) {
                            _this.lowest1 = "-";
                        }
                        else {
                            _this.lowest1 = tempMin;
                        }
                        if (tempMin > 0 && tempMax > 0)
                            _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
                        tempMax = 0;
                        tempMin = 0;
                        for (var i = 0; i < _this.result_t1_1.length; i++) {
                            if (i == 0) {
                                tempMax = _this.result_t1_1[i];
                                tempMin = _this.result_t1_1[i];
                            }
                            if (_this.result_t1_1[i] - tempMax >= 0) {
                                tempMax = _this.result_t1_1[i];
                            }
                            if (_this.result_t1_1[i] - tempMin <= 0) {
                                tempMin = _this.result_t1_1[i];
                            }
                        }
                        if (tempMax == 0) {
                            _this.highest2 = "-";
                        }
                        else {
                            _this.highest2 = tempMax;
                        }
                        if (tempMin == 0) {
                            _this.lowest2 = "-";
                        }
                        else {
                            _this.lowest2 = tempMin;
                        }
                        if (tempMin > 0 && tempMax > 0)
                            _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
                        tempMax = 0;
                        tempMin = 0;
                        for (var i = 0; i < _this.result_t1_2.length; i++) {
                            if (i == 0) {
                                tempMax = _this.result_t1_2[i];
                                tempMin = _this.result_t1_2[i];
                            }
                            if (_this.result_t1_2[i] - tempMax >= 0)
                                tempMax = _this.result_t1_2[i];
                            if (_this.result_t1_2[i] - tempMin <= 0)
                                tempMin = _this.result_t1_2[i];
                        }
                        if (tempMax == 0) {
                            _this.highest3 = "-";
                        }
                        else {
                            _this.highest3 = tempMax;
                        }
                        if (tempMin == 0) {
                            _this.lowest3 = "-";
                        }
                        else {
                            _this.lowest3 = tempMin;
                        }
                        if (tempMin > 0 && tempMax > 0)
                            _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
                        tempMax = 0;
                        tempMin = 0;
                        if (_this.ratio1 != 0) {
                            tempMax += _this.ratio1;
                            tempMin++;
                        }
                        if (_this.ratio2 != 0) {
                            tempMax += _this.ratio2;
                            tempMin++;
                        }
                        if (_this.ratio3 != 0) {
                            tempMax += _this.ratio3;
                            tempMin++;
                        }
                        if (tempMin == 0)
                            _this.average_t1 = 0;
                        else
                            _this.average_t1 = (tempMax) / tempMin;
                        _this.result_t2_0 = JSON.parse(data.rows.item(0).t2_1);
                        if (_this.result_t2_0.length > 0) {
                            _this.average_t2_1 = Math.round(((_this.result_t2_0[0] - _this.result_t2_0[1]) +
                                (_this.result_t2_0[2] - _this.result_t2_0[3]) +
                                (_this.result_t2_0[4] - _this.result_t2_0[5]) +
                                (_this.result_t2_0[6] - _this.result_t2_0[7]) +
                                (_this.result_t2_0[8] - _this.result_t2_0[9]) +
                                (_this.result_t2_0[10] - _this.result_t2_0[11])) / 6);
                        }
                        var temp = 0;
                        var count = 0;
                        if (_this.average_t2_1 > 0) {
                            temp += _this.average_t2_1;
                            count++;
                        }
                        if (count == 0)
                            _this.average_t2 = 0;
                        else {
                            _this.average_t2 = Math.round(temp / count);
                        }
                        _this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);
                        if (_this.result_t3_1.length > 0) {
                            var max = _this.result_t3_1[3];
                            if (_this.result_t3_1[5] > max)
                                max = _this.result_t3_1[5];
                            if (_this.result_t3_1[7] > max)
                                max = _this.result_t3_1[7];
                            if (_this.result_t3_1[9] > max)
                                max = _this.result_t3_1[9];
                            if (_this.result_t3_1[11] > max)
                                max = _this.result_t3_1[11];
                            _this.average_t3 = Math.abs(max - _this.result_t3_1[1]);
                        }
                        else {
                            _this.average_t3 = 0;
                        }
                        _this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);
                        if (_this.result_t4_1.length > 0) {
                            _this.average_RRI = _this.result_t4_1[1] / _this.result_t4_1[0];
                        }
                        _this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);
                        if (_this.result_t4_2.length > 0) {
                            var min = _this.result_t4_2[2];
                            if (_this.result_t4_2[4] < min)
                                min = _this.result_t4_2[4];
                            if (_this.result_t4_2[6] < min)
                                min = _this.result_t4_2[6];
                            _this.average_t4 = Math.abs(min - _this.result_t4_2[0]);
                        }
                        else {
                            _this.average_t4 = 0;
                        }
                        if (_this.ratio1 > 0) {
                            _this.lineChart = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.lineCanvas.nativeElement, {
                                type: 'line',
                                options: { legend: {
                                        display: false
                                    },
                                    scales: {
                                        xAxes: [{
                                                display: true
                                            }]
                                    }
                                },
                                data: {
                                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
                                            data: _this.result_t1_0,
                                            spanGaps: true
                                        }
                                    ]
                                }
                            });
                        }
                        else {
                            _this.hide1 = true;
                        }
                        console.log("2:" + _this.ratio2);
                        if (_this.ratio2 > 0) {
                            _this.lineChart2 = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.lineCanvas2.nativeElement, {
                                type: 'line',
                                options: { legend: {
                                        display: false
                                    },
                                    scales: {
                                        xAxes: [{
                                                display: true
                                            }]
                                    }
                                },
                                data: {
                                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
                                            pointBackgroundColor: "rgba(255,192,0,1)",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(255,192,0,1)",
                                            pointHoverBorderColor: "rgba(255,192,0,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: _this.result_t1_1,
                                            spanGaps: true,
                                        }
                                    ]
                                }
                            });
                        }
                        else {
                            _this.hide2 = true;
                        }
                        console.log("3:" + _this.ratio3);
                        if (_this.ratio3 > 0) {
                            _this.lineChart3 = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.lineCanvas3.nativeElement, {
                                type: 'line',
                                options: { legend: {
                                        display: false
                                    },
                                    scales: {
                                        xAxes: [{
                                                display: true
                                            }]
                                    }
                                },
                                data: {
                                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
                                            data: _this.result_t1_2,
                                            spanGaps: true,
                                        }
                                    ]
                                }
                            });
                        }
                        else {
                            _this.hide3 = true;
                        }
                    });
                });
            });
        });
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 1000);
    }
    Test1Page_1 = Test1Page;
    Test1Page.prototype.loadConfig = function () {
        clearInterval(this.task);
        clearInterval(this.checkDeviceTask);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__testConfig_testConfig__["a" /* TestConfigPage */], { parent: Test1Page_1 }, { animate: true, direction: 'forward' });
    };
    Test1Page.prototype.enterTest = function () {
        clearInterval(this.task);
        clearInterval(this.checkDeviceTask);
        this.datab.close();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__test1detail_test1detail__["a" /* Test1DetailPage */], {}, { animate: false, direction: 'forward' });
    };
    Test1Page.prototype.clickPage = function (a) {
        clearInterval(this.task);
        clearInterval(this.checkDeviceTask);
        if (a == 0)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__testStart_testStart__["a" /* TestStartPage */], {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(Test1Page_1, {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test5_test5__["a" /* Test5Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    Test1Page.prototype.deleteRecord = function (a) {
        var _this = this;
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            if (a == 1) {
                if (_this.result_t1_1.length > 0) {
                    _this.datab.executeSql("UPDATE patient_table SET t1_1 = t1_2 , t1_2 = t1_3 , t1_3 = '[]' where id=(select max(id) from patient_table)", {})
                        .then(function () {
                        _this.navCtrl.setRoot(Test1Page_1, {}, { animate: false, direction: 'forward' });
                    });
                }
                else {
                    _this.datab.executeSql("UPDATE patient_table SET t1_1 = t1_3 where id=(select max(id) from patient_table);", {})
                        .then(function () {
                        _this.navCtrl.setRoot(Test1Page_1, {}, { animate: false, direction: 'forward' });
                    });
                }
            }
            else if (a == 2) {
                _this.datab.executeSql("UPDATE patient_table SET t1_2 = t1_3 where id=(select max(id) from patient_table);", {})
                    .then(function () {
                    _this.datab.executeSql("UPDATE patient_table SET t1_3 ='[]' where id=(select max(id) from patient_table);", {})
                        .then(function () {
                        _this.navCtrl.setRoot(Test1Page_1, {}, { animate: false, direction: 'forward' });
                    });
                });
            }
            else {
                _this.datab.executeSql("UPDATE patient_table SET t1_3 ='[]' where id=(select max(id) from patient_table);", {})
                    .then(function () {
                    _this.navCtrl.setRoot(Test1Page_1, {}, { animate: false, direction: 'forward' });
                });
            }
        });
    };
    Test1Page.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('52E068E1-84B8-1271-EA06-3DC903EA38C5').then(function () {
            _this.Breathready = true;
        }, function () {
            _this.Breathready = false;
            _this.connectBreath();
        });
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.HRready = true;
        }, function () {
            _this.HRready = false;
            _this.connectHeartRate();
        });
    };
    Test1Page.prototype.connectBreath = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            _this.ble.connect('52E068E1-84B8-1271-EA06-3DC903EA38C5').subscribe(function (data) {
                _this.Breathready = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    Test1Page.prototype.connectHeartRate = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                _this.HRready = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], Test1Page.prototype, "lineCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas2'),
        __metadata("design:type", Object)
    ], Test1Page.prototype, "lineCanvas2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas3'),
        __metadata("design:type", Object)
    ], Test1Page.prototype, "lineCanvas3", void 0);
    Test1Page = Test1Page_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test1',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test1/test1.html"*/'\n<ion-content text-center no-bounce>\n\n    <ion-fab right bottom>\n        <button ion-fab large color="white" style="box-shadow:0 0 40px #888" (click)="loadConfig()">\n          <img src="images/gear.png">\n        </button>\n      </ion-fab>\n    \n\n<div style="text-align: left;width:40%; height:100%;background:#fafafa;box-shadow:0px 20px 40px 0 #888; float:left; color:rgb(46,138,212);z-index:99; position:relative">\n\n        <table cellspacing=0 cellpadding=0 border=0 style=" width:100%;font-size:1.5em;color:#444">\n                <tr>\n                <td style="padding:5px; padding-left:15px; width:70%; font-weight:bold; padding-right:0; padding-bottom:0;">{{patient_name}}&nbsp;</td>\n                <td rowspan="2" style=" font-size:2.5em;vertical-align:top;padding:5px;text-align: right">&nbsp;{{patient_age}}</td>\n                </tr>\n                <tr><td style="padding:5px; padding-left:15px;padding-right:0; padding-top: 0;"><span *ngIf="patient_elapsed !=\'0:00\'">{{patient_created}} ({{patient_elapsed}})</span>&nbsp;</td></tr>\n                </table>  \n\n<div  style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%; padding:10px; height:100px; margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">Valsalva Maneuver</div>\n<div style="font-size: 3em ; text-align:center ;width:100%">\n                <span *ngIf="average_t1>0"> {{average_t1 | number:\'1.2-2\'}}</span>\n                <span *ngIf="average_t1==0">-</span>\n</div>\n</div>\n\n\n<div (tap)="clickPage(2)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">Deep Breathing</div>\n<div style="font-size: 3em ; text-align:center ;width:100%"><span *ngIf="average_t2!=0">{{average_t2}} bpm</span>\n<span *ngIf="average_t2==0">-</span>\n</div>\n</div>\n\n\n<div (tap)="clickPage(3)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">Sustained Handgrip</div>\n<div style="font-size: 3em ; text-align:center ;width:100%">\n<span *ngIf="average_t3!=0">{{average_t3}} mmHg</span>\n<span *ngIf="average_t3==0">-</span>\n</div>\n</div>\n\n\n<div (tap)="clickPage(4)"  style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n        <div style="font-size: 1.75em; color:#444">30:15 Ratio &amp; Orthostasis</div>\n        <div style="font-size: 3em ; text-align:center ;width:100%">\n                <span *ngIf="average_RRI!=0">{{average_RRI | number:\'1.2-2\'}}</span>\n                <span *ngIf="average_RRI==0">-</span> | <span *ngIf="average_t4!=0">{{average_t4}} mmHg</span>\n                <span *ngIf="average_t4==0">-</span>\n        </div>\n        </div>\n<BR><BR><BR><BR>\n<div (tap)="clickPage(6)" style="border:1px solid rgb(46,138,212); border-radius:50px; margin-left:27%; width:170px; padding:7px; font-size: 1.5em; color:rgb(46,138,212);text-align:center;">\n    COMPLETE\n</div>\n\n</div>\n    \n <div style="width:60%; height:100%; float:right; background-color:rgb(240, 240, 240);">\n\n\n                <table cellspacing=0 cellpadding=0 border=0 style="font-family: \'Calibri\'; margin:15%; margin-bottom:5%;margin-left:12%;width:73%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n                    <tr>\n                    <td style="padding-left:10px;font-size:4em; font-weight:bold;width:65%; text-align:left;">Valsalva<BR>Maneuver</td>\n                    <td style="padding-top:12px"><BR><BR><BR>\n      <div *ngIf="Breathready && HRready && !isFullRecord" (tap)="enterTest()" style="border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n                                        <div style="font-size: 1.5em; color:rgb(46,138,212);text-align:center; width:100%">BEGIN</div>\n                                        </div>\n                                        <div *ngIf="!(Breathready && HRready) || isFullRecord "  style="border:1px solid rgb(190,190,190); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n                                                <div style="font-size: 1.5em; color:rgb(190,190,190);text-align:center; width:100%">BEGIN</div>\n                                                </div>\n                    </td>\n                    </table>  \n            <div style="padding:15%; padding-top:0; padding-left:12%;">\n                    <ion-slides style="width:100%; height:50%;" pager="ratio1 > 0 && ratio2 > 0">\n\n                            <ion-slide>\n                                    <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444">\n                                        <tr>\n                                        <td style="font-size:6em ;width:20%; text-align:left;color:rgb(46,138,212)" colspan="5">{{average_t1 | number:\'1.2-2\'}}&nbsp;<span *ngIf="average_t1 >= 1.21" style="color:rgba(112,173,71,1); font-size:0.3em; font-weight:bold">NORMAL</span><span *ngIf="average_t1 >= 1.11 && average_t1 < 1.21 " style="color:rgba(255,192,0,1);font-size:0.3em; font-weight:bold">BORDERLINE</span><span *ngIf="average_t1 > 0 && average_t1 < 1.11" style="color:rgba(237,125,49,1);font-size:0.3em; font-weight:bold">ABNORMAL</span>  \n                                        </td>\n                                       </tr>\n                <tr>\n                        <td style="font-size:1em ;width:6%; text-align:center;">\n                            <ion-icon name="close-circle" (click)="deleteRecord(1)"></ion-icon>\n                            </td>\n                    <td style="padding-left:10px;font-size:1.75em ;width:4%; text-align:left;">1<sup>st</sup></td>\n                    <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">Trial</td>\n                <td style="padding-left:10px;font-size:1.75em ;width:55%; text-align:left;">{{highest1}} / {{lowest1}}</td>\n                <td style="font-weight:bold; padding-left:10px;font-size:1.75em ;width:25%; text-align:left; color:rgb(46,138,212)">{{ratio1 | number:\'1.2-2\'}}</td>\n                </tr>\n                <tr>\n                        <td style="font-size:1em ;width:6%; text-align:center;">\n                                <ion-icon name="close-circle" (click)="deleteRecord(2)"></ion-icon>\n                            </td>\n                    <td style="padding-left:10px;font-size:1.75em ;width:4%; text-align:left;">2<sup>nd</sup></td>\n                    <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">Trial</td>\n                <td style="padding-left:10px;font-size:1.75em ;width:55%; text-align:left;">{{highest2}} / {{lowest2}}</td>\n                <td style="font-weight:bold; padding-left:10px;font-size:1.75em ;width:25%; text-align:left; color:rgb(46,138,212)">{{ratio2 | number:\'1.2-2\'}}</td>\n                </tr>\n                <tr>\n                        <td style="font-size:1em ;width:6%; text-align:center;">\n                                <ion-icon name="close-circle" (click)="deleteRecord(3)"></ion-icon>\n                            </td>\n                    <td style="padding-left:10px;font-size:1.75em ;width:4%; text-align:left;">3<sup>rd</sup></td>\n                    <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">Trial</td>\n                <td style="padding-left:10px;font-size:1.75em ;width:55%; text-align:left;">{{highest3}} / {{lowest3}}</td>\n                <td style="font-weight:bold; padding-left:10px;font-size:1.75em ;width:25%; text-align:left; color:rgb(46,138,212)">{{ratio3 | number:\'1.2-2\'}}</td>\n                </tr>\n                                        </table>  <BR><BR><BR>\n                                </ion-slide>\n                            <ion-slide *ngIf="!hide1">\n                                <table style="width: 100%; height:100%; " border="0"><tr><td>\n                                        <ion-card>\n                                            <ion-card-title>\n                                                1st Trial\n                                            </ion-card-title>\n                                                <ion-card-content>\n                                                  <canvas #lineCanvas></canvas>\n                                                </ion-card-content>\n                                              </ion-card>   \n                                </td></tr></table>\n                            </ion-slide>\n                            <ion-slide *ngIf="!hide2">\n                                    <table style="width: 100%; height:100%; " border="0"><tr><td>\n                                            <ion-card>\n                                                    <ion-card-title>\n                                                            2nd Trial\n                                                        </ion-card-title>\n                                                    <ion-card-content>\n                                                      <canvas #lineCanvas2></canvas>\n                                                    </ion-card-content>\n                                                  </ion-card>   \n                                    </td></tr></table>\n                                </ion-slide>\n                                <ion-slide *ngIf="!hide3">\n                                        <table style="width: 100%; height:100%; " border="0"><tr><td>\n                                                <ion-card>\n                                                        <ion-card-title>\n                                                                3rd Trial\n                                                            </ion-card-title>\n                                                        <ion-card-content>\n                                                          <canvas #lineCanvas3></canvas>\n                                                        </ion-card-content>\n                                                      </ion-card>   \n                                        </td></tr></table>\n                                    </ion-slide>\n                        </ion-slides>\n                    </div>\n\n</div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test1/test1.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_14__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test1Page);
    return Test1Page;
    var Test1Page_1;
}());

//# sourceMappingURL=test1.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test4Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__test4detail_2_test4detail_2__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var Test4Page = (function () {
    function Test4Page(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.result = [];
        this.resultBP = [];
        this.RRI15 = 0;
        this.RRI30 = 0;
        this.average_RRI = 0;
        this.patient_elapsed = "0:00";
        this.BPready = false;
        this.HRready = false;
        this.up1 = 0;
        this.down1 = 0;
        this.up2 = 0;
        this.down2 = 0;
        this.up3 = 0;
        this.down3 = 0;
        this.up4 = 0;
        this.down4 = 0;
        this.average_t4 = 0;
        this.result_t1_0 = [];
        this.result_t1_1 = [];
        this.result_t1_2 = [];
        this.result_t2_0 = [];
        this.result_t2_1 = [];
        this.result_t2_2 = [];
        this.result_t3_1 = [];
        this.result_t4_1 = [];
        this.result_t4_2 = [];
        this.average_t2_1 = 0;
        this.average_t2_2 = 0;
        this.average_t2_3 = 0;
        this.highest1 = 0;
        this.highest2 = 0;
        this.highest3 = 0;
        this.lowest1 = 0;
        this.lowest2 = 0;
        this.lowest3 = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.storage.get('id').then(function (val) {
                console.log(' id is', val);
                _this.patient_id = val;
                _this.datab.executeSql("select * from patient_table where id='" + _this.patient_id + "';", {})
                    .then(function (data) {
                    _this.patient_age = data.rows.item(0).age;
                    _this.patient_name = data.rows.item(0).name;
                    _this.patient_created = data.rows.item(0).createTime;
                    _this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
                    _this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
                    _this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
                    var tempMax = 0;
                    var tempMin = 0;
                    for (var i = 0; i < _this.result_t1_0.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_0[i];
                            tempMin = _this.result_t1_0[i];
                        }
                        if (_this.result_t1_0[i] - tempMax >= 0)
                            tempMax = _this.result_t1_0[i];
                        if (_this.result_t1_0[i] - tempMin <= 0)
                            tempMin = _this.result_t1_0[i];
                    }
                    if (tempMax == 0) {
                        _this.highest1 = "-";
                    }
                    else {
                        _this.highest1 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest1 = "-";
                    }
                    else {
                        _this.lowest1 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i = 0; i < _this.result_t1_1.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_1[i];
                            tempMin = _this.result_t1_1[i];
                        }
                        if (_this.result_t1_1[i] - tempMax >= 0) {
                            tempMax = _this.result_t1_1[i];
                        }
                        if (_this.result_t1_1[i] - tempMin <= 0) {
                            tempMin = _this.result_t1_1[i];
                        }
                    }
                    if (tempMax == 0) {
                        _this.highest2 = "-";
                    }
                    else {
                        _this.highest2 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest2 = "-";
                    }
                    else {
                        _this.lowest2 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i = 0; i < _this.result_t1_2.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_2[i];
                            tempMin = _this.result_t1_2[i];
                        }
                        if (_this.result_t1_2[i] - tempMax >= 0)
                            tempMax = _this.result_t1_2[i];
                        if (_this.result_t1_2[i] - tempMin <= 0)
                            tempMin = _this.result_t1_2[i];
                    }
                    if (tempMax == 0) {
                        _this.highest3 = "-";
                    }
                    else {
                        _this.highest3 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest3 = "-";
                    }
                    else {
                        _this.lowest3 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    if (_this.ratio1 != 0) {
                        tempMax += _this.ratio1;
                        tempMin++;
                    }
                    if (_this.ratio2 != 0) {
                        tempMax += _this.ratio2;
                        tempMin++;
                    }
                    if (_this.ratio3 != 0) {
                        tempMax += _this.ratio3;
                        tempMin++;
                    }
                    if (tempMin == 0)
                        _this.average_t1 = 0;
                    else
                        _this.average_t1 = (tempMax) / tempMin;
                    _this.result_t2_0 = JSON.parse(data.rows.item(0).t2_1);
                    _this.result_t2_1 = JSON.parse(data.rows.item(0).t2_2);
                    _this.result_t2_2 = JSON.parse(data.rows.item(0).t2_3);
                    if (_this.result_t2_0.length > 0) {
                        _this.average_t2_1 = Math.round(((_this.result_t2_0[0] - _this.result_t2_0[1]) +
                            (_this.result_t2_0[2] - _this.result_t2_0[3]) +
                            (_this.result_t2_0[4] - _this.result_t2_0[5]) +
                            (_this.result_t2_0[6] - _this.result_t2_0[7]) +
                            (_this.result_t2_0[8] - _this.result_t2_0[9]) +
                            (_this.result_t2_0[10] - _this.result_t2_0[11])) / 6);
                    }
                    var temp = 0;
                    var count = 0;
                    if (_this.average_t2_1 > 0) {
                        temp += _this.average_t2_1;
                        count++;
                    }
                    if (count == 0)
                        _this.average_t2 = 0;
                    else {
                        _this.average_t2 = Math.round(temp / count);
                    }
                    _this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);
                    if (_this.result_t3_1.length > 0) {
                        var max = _this.result_t3_1[3];
                        if (_this.result_t3_1[5] > max)
                            max = _this.result_t3_1[5];
                        if (_this.result_t3_1[7] > max)
                            max = _this.result_t3_1[7];
                        if (_this.result_t3_1[9] > max)
                            max = _this.result_t3_1[9];
                        if (_this.result_t3_1[11] > max)
                            max = _this.result_t3_1[11];
                        _this.average_t3 = Math.abs(max - _this.result_t3_1[1]);
                    }
                    else {
                        _this.average_t3 = 0;
                    }
                    _this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);
                    if (_this.result_t4_1.length > 0) {
                        _this.average_RRI = _this.result_t4_1[1] / _this.result_t4_1[0];
                    }
                    _this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);
                    if (_this.result_t4_2.length > 0) {
                        _this.average_t4 = Math.abs(_this.result_t4_2[0] - _this.result_t4_2[2]);
                    }
                    else {
                        _this.average_t4 = 0;
                    }
                    _this.result = JSON.parse(data.rows.item(0).t4_1);
                    if (_this.result.length > 0) {
                        _this.RRI15 = _this.result[0];
                        _this.RRI30 = _this.result[1];
                        _this.average_RRI = _this.result[1] / _this.result[0];
                    }
                    _this.resultBP = JSON.parse(data.rows.item(0).t4_2);
                    if (_this.resultBP.length > 0) {
                        _this.up1 = _this.resultBP[0];
                        _this.down1 = _this.resultBP[1];
                        _this.up2 = _this.resultBP[2];
                        _this.down2 = _this.resultBP[3];
                        _this.up3 = _this.resultBP[4];
                        _this.down3 = _this.resultBP[5];
                        _this.up4 = _this.resultBP[6];
                        _this.down4 = _this.resultBP[7];
                        var min = _this.up2;
                        if (_this.up3 < min)
                            min = _this.up3;
                        if (_this.up4 < min)
                            min = _this.up4;
                        _this.average_t4 = Math.abs(min - _this.up1);
                    }
                    else {
                        _this.average_t4 = 0;
                    }
                    var diffTime = __WEBPACK_IMPORTED_MODULE_12_moment___default()().diff(_this.patient_created, 'seconds', false);
                    var duration = __WEBPACK_IMPORTED_MODULE_12_moment___default.a.duration(diffTime, 'seconds');
                    if (duration.seconds() < 10) {
                        _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                    }
                    else {
                        _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                    }
                    _this.task = setInterval(function () {
                        var diffTime = __WEBPACK_IMPORTED_MODULE_12_moment___default()().diff(_this.patient_created, 'seconds', false);
                        var duration = __WEBPACK_IMPORTED_MODULE_12_moment___default.a.duration(diffTime, 'seconds');
                        if (duration.seconds() < 10) {
                            _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                        }
                        else {
                            _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                        }
                    }, 1000);
                });
            });
        });
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 1000);
    }
    Test4Page_1 = Test4Page;
    Test4Page.prototype.clickPage = function (a) {
        clearInterval(this.task);
        clearInterval(this.checkDeviceTask);
        if (a == 0)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__testStart_testStart__["a" /* TestStartPage */], {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(Test4Page_1, {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__test5_test5__["a" /* Test5Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    Test4Page.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            _this.BPready = true;
        }, function () {
            _this.BPready = false;
            _this.ble.scan([], 3).subscribe(function (device) {
                _this.ble.connect('9ADE4682-C753-3B3A-7454-50123794CAF4').subscribe(function (data) {
                    _this.BPready = true;
                }, function (error) {
                    console.log(error);
                });
            });
        });
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.HRready = true;
        }, function () {
            _this.HRready = false;
            _this.ble.scan([], 3).subscribe(function (device) {
                _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                    _this.HRready = true;
                }, function (error) {
                    console.log(error);
                });
            });
        });
    };
    Test4Page.prototype.loadConfig = function () {
        clearInterval(this.task);
        clearInterval(this.checkDeviceTask);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__testConfig_testConfig__["a" /* TestConfigPage */], { parent: Test4Page_1 }, { animate: true, direction: 'forward' });
    };
    Test4Page.prototype.enterTest = function () {
        clearInterval(this.task);
        clearInterval(this.checkDeviceTask);
        this.datab.close();
        //this.navCtrl.setRoot(Test4DetailPage, {}, {animate: false, direction: 'forward'});
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__test4detail_2_test4detail_2__["a" /* Test4DetailPage_2 */], {}, { animate: false, direction: 'forward' });
    };
    Test4Page = Test4Page_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test4',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test4/test4.html"*/'\n<ion-content text-center no-bounce style="overflow: hidden">\n\n    <ion-fab right bottom>\n        <button ion-fab large color="white" style="box-shadow:0 0 40px #888" (click)="loadConfig()">\n          <img src="images/gear.png">\n        </button>\n      </ion-fab>\n    \n\n<div style="text-align: left;width:40%; height:100%;background:#fafafa;box-shadow:0px 20px 40px 0 #888; float:left; color:rgb(46,138,212);z-index:99; position:relative">\n\n        <table cellspacing=0 cellpadding=0 border=0 style=" width:100%;font-size:1.5em;color:#444">\n                <tr>\n                <td style="padding:5px; padding-left:15px; width:70%; font-weight:bold; padding-right:0; padding-bottom:0;">{{patient_name}}&nbsp;</td>\n                <td rowspan="2" style=" font-size:2.5em;vertical-align:top;padding:5px;text-align: right">&nbsp;{{patient_age}}</td>\n                </tr>\n                <tr><td style="padding:5px; padding-left:15px;padding-right:0; padding-top: 0;"><span *ngIf="patient_elapsed !=\'0:00\'">{{patient_created}} ({{patient_elapsed}})</span>&nbsp;</td></tr>\n                </table>  \n\n                <div (tap)="clickPage(1)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%; padding:10px; height:100px; margin-bottom:0%;">\n                        <div style="font-size: 1.75em; color:#444">Valsalva Maneuver</div>\n                        <div style="font-size: 3em ; text-align:center ;width:100%">\n                                <span *ngIf="average_t1>0"> {{average_t1 | number:\'1.2-2\'}}</span>\n                                <span *ngIf="average_t1==0">-</span>\n                </div>                        </div>\n                        \n                        \n                        <div (tap)="clickPage(2)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n                        <div style="font-size: 1.75em; color:#444">Deep Breathing</div>\n                        <div style="font-size: 3em ; text-align:center ;width:100%"><span *ngIf="average_t2!=0">{{average_t2}} bpm</span>\n                        <span *ngIf="average_t2==0">-</span>\n                        </div>\n                        </div>\n                        \n                        <div (tap)="clickPage(3)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n                        <div style="font-size: 1.75em; color:#444">Sustained Handgrip</div>\n                        <div style="font-size: 3em ; text-align:center ;width:100%">\n                        <span *ngIf="average_t3!=0">{{average_t3}} mmHg</span>\n                        <span *ngIf="average_t3==0">-</span>\n                        </div>\n                        </div>\n                        \n                        \n                        <div (tap)="clickPage(4)"  style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n                        <div style="font-size: 1.75em; color:#444">30:15 Ratio &amp; Orthostasis</div>\n                        <div style="font-size: 3em ; text-align:center ;width:100%">\n                                <span *ngIf="average_RRI!=0">{{average_RRI | number:\'1.2-2\'}}</span>\n                                <span *ngIf="average_RRI==0">-</span> | <span *ngIf="average_t4!=0">{{average_t4}} mmHg</span>\n                                <span *ngIf="average_t4==0">-</span>\n                        </div>\n                        </div>\n<BR><BR><BR><BR>\n<div (tap)="clickPage(6)" style="border:1px solid rgb(46,138,212); border-radius:50px; margin-left:27%; width:170px; padding:7px; font-size: 1.5em; color:rgb(46,138,212);text-align:center;">\n    COMPLETE\n</div>\n\n</div>\n    \n <div style="width:60%; height:100%; float:right; background-color:rgb(240, 240, 240);">\n\n\n                <table cellspacing=0 cellpadding=0 border=0 style="font-family: \'Calibri\'; margin:15%; margin-bottom:0;margin-left:12%;width:80%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n                    <tr>\n                    <td style="padding-left:10px;font-size:3.2em; font-weight:bold;width:65%; text-align:left;">30:15 Ratio &amp;<BR>Orthostasis</td>\n                    <td style="padding-top:12px; padding-bottom:15px"><BR><BR><BR>\n\n                        <div *ngIf="BPready && HRready" (tap)="enterTest()" style="border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n                                <div style="font-size: 1.5em; color:rgb(46,138,212);text-align:center; width:100%">BEGIN</div>\n                                </div>\n                                <div *ngIf="!(BPready && HRready)"  style="border:1px solid rgb(190,190,190); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n                                        <div style="font-size: 1.5em; color:rgb(190,190,190);text-align:center; width:100%">BEGIN</div>\n                                        </div>\n                    </td>\n                    </table>  \n            <div style="padding:15%; padding-top:0; padding-left:12%; padding-bottom:0;">\n                    <ion-slides style="width:100%; height:50%;">\n\n                            <ion-slide style="font-size:2.5em; text-align:left" *ngIf="result.length==0">\n                                    <div style="padding-top:10px;text-align:left">\n            No Record\n            </div>\n                            </ion-slide>\n\n                            <ion-slide *ngIf="result.length>0">\n                                    <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444; ">\n                                        <tr>\n                                        <td style="font-size:6em ;width:20%; text-align:left;color:rgb(46,138,212)" colspan="3">{{average_RRI | number:\'1.2-2\'}}\n                                                <span *ngIf="average_RRI >= 1.035" style="color:rgba(112,173,71,1); font-size:0.3em; font-weight:bold">NORMAL</span>  \n                                                <span *ngIf="average_RRI >= 1.005 && average_RRI < 1.035 " style="color:rgba(255,192,0,1);font-size:0.3em; font-weight:bold">BORDERLINE</span>  \n                                                <span *ngIf="average_RRI > 0 && average_RRI < 1.005 " style="color:rgba(237,125,49,1);font-size:0.3em; font-weight:bold">ABNORMAL</span>  \n                                        </td>\n                                       </tr>\n                <tr >\n                    <td style="padding-left:10px;font-size:1.5em ;width:5%; text-align:left;">15<sup>th</sup></td>\n                    <td style="padding-left:10px;font-size:1.5em ;width:15%; text-align:left;">Beat</td>\n                  <td style="height:20px;padding-left:10px;font-size:1.5em ;width:55%; text-align:left;">{{RRI15}} RRI</td>\n                </tr>\n                <tr>\n                    <td style="padding-left:10px;font-size:1.5em ;width:5%; text-align:left;">30<sup>th</sup></td>\n                    <td style="padding-left:10px;font-size:1.5em ;width:15%; text-align:left;">Beat</td>\n                  <td style="padding-left:10px;font-size:1.5em ;width:55%; text-align:left;">{{RRI30}} RRI</td>\n                </tr>\n                            </table><BR>\n<div style="text-align: left">\n        <div style="font-size:1.5em;display:inline;">  \n            <div style="font-size:1.5em ; text-align:left;color:rgb(46,138,212)" colspan="4">\n                                                        Difference in Systolic</div>\n                                                    &nbsp;&nbsp;{{average_t4}} mmHg &nbsp;</div>\n                                            <span *ngIf="average_t4 !=0 && average_t4<= 10" style="color:rgba(112,173,71,1); font-weight:bold;font-size:1.75em">NORMAL</span>\n                                            <span *ngIf="average_t4 >=11 && average_t4<= 29" style="color:rgba(255,192,0,1); font-weight:bold;font-size:1.75em">BORDERLINE</span>\n                                            <span *ngIf="average_t4 >=30" style="color:rgba(237,125,49,1); font-weight:bold;font-size:1.75em">ABNORMAL</span>  \n                                            <BR><BR>\n<table border=0 style="width: 100%;font-size:1.5em">\n<tr>\n<td style="width: 35%">\nBaseline\n</td><td style="width: 15%">\n<span style="color:rgb(46,138,212); font-weight:bold">{{up1}}</span>\n</td>\n<td style="width: 50%"></td>\n</tr>\n<tr>\n<td style="width: 35%">\n1<sup>st</sup> Minute        </td><td style="width: 25%">\n<span style="color:rgb(46,138,212); font-weight:bold">{{up2}}</span>\n</td>\n<td style="width: 35%">\n3<sup>rd</sup> Minute        </td><td style="width: 25%">\n<span style="color:rgb(46,138,212); font-weight:bold">{{up4}}</span>\n</td>\n</tr>\n\n<tr>\n<td style="width: 35%">\n2<sup>nd</sup> Minute</td><td style="width: 25%">\n<span style="color:rgb(46,138,212); font-weight:bold">{{up3}}</span>\n</td>\n<td style="width: 50%">   </td>\n</tr>\n</table> \n                    </div>\n                    </ion-slide>\n    \n                        </ion-slides>\n                    </div>\n\n</div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test4/test4.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test4Page);
    return Test4Page;
    var Test4Page_1;
}());

//# sourceMappingURL=test4.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestConfigPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TestConfigPage = (function () {
    function TestConfigPage(ble, navCtrl, navParams) {
        var _this = this;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.reading2 = 0;
        this.reading3 = 0;
        this.reading4_up = 0;
        this.reading4_down = 0;
        this.reading4_status = 0;
        this.bp_readed = false;
        this.task = setInterval(function () {
            _this.checkAllHardware();
        }, 3000);
        this.task2 = setInterval(function () {
            _this.updateAllHardwareValue();
        }, 200);
        this.backParent = navParams.data.parent;
    }
    TestConfigPage.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.scan([], 2).subscribe(function (device) {
            if (!_this.hardware1ready) {
                _this.ble.connect('52E068E1-84B8-1271-EA06-3DC903EA38C5').subscribe(function (data) {
                    _this.hardware1ready = true;
                }, function (error) {
                    //console.log(error);
                    _this.hardware1ready = false;
                });
            }
            if (!_this.hardware2ready) {
                _this.ble.connect('58A8CA24-F894-D922-0462-A287BE6D53FE').subscribe(function (data) {
                    _this.hardware2ready = true;
                }, function (error) {
                    //console.log(error);
                    _this.hardware2ready = false;
                });
            }
            if (!_this.hardware3ready) {
                _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                    _this.hardware3ready = true;
                }, function (error) {
                    //console.log(error);
                    _this.hardware3ready = false;
                });
            }
            if (!_this.hardware4ready) {
                _this.ble.connect('9ADE4682-C753-3B3A-7454-50123794CAF4').subscribe(function (data) {
                    _this.hardware4ready = true;
                }, function (error) {
                    //console.log(error);
                    _this.hardware4ready = false;
                });
            }
        });
    };
    TestConfigPage.prototype.updateAllHardwareValue = function () {
        var _this = this;
        this.ble.isConnected('52E068E1-84B8-1271-EA06-3DC903EA38C5').then(function () {
            _this.hardware1ready = true;
            // getting result from hardware
            _this.ble.read('52E068E1-84B8-1271-EA06-3DC903EA38C5', '19b10000-e8f2-537e-4f6c-d104768a1214', '19b10001-e8f2-537e-4f6c-d104768a1214').then(function (data2) {
                _this.reading1 = (new Uint8Array(data2)[0]).toString();
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () { _this.hardware1ready = false; });
        this.ble.isConnected('58A8CA24-F894-D922-0462-A287BE6D53FE').then(function () {
            _this.hardware2ready = true;
            // getting result from hardware
            _this.ble.read('58A8CA24-F894-D922-0462-A287BE6D53FE', '19b10000-e8f2-537e-4f6c-d104768a1220', '19b10001-e8f2-537e-4f6c-d104768a1220').then(function (data2) {
                _this.reading2 = (new Uint8Array(data2)[0]);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () { _this.hardware2ready = false; });
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.hardware3ready = true;
            // getting result from hardware
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1216').then(function (data2) {
                _this.reading3 = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                ////console.log(error);
            });
            // getting calibration status from hardware
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1219').then(function (data2) {
                console.log(new Uint8Array(data2)[0]);
                if (new Uint8Array(data2)[0] == 1) {
                    _this.calibrating3 = false;
                }
                else {
                    _this.calibrating3 = true;
                }
            }).catch(function (error) {
                ////console.log(error);
            });
            // getting pulseCount from hardware
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1217').then(function (data2) {
                _this.pulseCount = (new Uint8Array(data2)[0]);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () { _this.hardware3ready = false; });
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            _this.hardware4ready = true;
            // getting if BP is processing from hardware
            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1226').then(function (data2) {
                _this.reading4_status = (new Uint16Array(data2)[0]);
                if (!_this.bp_readed) {
                    if (_this.reading4_status == 0) {
                        _this.reading4_up = 0;
                        _this.reading4_down = 0;
                    }
                    else if (_this.reading4_status == 1) {
                        _this.reading4_up = 0;
                        _this.reading4_down = 0;
                    }
                    else {
                        // getting BP data
                        _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1224').then(function (dataUP) {
                            if (Math.round((new Uint16Array(dataUP)[0]) / 3) < 300)
                                _this.reading4_up = Math.round((new Uint16Array(dataUP)[0]) / 3);
                            else
                                _this.reading4_up = "ERR";
                        }).catch(function (error) {
                            //console.log(error);
                        });
                        // getting BP data
                        _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1225').then(function (dataDOWN) {
                            if (Math.round((new Uint16Array(dataDOWN)[0]) / 3) < 150)
                                _this.reading4_down = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                            else
                                _this.reading4_down = "ERR";
                        }).catch(function (error) {
                            //console.log(error);
                        });
                        _this.bp_readed = true;
                        _this.resetValue();
                    }
                }
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () { _this.hardware4ready = false; });
    };
    TestConfigPage.prototype.bytesToString = function (buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    };
    TestConfigPage.prototype.popThis = function () {
        clearInterval(this.task);
        clearInterval(this.task2);
        this.navCtrl.setRoot(this.backParent, {}, { animate: true, direction: 'back' });
    };
    TestConfigPage.prototype.clickCalibrate = function () {
        var _this = this;
        this.calibrating3 = true;
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.hardware3ready = true;
            var daa = new Uint8Array(1);
            daa[0] = 1;
            _this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1218', daa.buffer).then(function (data2) {
                // console.log(data2);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () {
            _this.hardware3ready = false;
            _this.calibrating3 = false;
        });
    };
    TestConfigPage.prototype.resetValue = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            _this.hardware4ready = true;
            var daa = new Uint8Array(1);
            daa[0] = 2;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                console.log(data2);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () {
            _this.hardware4ready = false;
        });
    };
    TestConfigPage.prototype.clickStartBP = function () {
        var _this = this;
        this.bp_readed = false;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            _this.hardware4ready = true;
            var daa = new Uint8Array(1);
            daa[0] = 1;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                console.log(data2);
            }).catch(function (error) {
                //console.log(error);
            });
        }, function () {
            _this.hardware4ready = false;
        });
    };
    TestConfigPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-testConfig',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/testConfig/testConfig.html"*/'\n\n<ion-content text-left no-bounce>\n\n    <div class="ext-box" style=" background:#fff;box-shadow: 0 15px 15px -15px #888; width:120%; margin-left:-10%;padding-left:7%; font-family:\'Calibri\' ; height:12%; z-index:99; position:relative"> \n        <div class="int-box" style="padding-left:5%">\n            <B style="font-size:4em ; color:#444">Hardware</B>\n        </div>\n    </div>\n\n<div style="background:rgb(240, 240, 240);text-align:center; height:88%;padding-top:40px; color:rgb(46,138,212) ;  ">\n  <BR>\n<div style="width:40% ;height:30%; padding:2%; border-radius:20px; display:inline-block; border:1px solid rgb(46,138,212); position:absolute; left:8%; top:20%;">\n<div style="color:#444; font-size:2em; text-align:left">Spirometer</div><BR>\n<div style="width:100%; text-align:center; font-size:2.5em">\n    <span *ngIf="hardware1ready" ><B style="font-size:2.5em">{{reading1}}</B> mmHG</span>\n    <span *ngIf="!hardware1ready" ><B style="font-size:2.5em">&nbsp;</B>Disconnected<B style="font-size:2.5em">&nbsp;</B></span>\n</div>\n</div>\n<div style="width:40% ;height:30%; padding:2%; border-radius:20px; display:inline-block; border:1px solid rgb(46,138,212); position:absolute; right:8%; top:20%;">\n    <div style="color:#444; font-size:2em; text-align:left">Dynamometer</div><BR>\n    <div style="width:100%; text-align:center; font-size:2.5em">\n        <span *ngIf="hardware2ready" ><B style="font-size:2.5em">{{reading2}}</B> kg</span>\n        <span *ngIf="!hardware2ready" ><B style="font-size:2.5em">&nbsp;</B>Disconnected<B style="font-size:2.5em">&nbsp;</B></span>\n       \n    </div>\n </div>\n\n  <div style="width:40% ;height:30%; padding:2%; border-radius:20px; display:inline-block; border:1px solid rgb(46,138,212); position:absolute; left:8%; top:55%;">\n      <div style="color:#444; font-size:2em; text-align:left">HR Monitor</div><BR>\n      <div style="width:100%; text-align:center; font-size:2em">\n          <table *ngIf="!calibrating3 && hardware3ready" style="width: 100%; text-align:center"><tr><td>\n              <ion-icon name="heart" style="zoom:2.0"></ion-icon><BR>\n              <div (tap)="clickCalibrate()" style="font-size: 0.75em;font-family:\'Calibril\'; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px;  display:inline-block; padding:3px">\n                  CALIBRATE\n                  </div> \n          </td><td><B style="font-size:2.5em">{{reading3}}</B> RRI</td></tr>\n        </table>\n        <table *ngIf="calibrating3 && hardware3ready" style="width: 100%; text-align:center;"><tr><td>\n            <B style="font-size:2.5em">&nbsp;</B><span style="font-size:1.25em">Calibrating...</span><B style="font-size:2.5em">&nbsp;</B>\n        </td></tr>\n      </table>\n\n        <table *ngIf="!hardware3ready" style="width: 100%; text-align:center;"><tr><td>\n            <B style="font-size:2.5em">&nbsp;</B><span style="font-size:1.25em">Disconnected</span><B style="font-size:2.5em">&nbsp;</B>\n        </td></tr>\n      </table>\n\n  </div>\n      </div>\n\n        <div style="width:40% ;height:30%; padding:2%; border-radius:20px; display:inline-block; border:1px solid rgb(46,138,212); position:absolute; right:8%; top:55%;">\n            <div style="color:#444; font-size:2em; text-align:left">BR Monitor</div><BR>\n            <div style="width:100%; text-align:center; font-size:2em">\n              <table *ngIf="hardware4ready &&  reading4_status !=1 "style="width: 100%; text-align:center"><tr><td>\n                CONNECTED<BR>\n                  <div (tap)="clickStartBP()" style="font-size: 0.75em; font-family:\'Calibril\'; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px;  display:inline-block; padding:3px">\n                      TEST\n                      </div>\n              </td><td style="line-height: 2em">\n                  <B style="font-size:2.5em">{{reading4_up}}</B> SYS\n                  <BR>\n                    <B style="font-size:2.5em">{{reading4_down}}</B> DIA\n              </td></tr></table>\n              <table *ngIf="!hardware4ready" style="width: 100%; text-align:center;"><tr><td>\n                  <B style="font-size:2.5em">&nbsp;</B><span style="font-size:1.25em">Disconnected</span><B style="font-size:2.5em">&nbsp;</B>\n              </td></tr>\n            </table>\n            <table *ngIf="hardware4ready && reading4_status==1" style="width: 100%; text-align:center;"><tr><td>\n                <B style="font-size:2.5em">&nbsp;</B><span style="font-size:1.25em">Getting Result...</span><B style="font-size:2.5em">&nbsp;</B>\n            </td></tr>\n          </table>\n                </div>\n            </div>\n\n\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 40px #888" (click)="popThis()">\n      <ion-icon name="close" style="zoom:2.5"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n\n\n<!--\n\n\n\n<ion-header  >\n    <ion-navbar color="sunshine" >\n      <ion-title >Config</ion-title>\n    </ion-navbar>\n</ion-header>\n  \n  \n\n<ion-content  text-left padding style="background:#D5E4C0;">\n\n     <B style="font-size:4em;">Hardware Monitor</B><BR><BR>\n\n<div style="display:inline-table; width:48vw; height:30vh; background:#D5E4C0; text-align:center">\n\n  <B style="font-size:3em">Breath Pressure Sensor</B><BR><BR>\n    <div style="color:#F00; font-size:2.5em" *ngIf="!hardware1ready" >Not Connected<BR>\n      <button ion-button color="sunshine" (click)="connectBreath()">Reconnect</button>\n    </div>\n    <div style="color:rgba(0, 255, 55, 0.548); font-size:3em" *ngIf="hardware1ready" >Connected</div>\n    <div style=" font-size:4em" *ngIf="hardware1ready" >{{reading1}}</div>\n\n</div>\n\n\n<div style="display:inline-table; width:48vw; height:30vh; background:#D5E4C0; text-align:center">\n\n  <B style="font-size:3em">Hand Grip Sensor</B><BR><BR>\n    <div style="color:#F00; font-size:2.5em" *ngIf="!hardware2ready" >Not Connected<BR>\n      <button ion-button color="sunshine" (click)="connectHandGrip()">Reconnect</button>\n    </div>\n    <div style="color:rgba(0, 255, 55, 0.548); font-size:3em" *ngIf="hardware2ready" >Connected</div>\n    <div style=" font-size:4em" *ngIf="hardware2ready" >{{reading2}}</div>\n    \n</div>\n<BR>\n<div style="display:inline-table; width:48vw; height:30vh; background:#D5E4C0; text-align:center">\n\n  <B style="font-size:3em">Blood Pressure</B><BR><BR>\n    <div style="color:#F00; font-size:2.5em" *ngIf="!hardware3ready" >Not Connected</div>\n    <div style="color:rgba(0, 255, 55, 0.548); font-size:2em" *ngIf="hardware3ready" >Connected</div>\n    <div style=" font-size:4em" *ngIf="hardware3ready" >{{reading1}}</div>\n    \n</div>\n\n<div style="display:inline-table; width:48vw; height:30vh; background:#D5E4C0; text-align:center">\n\n  <B style="font-size:3em">Heart Rate</B> <BR><BR>\n    <div style="color:#F00; font-size:2.5em" *ngIf="!hardware4ready" >Not Connected</div>\n    <div style="color:rgba(0, 255, 55, 0.548); font-size:2em" *ngIf="hardware4ready" >Connected</div>\n    <div style=" font-size:4em" *ngIf="hardware4ready" >{{reading1}}</div>\n    \n</div>\n\n</ion-content>\n-->'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/testConfig/testConfig.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], TestConfigPage);
    return TestConfigPage;
}());

//# sourceMappingURL=testConfig.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test3DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Test3DetailPage = (function () {
    function Test3DetailPage(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.hardwareReady = false;
        this.currentTime = 20;
        this.currentTimeTextM = "5";
        this.currentTimeTextS = "0";
        this.loadProgress = 100;
        this.result = [];
        this.BP_Trial = 0;
        this.BP_Trial_temp = 0;
        this.bp_readed = false;
        this.handgrip_stage = 0;
        this.reading4_status = 0;
        this.reading4_up = 0;
        this.reading4_down = 0;
        this.reading4_up_trial = [0, 0, 0, 0, 0];
        this.reading4_down_trial = [0, 0, 0, 0, 0];
        this.grip_reading_max = 0;
        this.grip_reading = 0;
        this.trial = 0;
        this.storage.get('id').then(function (val) {
            console.log(' id is', val);
            _this.patient_id = val;
        });
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 300);
        this.gettingGripTask = setInterval(function () {
            _this.getGripReading();
        }, 50);
        this.clickTestStartOrthostasis();
        this.handgrip_stage = 0;
    }
    Test3DetailPage.prototype.getGripReading = function () {
        var _this = this;
        this.ble.isConnected('58A8CA24-F894-D922-0462-A287BE6D53FE').then(function () {
            _this.ble.read('58A8CA24-F894-D922-0462-A287BE6D53FE', '19b10000-e8f2-537e-4f6c-d104768a1220', '19b10001-e8f2-537e-4f6c-d104768a1220').then(function (data2) {
                _this.grip_reading = (new Uint8Array(data2)[0]);
                if (_this.handgrip_stage == 15 && _this.grip_reading > _this.grip_reading_max) {
                    _this.grip_reading_max = _this.grip_reading;
                }
            }).catch(function (error) {
                console.log(error);
            });
        }, function () { });
    };
    Test3DetailPage.prototype.backTest3 = function () {
        var _this = this;
        clearInterval(this.checkDeviceTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.gettingBPTask);
        clearInterval(this.gettingGripTask);
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.result.push(_this.reading4_up);
            _this.result.push(_this.reading4_down);
            _this.result.push(_this.reading4_up_trial[0]);
            _this.result.push(_this.reading4_down_trial[0]);
            _this.result.push(_this.reading4_up_trial[1]);
            _this.result.push(_this.reading4_down_trial[1]);
            _this.result.push(_this.reading4_up_trial[2]);
            _this.result.push(_this.reading4_down_trial[2]);
            _this.result.push(_this.reading4_up_trial[3]);
            _this.result.push(_this.reading4_down_trial[3]);
            _this.result.push(_this.reading4_up_trial[4]);
            _this.result.push(_this.reading4_down_trial[4]);
            if (_this.reading4_up == 0 || _this.reading4_down == 0 || _this.reading4_down_trial[0] == 0) {
                _this.datab.executeSql("UPDATE patient_table SET t3_1 = '[]' where id='" + _this.patient_id + "';", {})
                    .then(function () {
                    console.log("update empty");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
                });
            }
            else {
                var data = [JSON.stringify(_this.result)];
                _this.datab.executeSql("UPDATE patient_table SET t3_1 = ? where id='" + _this.patient_id + "';", data)
                    .then(function () {
                    console.log("update");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
                });
            }
        });
    };
    Test3DetailPage.prototype.clickTestStartOrthostasis = function () {
        var _this = this;
        this.bp_readed = false;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 1;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
        });
        this.gettingBPTask = setInterval(function () {
            _this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
                _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1226').then(function (data2) {
                    _this.reading4_status = (new Uint16Array(data2)[0]);
                    if (!_this.bp_readed) {
                        if (_this.reading4_status == 0) {
                            _this.reading4_up = 0;
                            _this.reading4_down = 0;
                        }
                        else if (_this.reading4_status == 1) {
                            _this.reading4_up = 0;
                            _this.reading4_down = 0;
                        }
                        else {
                            _this.bp_readed = true;
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1224').then(function (dataUP) {
                                if (Math.round((new Uint16Array(dataUP)[0]) / 3) < 300)
                                    _this.reading4_up = Math.round((new Uint16Array(dataUP)[0]) / 3);
                                else
                                    _this.reading4_up = "0";
                            }).catch(function (error) {
                                console.log(error);
                            });
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1225').then(function (dataDOWN) {
                                if (Math.round((new Uint16Array(dataDOWN)[0]) / 3) < 150)
                                    _this.reading4_down = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                                else
                                    _this.reading4_down = "0";
                            }).catch(function (error) {
                                console.log(error);
                            });
                            clearInterval(_this.gettingBPTask);
                            _this.loadProgress = 100;
                            _this.currentTime = 300;
                            _this.handgrip_stage = 1;
                            _this.bp_readed = false;
                            /*this.testSecondTask = setInterval(()=>{
                              this.eachSecond();
                            },1000);*/
                            _this.resetValue();
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }, function () { });
        }, 1000);
    };
    Test3DetailPage.prototype.skipSecond = function () {
        this.currentTime = 10;
    };
    Test3DetailPage.prototype.gotoStage2 = function () {
        var _this = this;
        this.handgrip_stage = 2;
        this.loadProgress = 100;
        this.currentTime = 300;
        this.currentTimeTextM = "5";
        this.currentTimeTextS = "0";
        this.testSecondTask = setInterval(function () {
            _this.eachSecond2();
        }, 1000);
    };
    Test3DetailPage.prototype.gotoStage15 = function () {
        this.handgrip_stage = 15;
    };
    Test3DetailPage.prototype.takeReading = function () {
        var _this = this;
        this.resetValue();
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 1;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
        });
        this.gettingBPTask = setInterval(function () {
            _this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
                _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1226').then(function (data2) {
                    _this.reading4_status = (new Uint16Array(data2)[0]);
                    console.log("this.reading4_status", _this.reading4_status, " BP readed", _this.bp_readed);
                    if (!_this.bp_readed) {
                        if (_this.reading4_status == 0) {
                            _this.reading4_up_trial[_this.BP_Trial] = 0;
                            _this.reading4_down_trial[_this.BP_Trial] = 0;
                        }
                        else if (_this.reading4_status == 1) {
                            _this.reading4_up_trial[_this.BP_Trial] = 0;
                            _this.reading4_down_trial[_this.BP_Trial] = 0;
                        }
                        else {
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1224').then(function (dataUP) {
                                //if(!this.bp_readed){
                                if (Math.round((new Uint16Array(dataUP)[0]) / 3) < 300)
                                    _this.reading4_up_trial[_this.BP_Trial] = Math.round((new Uint16Array(dataUP)[0]) / 3);
                                else
                                    _this.reading4_up_trial[_this.BP_Trial] = 0;
                                //}
                            }).catch(function (error) {
                                console.log(error);
                            });
                            _this.ble.read('9ADE4682-C753-3B3A-7454-50123794CAF4', '19B10000-E8F2-537E-4F6C-D104768A1223', '19B10001-E8F2-537E-4F6C-D104768A1225').then(function (dataDOWN) {
                                // if(!this.bp_readed){
                                if (Math.round((new Uint16Array(dataDOWN)[0]) / 3) < 150)
                                    _this.reading4_down_trial[_this.BP_Trial] = Math.round((new Uint16Array(dataDOWN)[0]) / 3);
                                else
                                    _this.reading4_down_trial[_this.BP_Trial] = 0;
                                //}
                            }).catch(function (error) {
                                console.log(error);
                            });
                            if (_this.reading4_down_trial[_this.BP_Trial] != 0 && _this.reading4_up_trial[_this.BP_Trial] != 0) {
                                _this.bp_readed = true;
                                clearInterval(_this.gettingBPTask);
                                _this.BP_Trial++;
                                if (_this.BP_Trial >= 5) {
                                    _this.handgrip_stage = 4;
                                    _this.trial = 1;
                                }
                            }
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }, function () { });
        }, 300);
    };
    Test3DetailPage.prototype.redoTest = function () {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.gettingBPTask);
        clearInterval(this.gettingGripTask);
        this.currentTimeTextM = "5";
        this.currentTimeTextS = "0";
        this.result = [];
        this.trial = 0;
        this.handgrip_stage = 0;
        this.currentTime = 20;
        this.loadProgress = 100;
        this.bp_readed = false;
        this.reading4_status = 0;
        this.reading4_up = 0;
        this.reading4_down_trial = [0, 0, 0, 0, 0];
        this.reading4_down = 0;
        this.reading4_up_trial = [0, 0, 0, 0, 0];
        this.grip_reading_max = 0;
        this.grip_reading = 0;
        this.resetValue();
        this.clickTestStartOrthostasis();
    };
    Test3DetailPage.prototype.eachSecond2 = function () {
        this.currentTime--;
        this.currentTimeTextM = Math.floor(this.currentTime / 60);
        this.currentTimeTextS = (this.currentTime % 60);
        this.loadProgress = (this.currentTime / 300) * 100;
        if (this.currentTime == 245 || this.currentTime == 185 ||
            this.currentTime == 125 || this.currentTime == 65 || this.currentTime == 5) {
            this.bp_readed = false;
            this.takeReading();
        }
        if (this.currentTime <= 0) {
            clearInterval(this.testSecondTask);
            //this.loadProgress = 100;
            //this.currentTime = 300;
            //this.handgrip_stage = 3;
        }
    };
    Test3DetailPage.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            _this.hardwareReady = true;
        }, function () {
            _this.hardwareReady = false;
        });
    };
    Test3DetailPage.prototype.resetValue = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 2;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                console.log("reset");
            }).catch(function (error) {
                console.log(error);
            });
        }, function () { });
    };
    Test3DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test3detail',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test3detail/test3detail.html"*/'\n\n<ion-content text-left no-bounce style="overflow:none;background:rgb(240, 240, 240)">\n    <div class="ext-box" style=" background:#fff;box-shadow: 0 15px 15px -15px #888; width:120%; margin-left:-10%;padding-left:7%; font-family:\'Calibri\' ; height:12%; z-index:99; position:relative"> \n        <div class="int-box" style="padding-left:5%">\n            <table border="0" style="width:90%" >\n\n                <tr>\n                    <td style="width: 50%; vertical-align:middle"><B style="font-size:5em ; color:#444">Sustained<BR>Handgrip</B></td>\n                        <td style="text-align:right;width:25%;font-size:3em; vertical-align:middle">trials<BR>completed</td>\n                        <td style="text-align:right;width:25%;font-size:10em; font-weight:bold;  vertical-align:middle">{{trial}}/1</td>\n                </tr>\n            </table>\n            \n        </div>\n    </div>\n\n<div style="background:rgb(240, 240, 240);text-align:center; padding-top:40px; color:rgb(46,138,212) ;  ">\n \n    <div style="position:absolute; right:30px; top:32%;" *ngIf="handgrip_stage==1">\n    <div (tap)="gotoStage15()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n        NEXT\n        </div>\n    </div>\n\n    <div style="position:absolute; right:30px; top:41%;" *ngIf="handgrip_stage==1">\n        <div (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n            REDO\n            </div>\n        </div>\n\n        <div style="position:absolute; right:30px; top:32%;" *ngIf="handgrip_stage==15">\n            <div (tap)="gotoStage2()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n                NEXT\n                </div>\n            </div>\n\n   <!-- <div style="position:absolute; left:30px; bottom:5%;" *ngIf="handgrip_stage==2">\n            <div (tap)="skipSecond()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:160px ;  padding:10px">\n                SKIP\n                </div>\n            </div>\n        -->\n<table style="width:80%; margin-left:10%; text-align:left;" id="testingTable">\n<tr>\n    <td colspan="2">\n        <div>\n            <span *ngIf=" handgrip_stage==0" style="font-size:6.5em; font-weight:bold;"><BR>Baseline BP<BR>Measuring...</span>\n           <!--  <span *ngIf=" handgrip_stage==2" style="font-size:3.5em; font-weight:bold;">Please hold the grip for 5 mins.</span>-->\n           <span *ngIf=" handgrip_stage==3" style="font-size:4.5em; font-weight:bold;">Please release the handgrip.<br><br>Taking Blood Pressure value.</span>\n            <span *ngIf=" handgrip_stage==4" style="font-size:7.5em; font-weight:bold;">Finish</span>\n        </div>\n    </td>\n</tr>\n<tr *ngIf="handgrip_stage==0"> \n        <td style="width:100%; text-align:left;" colspan="2">\n           </td>\n </tr>\n\n<tr *ngIf="handgrip_stage==1"> \n    <td style="width:100%; text-align:left;" colspan="2">\n        <div style="font-size:6em; padding-top:70px;">\n        Baseline BP<BR>SYS&nbsp;<span *ngIf="reading4_up!=0">{{reading4_up}}</span>\n        <span *ngIf="reading4_up==0">ERR</span><BR>DIA&nbsp;<span *ngIf="reading4_down!=0">{{reading4_down}}</span>\n         <span *ngIf="reading4_down==0">ERR</span>\n          </div>\n\n    </td>\n </tr>\n\n <tr *ngIf="handgrip_stage==15"> \n    <td style="width:100%; text-align:left;" colspan="2">\n          <div style="font-size:6.5em">Squeeze as hard<br>as possible.</div>\n          <div style="font-size:16em">{{grip_reading_max}}<font style="font-size: 0.4em">kg</font></div>\n    </td>\n </tr>\n\n<tr *ngIf="handgrip_stage==2">\n    <td colspan="2">\n        <table cellspading=0 cellpadding=0 border=0 style="width:110%; margin-top:30px">\n<tr>\n        <td style="width: 35%">\n                <div style="font-size: 14em;">\n                        <span *ngIf="grip_reading < grip_reading_max * 0.3" style="color:salmon;">{{grip_reading}}</span>\n                        <span *ngIf="grip_reading >= grip_reading_max * 0.3" >{{grip_reading}}</span><span style="font-size: 0.5em">kg</span>\n                        </div>\n\n        </td>\n\n        <td><b style="font-size: 4em">BP</b><BR>\n         <table cellspading=0 cellpadding=0 border=0 style="margin-top:10px; width:100%; font-size:2.75em">\n                <tr>\n                        <td style="width: 20%">Base</td><td style="width: 30%">{{reading4_up}}/{{reading4_down}}</td>\n                        <td style="width: 20%">3<sup>rd</sup></td><td style="width: 30%">{{reading4_up_trial[2]}}/{{reading4_down_trial[2]}}</td>\n                </tr>\n                <tr>\n                        <td style="width: 20%">1<sup>st</sup></td><td style="width: 30%">{{reading4_up_trial[0]}}/{{reading4_down_trial[0]}}</td>\n                        <td style="width: 20%">4<sup>th</sup></td><td style="width: 30%">{{reading4_up_trial[3]}}/{{reading4_down_trial[3]}}</td>\n                </tr>\n                <tr>\n                        <td style="width: 20%">2<sup>nd</sup></td><td style="width: 30%">{{reading4_up_trial[1]}}/{{reading4_down_trial[1]}}</td>\n                        <td style="width: 20%">5<sup>th</sup></td><td style="width: 30%">{{reading4_up_trial[4]}}/{{reading4_down_trial[4]}}</td>\n                </tr>\n                    </table>\n        </td>\n\n</tr>\n\n        </table>\n\n</td>\n</tr>\n<tr *ngIf="handgrip_stage==2"> \n     <td style="width:39%; text-align:left;">\n            <span style="font-size:8em; font-weight:bold;">{{currentTimeTextM}}</span>\n            <span style="font-size:5em">m</span>\n            <span style="font-size:8em; font-weight:bold;">{{currentTimeTextS}}</span>\n            <span style="font-size:5em">s</span>\n    </td>\n    <td style="width:68%">\n            <progress-bar [progress]="loadProgress"></progress-bar>\n    </td>\n    </tr>\n    <tr *ngIf="handgrip_stage==3"> \n            <td style="width:100%; text-align:left;">\n                </td>\n      </tr>\n      <tr *ngIf="handgrip_stage==4"> \n            <td style="width:100%; text-align:left;">\n\n                    <table cellspading=0 cellpadding=0 border=0 style="margin-top:10px; width:100%; font-size:2.75em">\n                            <tr>\n                                    <td style="width: 20%">Base</td><td style="width: 30%">{{reading4_up}}/{{reading4_up}}</td>\n                                    <td style="width: 20%">3<sup>rd</sup></td><td style="width: 30%">{{reading4_up_trial[2]}}/{{reading4_down_trial[2]}}</td>\n                            </tr>\n                            <tr>\n                                    <td style="width: 20%">1<sup>st</sup></td><td style="width: 30%">{{reading4_up_trial[0]}}/{{reading4_down_trial[0]}}</td>\n                                    <td style="width: 20%">4<sup>th</sup></td><td style="width: 30%">{{reading4_up_trial[3]}}/{{reading4_down_trial[3]}}</td>\n                            </tr>\n                            <tr>\n                                    <td style="width: 20%">2<sup>nd</sup></td><td style="width: 30%">{{reading4_up_trial[1]}}/{{reading4_down_trial[1]}}</td>\n                                    <td style="width: 20%">5<sup>th</sup></td><td style="width: 30%">{{reading4_up_trial[4]}}/{{reading4_down_trial[4]}}</td>\n                            </tr>\n                                </table>\n                                <BR>\n\n                            <div (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                                    Redo\n                                    </div>\n                                    &nbsp;&nbsp;\n                            <div (tap)="backTest3()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                                    Finish\n                                    </div>\n           </td>\n           </tr>        \n    </table>\n\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 40px #888" (click)="backTest3()">\n      <ion-icon name="close" style="zoom:2.5"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test3detail/test3detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test3DetailPage);
    return Test3DetailPage;
}());

//# sourceMappingURL=test3detail.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test2DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Test2DetailPage = (function () {
    function Test2DetailPage(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.heartRateDeviceConnected = false;
        this.RRIReadng = 0;
        this.loadProgress = 100;
        this.currentTime = 10;
        this.trial = 0;
        this.loop = 1;
        this.CountdownSecond = 3;
        this.tempString = "";
        this.inhale = true;
        this.result0 = [];
        this.result1 = [];
        this.result2 = [];
        this.inter01 = [];
        this.inter02 = [];
        this.inter03 = [];
        this.inter04 = [];
        this.inter05 = [];
        this.inter06 = [];
        this.tempArray = [];
        this.showDeviceConnectTable = true;
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 200);
        this.clickTestStart();
    }
    Test2DetailPage.prototype.backTest2 = function () {
        var _this = this;
        clearInterval(this.checkDeviceTask);
        clearInterval(this.countdownTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.saveDataTask);
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.storage.get('id').then(function (val) {
                var data = [JSON.stringify(_this.result0), JSON.stringify(_this.result1), JSON.stringify(_this.result2)];
                _this.datab.executeSql("UPDATE patient_table SET t2_1 = ? , t2_2 = ? , t2_3 = ? where id='" + val + "'", data)
                    .then(function () {
                    console.log(data);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
                });
            });
        });
    };
    Test2DetailPage.prototype.clickTestStart = function () {
        var _this = this;
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
        this.countdownTask = setInterval(function () {
            _this.CountdownSecond--;
            if (_this.CountdownSecond == 0) {
                _this.showCountdownTable = false;
                _this.showTestingTable = true;
                _this.testSecondTask = setInterval(function () {
                    _this.eachSecond();
                }, 1000);
                _this.saveDataTask = setInterval(function () {
                    _this.addData();
                }, 1000);
                clearInterval(_this.countdownTask);
            }
        }, 1000);
    };
    Test2DetailPage.prototype.redoTest = function () {
        var _this = this;
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
        this.countdownTask = setInterval(function () {
            _this.CountdownSecond--;
            if (_this.CountdownSecond == 0) {
                _this.showCountdownTable = false;
                _this.showTestingTable = true;
                _this.testSecondTask = setInterval(function () {
                    _this.eachSecond();
                }, 1000);
                _this.saveDataTask = setInterval(function () {
                    _this.addData();
                }, 1000);
                clearInterval(_this.countdownTask);
            }
        }, 1000);
    };
    Test2DetailPage.prototype.addData = function () {
        if (this.loop == 1) {
            this.inter01.push(Math.round(60000 / this.RRIReadng));
        }
        else if (this.loop == 2) {
            this.inter02.push(Math.round(60000 / this.RRIReadng));
        }
        else if (this.loop == 3) {
            this.inter03.push(Math.round(60000 / this.RRIReadng));
        }
        else if (this.loop == 4) {
            this.inter04.push(Math.round(60000 / this.RRIReadng));
        }
        else if (this.loop == 5) {
            this.inter05.push(Math.round(60000 / this.RRIReadng));
        }
        else if (this.loop == 6) {
            this.inter06.push(Math.round(60000 / this.RRIReadng));
        }
    };
    Test2DetailPage.prototype.eachSecond = function () {
        this.currentTime--;
        this.loadProgress = (this.currentTime / 10) * 100;
        if (this.currentTime > 5) {
            this.inhale = true;
        }
        else {
            this.inhale = false;
        }
        if (this.currentTime <= 0) {
            if (this.loop == 1) {
                console.log(this.inter01);
            }
            else if (this.loop == 2) {
                console.log(this.inter02);
            }
            else if (this.loop == 3) {
                console.log(this.inter03);
            }
            else if (this.loop == 4) {
                console.log(this.inter04);
            }
            else if (this.loop == 5) {
                console.log(this.inter05);
            }
            else if (this.loop == 6) {
                console.log(this.inter06);
            }
            if (this.loop == 6) {
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
                if (this.trial == 0)
                    this.result0 = this.tempArray;
                this.showDeviceConnectTable = true;
                this.trial++;
                this.CountdownSecond = 3;
                this.currentTime = 10;
                this.loadProgress = 100;
            }
            else {
                this.inhale = true;
                this.currentTime = 10;
                this.loadProgress = 100;
                this.loop++;
            }
        }
    };
    Test2DetailPage.prototype.returnLargestAndSmallest = function (arr) {
        var tempMax = 0;
        var tempMin = 0;
        tempMax = arr[0];
        tempMin = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                tempMax = arr[i];
                tempMin = arr[i];
            }
            if (arr[i] - tempMax >= 0) {
                tempMax = arr[i];
            }
            if (arr[i] - tempMin <= 0) {
                tempMin = arr[i];
            }
        }
        return [tempMax, tempMin];
    };
    Test2DetailPage.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.heartRateDeviceConnected = true;
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19b10001-e8f2-537e-4f6c-d104768a1216').then(function (data2) {
                if ((new Uint16Array(data2)[0]) > 560 && (new Uint16Array(data2)[0]) < 1450)
                    _this.RRIReadng = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
            _this.heartRateDeviceConnected = false;
        });
        if (!this.heartRateDeviceConnected) {
            this.connectHeartRate();
        }
    };
    Test2DetailPage.prototype.connectHeartRate = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            console.log(JSON.stringify(device));
            _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                _this.heartRateDeviceConnected = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    Test2DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test2detail',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test2detail/test2detail.html"*/'\n\n<ion-content text-left no-bounce style="overflow:none;background:rgb(240, 240, 240)">\n    <div class="ext-box" style=" background:#fff;box-shadow: 0 15px 15px -15px #888; width:120%; margin-left:-10%;padding-left:7%; font-family:\'Calibri\' ; height:12%; z-index:99; position:relative"> \n        <div class="int-box" style="padding-left:5%">\n            <table border="0" style="width:90%" >\n\n                <tr>\n                    <td style="width: 50%; vertical-align:middle"><B style="font-size:5em ; color:#444">Deep<BR>Breathing</B> {{RRIReadng}}</td>\n                        <td style="text-align:right;width:25%;font-size:3em; vertical-align:middle">trials<BR>completed</td>\n                        <td style="text-align:right;width:25%;font-size:10em; font-weight:bold;  vertical-align:middle">{{loop-1}}/6</td>\n                </tr>\n            </table>\n            \n        \n        </div>\n    </div>\n\n<div style="background:rgb(240, 240, 240);text-align:center; padding-top:40px; color:rgb(46,138,212) ;  ">\n \n\n<div *ngIf="showDeviceConnectTable">\n    <div style="font-size:2em">\n\n      <!--  <b><u>Device Status</u></b><BR>\n       Heart Rate Device : {{heartRateDeviceConnected}} <BR><BR>-->\n        <div style="width:55%; margin:0 auto;" >\n        <div *ngIf="trial>0">\n                <table cellspacing=0 style="width:100%">\n    <tr style="text-decoration:underline; font-weight:bold;">\n            <td style="width:25%"></td><td style="width:25%">Max</td><td style="width:25%">Min</td><td style="width:25%">Difference</td>\n    </tr>\n<tr>\n<td>1st</td><td>{{tempArray[0]}}</td><td>{{tempArray[1]}}</td><td>{{tempArray[0] - tempArray[1]}}</td>\n</tr>\n<tr>\n<td>2nd</td><td>{{tempArray[2]}}</td><td>{{tempArray[3]}}</td><td>{{tempArray[2] - tempArray[3]}}</td>\n</tr>\n<tr>\n<td>3rd</td><td>{{tempArray[4]}}</td><td>{{tempArray[5]}}</td><td>{{tempArray[4] - tempArray[5]}}</td>\n</tr>\n<tr>\n<td>4th</td><td>{{tempArray[6]}}</td><td>{{tempArray[7]}}</td><td>{{tempArray[6] - tempArray[7]}}</td>\n</tr>\n<tr>\n<td>5th</td><td>{{tempArray[8]}}</td><td>{{tempArray[9]}}</td><td>{{tempArray[8] - tempArray[9]}}</td>\n</tr>\n<tr>\n<td>6th</td><td>{{tempArray[10]}}</td><td>{{tempArray[11]}}</td><td>{{tempArray[10] - tempArray[11]}}</td>\n</tr>    \n                </table>\n                <BR>\n\n        </div>\n    </div>\n       </div><BR>\n        <div *ngIf="heartRateDeviceConnected && trial>=1" (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:200px ;  padding:10px">\n                Redo Trial\n                </div>\n                &nbsp;&nbsp;\n        <div *ngIf="heartRateDeviceConnected && trial >=1" (tap)="backTest2()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                End\n                </div>\n</div>    \n\n<div *ngIf="showCountdownTable"  style="font-size: 20em">\n{{CountdownSecond}}\n </div>  \n\n<table style="width:80%; margin-left:10%; text-align:left;" id="testingTable" *ngIf="showTestingTable">\n<tr>\n    <td colspan="2">\n        <div *ngIf="!inhale">\n            <span style="font-size:15em; font-weight:bold;">Exhale</span>\n        </div>\n        <div *ngIf="inhale">\n                <span style="font-size:15em; font-weight:bold;">Inhale</span>\n        </div>\n    </td>\n</tr>\n<tr>\n     <td style="width:40%; text-align:left;">\n         <span style="font-size:15em; font-weight:bold;">{{currentTime}}</span><span style="font-weight:bold;font-size:7.5em">s</span>\n    </td>\n    <td style="width:70%">\n            <progress-bar [progress]="loadProgress"></progress-bar>\n    </td>\n    </tr>\n    </table>\n\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 40px #888" (click)="backTest2()">\n      <ion-icon name="close" style="zoom:2.5"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test2detail/test2detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test2DetailPage);
    return Test2DetailPage;
}());

//# sourceMappingURL=test2detail.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test1DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chart_js__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Test1DetailPage = (function () {
    function Test1DetailPage(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.heartRateDeviceConnected = false;
        this.breathDeviceConnected = false;
        this.breathReading = 0;
        this.RRIReadng = 0;
        this.RRITemp = 0;
        this.loadProgress = 100;
        this.currentTime = 15;
        this.trial = 0;
        this.CountdownSecond = 3;
        this.under40 = true;
        this.tempString = "";
        this.thresholdConfig = {
            '5': { color: '#AFA' },
            '3': { color: '#FFA' },
            '1': { color: '#FAA' }
        };
        this.debugg = "123131231";
        this.result0 = [];
        this.tempArray = [];
        this.storage.get('id').then(function (val) {
            console.log(' id is', val);
            _this.patient_id = val;
        });
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 50);
        this.clickTestStart();
    }
    Test1DetailPage.prototype.backTest1 = function () {
        var _this = this;
        clearInterval(this.checkDeviceTask);
        clearInterval(this.countdownTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.saveDataTask);
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            var dataSent = [JSON.stringify(_this.result0)];
            _this.datab.executeSql("select * from patient_table where id=" + _this.patient_id + ";", {})
                .then(function (data) {
                var t1 = JSON.parse(data.rows.item(0).t1_1);
                var t2 = JSON.parse(data.rows.item(0).t1_2);
                var t3 = JSON.parse(data.rows.item(0).t1_3);
                if (t1.length == 0) {
                    _this.datab.executeSql("UPDATE patient_table SET t1_1 = ? where id='" + _this.patient_id + "';", dataSent)
                        .then(function () {
                        console.log(data);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
                    });
                }
                else if (t2.length == 0) {
                    _this.datab.executeSql("UPDATE patient_table SET t1_2 = ? where id='" + _this.patient_id + "';", dataSent)
                        .then(function () {
                        console.log(data);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
                    });
                }
                else {
                    _this.datab.executeSql("UPDATE patient_table SET t1_3 = ? where id='" + _this.patient_id + "';", dataSent)
                        .then(function () {
                        console.log(data);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
                    });
                }
            });
        });
    };
    Test1DetailPage.prototype.clickTestStart = function () {
        var _this = this;
        this.showDeviceConnectTable = false;
        this.showCountdownTable = true;
        this.countdownTask = setInterval(function () {
            _this.CountdownSecond--;
            if (_this.CountdownSecond == 0) {
                _this.RRITemp = _this.RRIReadng;
                _this.tempArray.push(_this.RRIReadng.toString());
                _this.showCountdownTable = false;
                _this.showTestingTable = true;
                _this.testSecondTask = setInterval(function () {
                    _this.eachSecond();
                }, 1000);
                _this.saveDataTask = setInterval(function () {
                    _this.addData();
                }, 1000);
                clearInterval(_this.countdownTask);
            }
        }, 1000);
    };
    Test1DetailPage.prototype.redoTest = function () {
        var _this = this;
        this.trial--;
        this.showDeviceConnectTable = false;
        this.showCountdownTable = true;
        this.countdownTask = setInterval(function () {
            _this.CountdownSecond--;
            if (_this.CountdownSecond == 0) {
                _this.RRITemp = _this.RRIReadng;
                _this.tempArray.push(_this.RRIReadng.toString());
                _this.showCountdownTable = false;
                _this.showTestingTable = true;
                _this.testSecondTask = setInterval(function () {
                    _this.eachSecond();
                }, 1000);
                _this.saveDataTask = setInterval(function () {
                    _this.addData();
                }, 1000);
                clearInterval(_this.countdownTask);
            }
        }, 1000);
    };
    Test1DetailPage.prototype.addData = function () {
        if (this.RRIReadng > 520 && (Math.abs(this.RRITemp - this.RRIReadng) < 350)) {
            this.tempArray.push(this.RRIReadng.toString());
            this.RRITemp = this.RRIReadng;
        }
        else {
            this.tempArray.push(this.RRITemp.toString());
        }
    };
    Test1DetailPage.prototype.eachSecond = function () {
        var _this = this;
        this.currentTime--;
        this.loadProgress = (this.currentTime / 15) * 100;
        if (this.currentTime <= 0) {
            this.tempArray.push(this.RRIReadng.toString());
            clearInterval(this.saveDataTask);
            clearInterval(this.testSecondTask);
            this.tempString = "";
            var finishChart = false;
            this.result0 = this.tempArray;
            this.showTestingTable = false;
            this.showDeviceConnectTable = true;
            this.trial++;
            this.CountdownSecond = 3;
            this.currentTime = 15;
            this.loadProgress = 100;
            setTimeout(function () {
                _this.createChart();
            }, 200);
        }
    };
    Test1DetailPage.prototype.createChart = function () {
        if (this.lineCanvas != undefined) {
            this.lineChart = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.lineCanvas.nativeElement, {
                type: 'line',
                options: { legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [{
                                display: true
                            }]
                    }
                },
                data: {
                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
    };
    Test1DetailPage.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('52E068E1-84B8-1271-EA06-3DC903EA38C5').then(function () {
            _this.breathDeviceConnected = true;
            _this.ble.read('52E068E1-84B8-1271-EA06-3DC903EA38C5', '19b10000-e8f2-537e-4f6c-d104768a1214', '19b10001-e8f2-537e-4f6c-d104768a1214').then(function (data2) {
                _this.breathReading = (new Uint8Array(data2)[0]);
                if (_this.breathReading < 40)
                    _this.under40 = true;
                else
                    _this.under40 = false;
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
            _this.breathDeviceConnected = false;
        });
        if (!this.breathDeviceConnected) {
            this.connectBreath();
        }
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.heartRateDeviceConnected = true;
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19b10001-e8f2-537e-4f6c-d104768a1216').then(function (data2) {
                //this.RRIReadng = Math.round((new Uint16Array(data2)[0])/5) * 5;
                _this.RRIReadng = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
            _this.heartRateDeviceConnected = false;
        });
        if (!this.heartRateDeviceConnected) {
            this.connectHeartRate();
        }
    };
    Test1DetailPage.prototype.connectBreath = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            console.log(JSON.stringify(device));
            _this.ble.connect('52E068E1-84B8-1271-EA06-3DC903EA38C5').subscribe(function (data) {
                _this.breathDeviceConnected = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    Test1DetailPage.prototype.connectHeartRate = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            console.log(JSON.stringify(device));
            _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                _this.heartRateDeviceConnected = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], Test1DetailPage.prototype, "lineCanvas", void 0);
    Test1DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test1detail',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test1detail/test1detail.html"*/'\n\n<ion-content text-left no-bounce style="overflow:none;background:rgb(240, 240, 240)">\n    <div class="ext-box" style=" background:#fff;box-shadow: 0 15px 15px -15px #888; width:120%; margin-left:-10%;padding-left:7%; font-family:\'Calibri\' ; height:12%; z-index:99; position:relative"> \n        <div class="int-box" style="padding-left:5%">\n            <table border="0" style="width:90%" >\n\n                <tr>\n                    <td style="width: 50%; vertical-align:middle"><B style="font-size:5em ; color:#444">Valsalva<BR>Maneuver</B> {{RRIReadng}}</td>\n                        <td style="text-align:right;width:25%;font-size:3em; vertical-align:middle">trials<BR>completed</td>\n                        <td style="text-align:right;width:25%;font-size:10em; font-weight:bold;  vertical-align:middle">{{trial}}/1</td>\n                </tr>\n            </table>\n            \n        \n        </div>\n    </div>\n\n<div style="background:rgb(240, 240, 240);text-align:center; padding-top:40px; color:rgb(46,138,212) ;  ">\n \n\n<div *ngIf="showDeviceConnectTable">\n    <div style="font-size:2em">\n\n        <div style="width:55%; margin:0 auto;" >\n        <canvas #lineCanvas *ngIf="trial>0"></canvas>\n    </div>\n       </div><BR>\n        <div *ngIf="heartRateDeviceConnected && breathDeviceConnected && trial>=1" (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:200px ;  padding:10px">\n                Redo Trial {{trial}}\n                </div>\n                &nbsp;&nbsp;\n        <div *ngIf="heartRateDeviceConnected && breathDeviceConnected && trial ==0" (tap)="clickTestStart()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                START\n                </div>\n        <div *ngIf="heartRateDeviceConnected && breathDeviceConnected && trial >=1" (tap)="backTest1()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                End\n                </div>\n</div>    \n\n<div *ngIf="showCountdownTable"  style="font-size: 20em">\n{{CountdownSecond}}\n \n </div>  \n\n<table style="width:80%; margin-left:10%; text-align:left;" id="testingTable" *ngIf="showTestingTable">\n<tr>\n    <td colspan="2">\n        <div *ngIf="!under40">\n            <span style="font-size:15em; font-weight:bold;">{{breathReading}}</span><span style="font-weight:bold;font-size:7.5em">mmHG</span>\n        </div>\n        <div *ngIf="under40">\n                <span style="font-size:15em; font-weight:bold; color:salmon">{{breathReading}}</span><span style="color:salmon;font-weight:bold;font-size:7.5em">mmHG</span>\n        </div>\n    </td>\n</tr>\n<tr>\n     <td style="width:40%; text-align:left;">\n         <span style="font-size:15em; font-weight:bold;">{{currentTime}}</span><span style="font-weight:bold;font-size:7.5em">s</span>\n    </td>\n    <td style="width:70%">\n            <progress-bar [progress]="loadProgress"></progress-bar>\n    </td>\n    </tr>\n    </table>\n\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 40px #888" (click)="backTest1()">\n      <ion-icon name="close" style="zoom:2.5"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test1detail/test1detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test1DetailPage);
    return Test1DetailPage;
}());

//# sourceMappingURL=test1detail.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__test2detail_test2detail__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var Test2Page = (function () {
    function Test2Page(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.result_t1_0 = [];
        this.result_t1_1 = [];
        this.result_t1_2 = [];
        this.result_t2_0 = [];
        this.result_t2_1 = [];
        this.result_t2_2 = [];
        this.result_t3_1 = [];
        this.result_t4_1 = [];
        this.result_t4_2 = [];
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;
        this.patient_elapsed = "0:00";
        this.allDeviceReady = false;
        this.average_t2_1 = 0;
        this.average_t2_2 = 0;
        this.average_t2_3 = 0;
        this.average_RRI = 0;
        this.highest1 = 0;
        this.highest2 = 0;
        this.highest3 = 0;
        this.lowest1 = 0;
        this.lowest2 = 0;
        this.lowest3 = 0;
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.storage.get('id').then(function (val) {
                console.log(' id is', val);
                _this.patient_id = val;
                _this.datab.executeSql("select * from patient_table where id='" + _this.patient_id + "';", {})
                    .then(function (data) {
                    _this.patient_age = data.rows.item(0).age;
                    _this.patient_name = data.rows.item(0).name;
                    _this.patient_created = data.rows.item(0).createTime;
                    _this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
                    _this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
                    _this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
                    var tempMax = 0;
                    var tempMin = 0;
                    for (var i = 0; i < _this.result_t1_0.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_0[i];
                            tempMin = _this.result_t1_0[i];
                        }
                        if (_this.result_t1_0[i] - tempMax >= 0)
                            tempMax = _this.result_t1_0[i];
                        if (_this.result_t1_0[i] - tempMin <= 0)
                            tempMin = _this.result_t1_0[i];
                    }
                    if (tempMax == 0) {
                        _this.highest1 = "-";
                    }
                    else {
                        _this.highest1 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest1 = "-";
                    }
                    else {
                        _this.lowest1 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i = 0; i < _this.result_t1_1.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_1[i];
                            tempMin = _this.result_t1_1[i];
                        }
                        if (_this.result_t1_1[i] - tempMax >= 0) {
                            tempMax = _this.result_t1_1[i];
                        }
                        if (_this.result_t1_1[i] - tempMin <= 0) {
                            tempMin = _this.result_t1_1[i];
                        }
                    }
                    if (tempMax == 0) {
                        _this.highest2 = "-";
                    }
                    else {
                        _this.highest2 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest2 = "-";
                    }
                    else {
                        _this.lowest2 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i = 0; i < _this.result_t1_2.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_2[i];
                            tempMin = _this.result_t1_2[i];
                        }
                        if (_this.result_t1_2[i] - tempMax >= 0)
                            tempMax = _this.result_t1_2[i];
                        if (_this.result_t1_2[i] - tempMin <= 0)
                            tempMin = _this.result_t1_2[i];
                    }
                    if (tempMax == 0) {
                        _this.highest3 = "-";
                    }
                    else {
                        _this.highest3 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest3 = "-";
                    }
                    else {
                        _this.lowest3 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    if (_this.ratio1 != 0) {
                        tempMax += _this.ratio1;
                        tempMin++;
                    }
                    if (_this.ratio2 != 0) {
                        tempMax += _this.ratio2;
                        tempMin++;
                    }
                    if (_this.ratio3 != 0) {
                        tempMax += _this.ratio3;
                        tempMin++;
                    }
                    if (tempMin == 0)
                        _this.average_t1 = 0;
                    else
                        _this.average_t1 = (tempMax) / tempMin;
                    _this.result_t2_0 = JSON.parse(data.rows.item(0).t2_1);
                    _this.result_t2_1 = JSON.parse(data.rows.item(0).t2_2);
                    _this.result_t2_2 = JSON.parse(data.rows.item(0).t2_3);
                    if (_this.result_t2_0.length > 0) {
                        _this.average_t2_1 = Math.round(((_this.result_t2_0[0] - _this.result_t2_0[1]) +
                            (_this.result_t2_0[2] - _this.result_t2_0[3]) +
                            (_this.result_t2_0[4] - _this.result_t2_0[5]) +
                            (_this.result_t2_0[6] - _this.result_t2_0[7]) +
                            (_this.result_t2_0[8] - _this.result_t2_0[9]) +
                            (_this.result_t2_0[10] - _this.result_t2_0[11])) / 6);
                    }
                    if (_this.result_t2_1.length > 0) {
                        _this.average_t2_2 = Math.round(((_this.result_t2_1[0] - _this.result_t2_1[1]) +
                            (_this.result_t2_1[2] - _this.result_t2_1[3]) +
                            (_this.result_t2_1[4] - _this.result_t2_1[5]) +
                            (_this.result_t2_1[6] - _this.result_t2_1[7]) +
                            (_this.result_t2_1[8] - _this.result_t2_1[9]) +
                            (_this.result_t2_1[10] - _this.result_t2_1[11])) / 6);
                    }
                    if (_this.result_t2_2.length > 0) {
                        _this.average_t2_3 = Math.round(((_this.result_t2_2[0] - _this.result_t2_2[1]) +
                            (_this.result_t2_2[2] - _this.result_t2_2[3]) +
                            (_this.result_t2_2[4] - _this.result_t2_2[5]) +
                            (_this.result_t2_2[6] - _this.result_t2_2[7]) +
                            (_this.result_t2_2[8] - _this.result_t2_2[9]) +
                            (_this.result_t2_2[10] - _this.result_t2_2[11])) / 6);
                    }
                    var temp = 0;
                    var count = 0;
                    if (_this.average_t2_1 > 0) {
                        temp += _this.average_t2_1;
                        count++;
                    }
                    if (_this.average_t2_2 > 0) {
                        temp += _this.average_t2_2;
                        count++;
                    }
                    if (_this.average_t2_3 > 0) {
                        temp += _this.average_t2_3;
                        count++;
                    }
                    if (count == 0)
                        _this.average_t2 = 0;
                    else {
                        _this.average_t2 = Math.round(temp / count);
                    }
                    _this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);
                    if (_this.result_t3_1.length > 0) {
                        var max = _this.result_t3_1[3];
                        if (_this.result_t3_1[5] > max)
                            max = _this.result_t3_1[5];
                        if (_this.result_t3_1[7] > max)
                            max = _this.result_t3_1[7];
                        if (_this.result_t3_1[9] > max)
                            max = _this.result_t3_1[9];
                        if (_this.result_t3_1[11] > max)
                            max = _this.result_t3_1[11];
                        _this.average_t3 = Math.abs(max - _this.result_t3_1[1]);
                    }
                    else {
                        _this.average_t3 = 0;
                    }
                    _this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);
                    if (_this.result_t4_1.length > 0) {
                        _this.average_RRI = _this.result_t4_1[1] / _this.result_t4_1[0];
                    }
                    _this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);
                    if (_this.result_t4_2.length > 0) {
                        var min = _this.result_t4_2[2];
                        if (_this.result_t4_2[4] < min)
                            min = _this.result_t4_2[4];
                        if (_this.result_t4_2[6] < min)
                            min = _this.result_t4_2[6];
                        _this.average_t4 = Math.abs(min - _this.result_t4_2[0]);
                    }
                    else {
                        _this.average_t4 = 0;
                    }
                    var diffTime = __WEBPACK_IMPORTED_MODULE_13_moment___default()().diff(_this.patient_created, 'seconds', false);
                    var duration = __WEBPACK_IMPORTED_MODULE_13_moment___default.a.duration(diffTime, 'seconds');
                    if (duration.seconds() < 10) {
                        _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                    }
                    else {
                        _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                    }
                    _this.task = setInterval(function () {
                        var diffTime = __WEBPACK_IMPORTED_MODULE_13_moment___default()().diff(_this.patient_created, 'seconds', false);
                        var duration = __WEBPACK_IMPORTED_MODULE_13_moment___default.a.duration(diffTime, 'seconds');
                        if (duration.seconds() < 10) {
                            _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                        }
                        else {
                            _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                        }
                    }, 1000);
                });
            });
        });
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 1000);
    }
    Test2Page_1 = Test2Page;
    Test2Page.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.allDeviceReady = true;
        }, function () {
            _this.allDeviceReady = false;
        });
        if (!this.allDeviceReady) {
            this.connectHeartRate();
        }
    };
    Test2Page.prototype.connectHeartRate = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            console.log(JSON.stringify(device));
            _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                _this.allDeviceReady = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    Test2Page.prototype.loadConfig = function () {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.task);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__testConfig_testConfig__["a" /* TestConfigPage */], { parent: Test2Page_1 }, { animate: true, direction: 'forward' });
    };
    Test2Page.prototype.enterTest = function () {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.task);
        this.datab.close();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__test2detail_test2detail__["a" /* Test2DetailPage */], {}, { animate: false, direction: 'forward' });
    };
    Test2Page.prototype.clickPage = function (a) {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.task);
        if (a == 0)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__testStart_testStart__["a" /* TestStartPage */], {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(Test2Page_1, {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test5_test5__["a" /* Test5Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    Test2Page = Test2Page_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test2',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test2/test2.html"*/'\n<ion-content text-center no-bounce>\n\n    <ion-fab right bottom>\n        <button ion-fab large color="white" style="box-shadow:0 0 40px #888" (click)="loadConfig()">\n          <img src="images/gear.png">\n        </button>\n      </ion-fab>\n    \n\n<div style="text-align: left;width:40%; height:100%;background:#fafafa;box-shadow:0px 20px 40px 0 #888; float:left; color:rgb(46,138,212);z-index:99; position:relative">\n\n        <table cellspacing=0 cellpadding=0 border=0 style=" width:100%;font-size:1.5em;color:#444">\n                <tr>\n                <td style="padding:5px; padding-left:15px; width:70%; font-weight:bold; padding-right:0; padding-bottom:0;">{{patient_name}}&nbsp;</td>\n                <td rowspan="2" style=" font-size:2.5em;vertical-align:top;padding:5px;text-align: right">&nbsp;{{patient_age}}</td>\n                </tr>\n                <tr><td style="padding:5px; padding-left:15px;padding-right:0; padding-top: 0;"><span *ngIf="patient_elapsed !=\'0:00\'">{{patient_created}} ({{patient_elapsed}})</span>&nbsp;</td></tr>\n                </table>  \n\n\n<div (tap)="clickPage(1)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%; padding:10px; height:100px; margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">Valsalva Maneuver</div>\n<div style="font-size: 3em ; text-align:center ;width:100%">\n                <span *ngIf="average_t1>0"> {{average_t1 | number:\'1.2-2\'}}</span>\n                <span *ngIf="average_t1==0">-</span>\n</div>\n</div>\n\n\n<div (tap)="clickPage(2)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">Deep Breathing</div>\n<div style="font-size: 3em ; text-align:center ;width:100%"><span *ngIf="average_t2!=0">{{average_t2}} bpm</span>\n<span *ngIf="average_t2==0">-</span>\n</div>\n</div>\n\n<div (tap)="clickPage(3)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">Sustained Handgrip</div>\n<div style="font-size: 3em ; text-align:center ;width:100%">\n<span *ngIf="average_t3!=0">{{average_t3}} mmHg</span>\n<span *ngIf="average_t3==0">-</span>\n</div>\n</div>\n\n\n<div (tap)="clickPage(4)"  style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n<div style="font-size: 1.75em; color:#444">30:15 Ratio &amp; Orthostasis</div>\n<div style="font-size: 3em ; text-align:center ;width:100%">\n                <span *ngIf="average_RRI!=0">{{average_RRI | number:\'1.2-2\'}}</span>\n                <span *ngIf="average_RRI==0">-</span> | <span *ngIf="average_t4!=0">{{average_t4}} mmHg</span>\n                <span *ngIf="average_t4==0">-</span>\n        </div>\n</div>\n\n<BR><BR><BR><BR>\n<div (tap)="clickPage(6)" style="border:1px solid rgb(46,138,212); border-radius:50px; margin-left:27%; width:170px; padding:7px; font-size: 1.5em; color:rgb(46,138,212);text-align:center;">\n    COMPLETE\n</div>\n\n</div>\n    \n <div style="width:60%; height:100%; float:right; background-color:rgb(240, 240, 240);">\n\n\n<table cellspacing=0 cellpadding=0 border=0 style="font-family: \'Calibri\'; margin:15%; margin-bottom:2%;margin-left:12%;width:70%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n<tr>\n<td style="padding-left:10px;font-size:4em; font-weight:bold;width:65%; text-align:left;">Deep<BR>Breathing</td>\n<td style="padding-top:12px"><BR><BR><BR>\n<div *ngIf="allDeviceReady" (tap)="enterTest()" style="border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n<div style="font-size: 1.5em; color:rgb(46,138,212);text-align:center; width:100%">BEGIN</div>\n</div>\n<div *ngIf="!allDeviceReady"  style="border:1px solid rgb(190,190,190); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n        <div style="font-size: 1.5em; color:rgb(190,190,190);text-align:center; width:100%">BEGIN</div>\n        </div>\n</td>\n</table>  \n\n\n<div style="padding:15%; padding-top:0; padding-bottom:0; padding-left:12%;">\n                <div style="font-size: 2em; text-align:left">\n                                <span style="font-size:3em ;width:20%; text-align:left;color:rgb(46,138,212)">{{average_t2}}<span style="font-size: 0.4em"> bpm</span></span>&nbsp;\n                                <span *ngIf="average_t2 >=15" style="color:rgba(112,173,71,1); font-weight:bold">NORMAL</span>\n                                <span *ngIf="average_t2 <=14 && average_t2 >= 11" style="color:rgba(255,192,0,1); font-weight:bold">BORDERLINE</span>\n                                <span *ngIf="average_t2 <=10 && average_t2 >0" style="color:rgba(237,125,49,1); font-weight:bold">ABNORMAL</span>  \n                        </div>    \n\n        <ion-slides style="width:100%; height:50%;">\n\n        <ion-slide>\n        \n\n                <div style="font-size:1.75em ; text-align:left;" *ngIf="result_t2_0.length == 0" >No Record</div>\n                <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444" *ngIf="result_t2_0.length>0">\n                <tr style="text-decoration: underline;font-weight:bold">\n                        <td></td><td></td><td>Max</td><td>Min</td><td>Difference</td>\n                </tr>\n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">1<sup>st</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Trial</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[0]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[1]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[0] - result_t2_0[1]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">2<sup>nd</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Trial</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[2]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[3]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[2] - result_t2_0[3]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">3<sup>rd</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Trial</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[4]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[5]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[4] - result_t2_0[5]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">4<sup>th</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Trial</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[6]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[7]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[6] - result_t2_0[7]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">5<sup>th</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Trial</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[8]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[9]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[8] - result_t2_0[9]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:10%; text-align:left;">6<sup>th</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Trial</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[10]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_0[11]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[10] - result_t2_0[11]}}</td>\n                </tr>\n                \n                </table>  <BR><BR>\n                </ion-slide>\n        \n<!--\n        <ion-slide *ngIf="result_t2_1.length>0">\n                        <div style="font-size:2.5em ; text-align:left;color:rgb(46,138,212)" colspan="4">2nd Trial</div>\n                <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444">\n                <tr style="text-decoration: underline;font-weight:bold">\n                        <td></td><td></td><td>Max</td><td>Min</td><td>Difference</td>\n                </tr>\n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">1<sup>st</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[0]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[1]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_1[0] - result_t2_1[1]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">2<sup>nd</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[2]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[3]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_1[2] - result_t2_1[3]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">3<sup>rd</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[4]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[5]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_1[4] - result_t2_1[5]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">4<sup>th</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[6]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[7]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_1[6] - result_t2_1[7]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">5<sup>th</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[8]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[9]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_1[8] - result_t2_1[9]}}</td>\n                </tr>\n                \n                <tr>\n                <td style="padding-left:10px;font-size:1.75em ;width:10%; text-align:left;">6<sup>th</sup></td>\n                <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[10]}}</td>\n                <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_1[11]}}</td>\n                <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_1[10] - result_t2_1[11]}}</td>\n                </tr>\n                \n                </table>  <BR><BR>\n                </ion-slide>\n\n                \n<ion-slide *ngIf="result_t2_2.length>0">\n                <div style="font-size:2.5em ; text-align:left;color:rgb(46,138,212)" colspan="4">3rd Trial</div>\n        <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444">\n        <tr style="text-decoration: underline;font-weight:bold">\n                <td></td><td></td><td>Max</td><td>Min</td><td>Difference</td>\n        </tr>\n        <tr>\n        <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">1<sup>st</sup></td>\n        <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[0]}}</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[1]}}</td>\n        <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_2[0] - result_t2_2[1]}}</td>\n        </tr>\n        \n        <tr>\n        <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">2<sup>nd</sup></td>\n        <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[2]}}</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[3]}}</td>\n        <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_2[2] - result_t2_2[3]}}</td>\n        </tr>\n        \n        <tr>\n        <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">3<sup>rd</sup></td>\n        <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[4]}}</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[5]}}</td>\n        <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_2[4] - result_t2_2[5]}}</td>\n        </tr>\n        \n        <tr>\n        <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">4<sup>th</sup></td>\n        <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[6]}}</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[7]}}</td>\n        <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_2[6] - result_t2_2[7]}}</td>\n        </tr>\n        \n        <tr>\n        <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">5<sup>th</sup></td>\n        <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[8]}}</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[9]}}</td>\n        <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_2[8] - result_t2_2[9]}}</td>\n        </tr>\n        \n        <tr>\n        <td style="padding-left:10px;font-size:1.75em ;width:10%; text-align:left;">6<sup>th</sup></td>\n        <td style="font-size:1.75em ;width:25%; text-align:left;">Breath</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[10]}}</td>\n        <td style="font-size:1.75em ;width:20%; text-align:center;">{{result_t2_2[11]}}</td>\n        <td style="font-weight:bold; font-size:1.75em ;width:20%; text-align:center; color:rgb(46,138,212)">{{result_t2_2[10] - result_t2_2[11]}}</td>\n        </tr>\n        \n        </table>  <BR><BR>\n        </ion-slide>-->\n        \n\n\n\n                        </ion-slides>\n                    </div>\n\n</div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test2/test2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test2Page);
    return Test2Page;
    var Test2Page_1;
}());

//# sourceMappingURL=test2.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(374);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__test3detail_test3detail__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var Test3Page = (function () {
    function Test3Page(ble, storage, sqlite, navCtrl, navParams) {
        var _this = this;
        this.ble = ble;
        this.storage = storage;
        this.sqlite = sqlite;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.patient_elapsed = "0:00";
        this.Gripready = false;
        this.BPready = false;
        this.result = [];
        this.result_t1_0 = [];
        this.result_t1_1 = [];
        this.result_t1_2 = [];
        this.result_t2_0 = [];
        this.result_t2_1 = [];
        this.result_t2_2 = [];
        this.result_t3_1 = [];
        this.result_t4_1 = [];
        this.result_t4_2 = [];
        this.average_t2_1 = 0;
        this.average_t2_2 = 0;
        this.average_t2_3 = 0;
        this.average_RRI = 0;
        this.highest1 = 0;
        this.highest2 = 0;
        this.highest3 = 0;
        this.lowest1 = 0;
        this.lowest2 = 0;
        this.lowest3 = 0;
        this.up1 = 0;
        this.down1 = 0;
        this.up2 = 0;
        this.down2 = 0;
        this.up3 = 0;
        this.down3 = 0;
        this.up4 = 0;
        this.down4 = 0;
        this.up5 = 0;
        this.down5 = 0;
        this.up6 = 0;
        this.down6 = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.storage.get('id').then(function (val) {
                console.log(' id is', val);
                _this.patient_id = val;
                _this.datab.executeSql("select * from patient_table where id='" + _this.patient_id + "';", {})
                    .then(function (data) {
                    _this.patient_age = data.rows.item(0).age;
                    _this.patient_name = data.rows.item(0).name;
                    _this.patient_created = data.rows.item(0).createTime;
                    _this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
                    _this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
                    _this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
                    var tempMax = 0;
                    var tempMin = 0;
                    for (var i = 0; i < _this.result_t1_0.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_0[i];
                            tempMin = _this.result_t1_0[i];
                        }
                        if (_this.result_t1_0[i] - tempMax >= 0)
                            tempMax = _this.result_t1_0[i];
                        if (_this.result_t1_0[i] - tempMin <= 0)
                            tempMin = _this.result_t1_0[i];
                    }
                    if (tempMax == 0) {
                        _this.highest1 = "-";
                    }
                    else {
                        _this.highest1 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest1 = "-";
                    }
                    else {
                        _this.lowest1 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i = 0; i < _this.result_t1_1.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_1[i];
                            tempMin = _this.result_t1_1[i];
                        }
                        if (_this.result_t1_1[i] - tempMax >= 0) {
                            tempMax = _this.result_t1_1[i];
                        }
                        if (_this.result_t1_1[i] - tempMin <= 0) {
                            tempMin = _this.result_t1_1[i];
                        }
                    }
                    if (tempMax == 0) {
                        _this.highest2 = "-";
                    }
                    else {
                        _this.highest2 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest2 = "-";
                    }
                    else {
                        _this.lowest2 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i = 0; i < _this.result_t1_2.length; i++) {
                        if (i == 0) {
                            tempMax = _this.result_t1_2[i];
                            tempMin = _this.result_t1_2[i];
                        }
                        if (_this.result_t1_2[i] - tempMax >= 0)
                            tempMax = _this.result_t1_2[i];
                        if (_this.result_t1_2[i] - tempMin <= 0)
                            tempMin = _this.result_t1_2[i];
                    }
                    if (tempMax == 0) {
                        _this.highest3 = "-";
                    }
                    else {
                        _this.highest3 = tempMax;
                    }
                    if (tempMin == 0) {
                        _this.lowest3 = "-";
                    }
                    else {
                        _this.lowest3 = tempMin;
                    }
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    if (_this.ratio1 != 0) {
                        tempMax += _this.ratio1;
                        tempMin++;
                    }
                    if (_this.ratio2 != 0) {
                        tempMax += _this.ratio2;
                        tempMin++;
                    }
                    if (_this.ratio3 != 0) {
                        tempMax += _this.ratio3;
                        tempMin++;
                    }
                    if (tempMin == 0)
                        _this.average_t1 = 0;
                    else
                        _this.average_t1 = (tempMax) / tempMin;
                    _this.result_t2_0 = JSON.parse(data.rows.item(0).t2_1);
                    if (_this.result_t2_0.length > 0) {
                        _this.average_t2_1 = Math.round(((_this.result_t2_0[0] - _this.result_t2_0[1]) +
                            (_this.result_t2_0[2] - _this.result_t2_0[3]) +
                            (_this.result_t2_0[4] - _this.result_t2_0[5]) +
                            (_this.result_t2_0[6] - _this.result_t2_0[7]) +
                            (_this.result_t2_0[8] - _this.result_t2_0[9]) +
                            (_this.result_t2_0[10] - _this.result_t2_0[11])) / 6);
                    }
                    var temp = 0;
                    var count = 0;
                    if (_this.average_t2_1 > 0) {
                        temp += _this.average_t2_1;
                        count++;
                    }
                    if (count == 0)
                        _this.average_t2 = 0;
                    else {
                        _this.average_t2 = Math.round(temp / count);
                    }
                    _this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);
                    if (_this.result_t3_1.length > 0) {
                        _this.average_t3 = Math.abs(_this.result_t3_1[1] - _this.result_t3_1[3]);
                    }
                    else {
                        _this.average_t3 = 0;
                    }
                    _this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);
                    if (_this.result_t4_1.length > 0) {
                        _this.average_RRI = _this.result_t4_1[1] / _this.result_t4_1[0];
                    }
                    _this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);
                    if (_this.result_t4_2.length > 0) {
                        var min = _this.result_t4_2[2];
                        if (_this.result_t4_2[4] < min)
                            min = _this.result_t4_2[4];
                        if (_this.result_t4_2[6] < min)
                            min = _this.result_t4_2[6];
                        _this.average_t4 = Math.abs(min - _this.result_t4_2[0]);
                    }
                    else {
                        _this.average_t4 = 0;
                    }
                    _this.result = JSON.parse(data.rows.item(0).t3_1);
                    if (_this.result.length > 0) {
                        _this.up1 = _this.result[0];
                        _this.down1 = _this.result[1];
                        _this.up2 = _this.result[2];
                        _this.down2 = _this.result[3];
                        _this.up3 = _this.result[4];
                        _this.down3 = _this.result[5];
                        _this.up4 = _this.result[6];
                        _this.down4 = _this.result[7];
                        _this.up5 = _this.result[8];
                        _this.down5 = _this.result[9];
                        _this.up6 = _this.result[10];
                        _this.down6 = _this.result[11];
                        var max = _this.down2;
                        if (_this.down3 > max)
                            max = _this.down3;
                        if (_this.down4 > max)
                            max = _this.down4;
                        if (_this.down5 > max)
                            max = _this.down5;
                        if (_this.down6 > max)
                            max = _this.down6;
                        _this.average_t3 = Math.abs(max - _this.down1);
                    }
                    else {
                        _this.average_t3 = 0;
                    }
                    var diffTime = __WEBPACK_IMPORTED_MODULE_13_moment___default()().diff(_this.patient_created, 'seconds', false);
                    var duration = __WEBPACK_IMPORTED_MODULE_13_moment___default.a.duration(diffTime, 'seconds');
                    if (duration.seconds() < 10) {
                        _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                    }
                    else {
                        _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                    }
                    _this.task = setInterval(function () {
                        var diffTime = __WEBPACK_IMPORTED_MODULE_13_moment___default()().diff(_this.patient_created, 'seconds', false);
                        var duration = __WEBPACK_IMPORTED_MODULE_13_moment___default.a.duration(diffTime, 'seconds');
                        if (duration.seconds() < 10) {
                            _this.patient_elapsed = duration.minutes().toString() + ":0" + duration.seconds().toString();
                        }
                        else {
                            _this.patient_elapsed = duration.minutes().toString() + ":" + duration.seconds().toString();
                        }
                    }, 1000);
                });
            });
        });
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 1000);
        /*this.BPready = true;
        this.Gripready = true;
        */
    }
    Test3Page_1 = Test3Page;
    Test3Page.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            _this.BPready = true;
        }, function () {
            _this.BPready = false;
            _this.ble.scan([], 3).subscribe(function (device) {
                _this.ble.connect('9ADE4682-C753-3B3A-7454-50123794CAF4').subscribe(function (data) {
                    _this.BPready = true;
                }, function (error) {
                    console.log(error);
                });
            });
        });
        this.ble.isConnected('58A8CA24-F894-D922-0462-A287BE6D53FE').then(function () {
            _this.Gripready = true;
        }, function () {
            _this.Gripready = false;
            _this.ble.scan([], 3).subscribe(function (device) {
                _this.ble.connect('58A8CA24-F894-D922-0462-A287BE6D53FE').subscribe(function (data) {
                    _this.Gripready = true;
                }, function (error) {
                    console.log(error);
                });
            });
        });
    };
    Test3Page.prototype.clickPage = function (a) {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.task);
        if (a == 0)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__testStart_testStart__["a" /* TestStartPage */], {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(Test3Page_1, {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test5_test5__["a" /* Test5Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    Test3Page.prototype.loadConfig = function () {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.task);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__testConfig_testConfig__["a" /* TestConfigPage */], { parent: Test3Page_1 }, { animate: true, direction: 'forward' });
    };
    Test3Page.prototype.enterTest = function () {
        clearInterval(this.checkDeviceTask);
        clearInterval(this.task);
        this.datab.close();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__test3detail_test3detail__["a" /* Test3DetailPage */], {}, { animate: false, direction: 'forward' });
        //this.navCtrl.setRoot(Test4DetailPage_2, {}, {animate: false, direction: 'forward'});
    };
    Test3Page = Test3Page_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test3',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test3/test3.html"*/'\n<ion-content text-center no-bounce>\n\n                <ion-fab right bottom>\n                    <button ion-fab large color="white" style="box-shadow:0 0 40px #888" (click)="loadConfig()">\n                      <img src="images/gear.png">\n                    </button>\n                  </ion-fab>\n                \n            \n            <div style="text-align: left;width:40%; height:100%;background:#fafafa;box-shadow:0px 20px 40px 0 #888; float:left; color:rgb(46,138,212);z-index:99; position:relative">\n            \n                <table cellspacing=0 cellpadding=0 border=0 style=" width:100%;font-size:1.5em;color:#444">\n                        <tr>\n                        <td style="padding:5px; padding-left:15px; width:70%; font-weight:bold; padding-right:0; padding-bottom:0;">{{patient_name}}&nbsp;</td>\n                        <td rowspan="2" style=" font-size:2.5em;vertical-align:top;padding:5px;text-align: right">&nbsp;{{patient_age}}</td>\n                        </tr>\n                        <tr><td style="padding:5px; padding-left:15px;padding-right:0; padding-top: 0;"><span *ngIf="patient_elapsed !=\'0:00\'">{{patient_created}} ({{patient_elapsed}})</span>&nbsp;</td></tr>\n                        </table>  \n            \n            <div (tap)="clickPage(1)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%; padding:10px; height:100px; margin-bottom:0%;">\n                    <div style="font-size: 1.75em; color:#444">Valsalva Maneuver</div>\n                    <div style="font-size: 3em ; text-align:center ;width:100%">\n                            <span *ngIf="average_t1>0"> {{average_t1 | number:\'1.2-2\'}}</span>\n                            <span *ngIf="average_t1==0">-</span>\n            </div>                    \n        </div>\n                    \n                    \n                    <div (tap)="clickPage(2)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n                    <div style="font-size: 1.75em; color:#444">Deep Breathing</div>\n                    <div style="font-size: 3em ; text-align:center ;width:100%"><span *ngIf="average_t2!=0">{{average_t2}} bpm</span>\n                    <span *ngIf="average_t2==0">-</span>\n                    </div>\n                    </div>\n                    \n                    <div (tap)="clickPage(3)" style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n                    <div style="font-size: 1.75em; color:#444">Sustained Handgrip</div>\n                    <div style="font-size: 3em ; text-align:center ;width:100%">\n                    <span *ngIf="average_t3!=0">{{average_t3}} mmHg</span>\n                    <span *ngIf="average_t3==0">-</span>\n                    </div>\n                    </div>\n                    \n                    \n                    <div (tap)="clickPage(4)"  style="border:1px solid rgb(46,138,212); border-radius:10px; margin:7%; width:86%;  padding:10px; height:100px;margin-bottom:0%;">\n                    <div style="font-size: 1.75em; color:#444">30:15 Ratio &amp; Orthostasis</div>\n                    <div style="font-size: 3em ; text-align:center ;width:100%">\n                            <span *ngIf="average_RRI!=0">{{average_RRI | number:\'1.2-2\'}}</span>\n                            <span *ngIf="average_RRI==0">-</span> | <span *ngIf="average_t4!=0">{{average_t4}} mmHg</span>\n                            <span *ngIf="average_t4==0">-</span>\n                    </div>\n                    </div>\n            <BR><BR><BR><BR>\n            <div (tap)="clickPage(6)" style="border:1px solid rgb(46,138,212); border-radius:50px; margin-left:27%; width:170px; padding:7px; font-size: 1.5em; color:rgb(46,138,212);text-align:center;">\n                COMPLETE\n            </div>\n            \n            </div>\n                \n             <div style="width:60%; height:100%; float:right; background-color:rgb(240, 240, 240);">\n            \n            \n            <table cellspacing=0 cellpadding=0 border=0 style="font-family: \'Calibri\'; margin:15%; margin-bottom:2%;margin-left:12%;width:70%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n            <tr> \n            <td style="padding-left:10px;font-size:4em; font-weight:bold;width:65%; text-align:left;">Sustained<BR>Handgrip</td>\n            <td style="padding-top:12px"><BR><BR><BR>\n            <div *ngIf="(Gripready && BPready)" (tap)="enterTest()" style="border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n            <div style="font-size: 1.5em; color:rgb(46,138,212);text-align:center; width:100%">BEGIN</div>\n            </div>\n            <div *ngIf="!(Gripready && BPready)"  style="border:1px solid rgb(190,190,190); border-radius:75px; width:150px ;  padding:7px; padding-bottom:5px;">\n                    <div style="font-size: 1.5em; color:rgb(190,190,190);text-align:center; width:100%">BEGIN</div>\n                    </div>\n            </td>\n            </table>  \n            <div style="padding:15%; padding-top:0; padding-bottom:0; padding-left:12%;">\n            <ion-slides style="width:100%;" >\n            \n                    <ion-slide style="font-size:2.5em; text-align:left" *ngIf="result.length==0">\n                        <div style="text-align:left">\nNo Record\n</div>\n                </ion-slide>\n\n                    <ion-slide style="font-size:2em; " *ngIf="result.length>0">\n                        <div style="text-align: left"><BR>\n                                <div style="font-size:1.5em ; text-align:left;color:rgb(46,138,212)" colspan="4">Difference in Diastolic</div>\n                                &nbsp;&nbsp;{{average_t3}} mmHg &nbsp;\n                        <span *ngIf="average_t3>=16" style="color:rgba(112,173,71,1); font-weight:bold">NORMAL</span>\n                        <span *ngIf="average_t3<=15 && average_t3>= 11" style="color:rgba(255,192,0,1); font-weight:bold">BORDERLINE</span>\n                        <span *ngIf="average_t3<=10 && result.length>0" style="color:rgba(237,125,49,1); font-weight:bold">ABNORMAL</span>  \n                        <BR><BR>\n\n\n                                <table border=0 style="width: 100%;">\n                                                <tr>\n                                                <td style="width: 35%">\n                                                Baseline\n                                                </td><td style="width: 15%">\n                                                <span style="color:rgb(46,138,212); font-weight:bold">{{down1}}</span>\n                                                </td>\n                                                <td style="width: 50%"></td>\n                                                </tr>\n                                                <tr>\n                                                <td style="width: 35%">\n                                                1<sup>st</sup> Minute        </td><td style="width: 25%">\n                                                <span style="color:rgb(46,138,212); font-weight:bold">{{down2}}</span>\n                                                </td>\n                                                <td style="width: 35%">\n                                                4<sup>th</sup> Minute        </td><td style="width: 25%">\n                                                <span style="color:rgb(46,138,212); font-weight:bold">{{down5}}</span>\n                                                </td>\n                                                </tr>\n                                                \n                                                <tr>\n                                                <td style="width: 35%">\n                                                2<sup>nd</sup> Minute</td><td style="width: 25%">\n                                                <span style="color:rgb(46,138,212); font-weight:bold">{{down3}}</span>\n                                                </td>\n                                                <td style="width: 35%">\n                                                                5<sup>th</sup> Minute        </td><td style="width: 25%">\n                                                                <span style="color:rgb(46,138,212); font-weight:bold">{{down6}}</span>\n                                                                </td>\n                                                </tr>\n\n                                                <tr>\n                                                                <td style="width: 35%">\n                                                                3<sup>rd</sup> Minute</td><td style="width: 25%">\n                                                                <span style="color:rgb(46,138,212); font-weight:bold">{{down4}}</span>\n                                                                </td>\n                                                                <td style="width: 35%"></td><td style="width: 25%"></td>\n                                                                </tr>\n                                                </table> \n<!--\n                                <table cellspading=0 cellpadding=0 border=0 style="margin-top:10px; margin-left:10px; width:100%; font-size:1em">\n                                                <tr>\n                                                        <td style="width: 20%">Base</td><td style="width: 30%">{{up1}}/{{down1}}</td>\n                                                        <td style="width: 20%">3<sup>rd</sup></td><td style="width: 30%">{{up4}}/{{down4}}</td>\n                                                </tr>\n                                                <tr>\n                                                        <td style="width: 20%">1<sup>st</sup></td><td style="width: 30%">{{up2}}/{{down2}}</td>\n                                                        <td style="width: 20%">4<sup>th</sup></td><td style="width: 30%">{{up5}}/{{down5}}</td>\n                                                </tr>\n                                                <tr>\n                                                        <td style="width: 20%">2<sup>nd</sup></td><td style="width: 30%">{{up3}}/{{down3}}</td>\n                                                        <td style="width: 20%">5<sup>th</sup></td><td style="width: 30%">{{up6}}/{{down6}}</td>\n                                                </tr>\n                                                    </table>\n                                                -->\n\n</div>\n                            </ion-slide>\n                      </ion-slides>\n                                </div>\n            \n            </div>\n            \n            \n            \n            </ion-content>\n            '/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test3/test3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test3Page);
    return Test3Page;
    var Test3Page_1;
}());

//# sourceMappingURL=test3.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestEndPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_email_composer__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_clipboard__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var TestEndPage = (function () {
    //------------
    function TestEndPage(storage, sqlite, alertCtrl, clipboard, emailComposer, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.clipboard = clipboard;
        this.emailComposer = emailComposer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datas = [];
        this.selected = false;
        //------1---------
        this.result1_1 = [];
        this.result1_2 = [];
        this.result1_3 = [];
        this.highest1 = 0;
        this.highest2 = 0;
        this.highest3 = 0;
        this.lowest1 = 0;
        this.lowest2 = 0;
        this.lowest3 = 0;
        this.ratio1 = 0;
        this.ratio2 = 0;
        this.ratio3 = 0;
        //-------2------------
        this.result2_1 = [];
        this.result2_2 = [];
        this.result2_3 = [];
        //--------3----------
        this.result3_1 = [];
        //--------4----------
        this.result4_1 = [];
        //--------4b----------
        this.result4b_1 = [];
        //------------
        this.result_t1_0 = [];
        this.result_t1_1 = [];
        this.result_t1_2 = [];
        this.result_t2_0 = [];
        this.result_t2_1 = [];
        this.result_t2_2 = [];
        this.result_t3_1 = [];
        this.result_t4_1 = [];
        this.result_t4_2 = [];
        this.average_t2_1 = 0;
        this.average_t2_2 = 0;
        this.average_t2_3 = 0;
        this.up1 = 0;
        this.down1 = 0;
        this.up2 = 0;
        this.down2 = 0;
        this.up3 = 0;
        this.down3 = 0;
        this.up4 = 0;
        this.down4 = 0;
        this.RRI15 = 0;
        this.RRI30 = 0;
        this.average_RRI = 0;
        this.hide1 = false;
        this.hide2 = false;
        this.hide3 = false;
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            _this.datab.executeSql("select * from patient_table  order by id desc;", {})
                .then(function (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    var tem1 = 0;
                    var tem2 = 0;
                    var tem3 = 0;
                    var tem4 = 0;
                    var tem5 = 0;
                    _this.ratio1 = 0;
                    _this.ratio2 = 0;
                    _this.ratio3 = 0;
                    // start test1 data 
                    _this.result1_1 = JSON.parse(data.rows.item(i).t1_1);
                    _this.result1_2 = JSON.parse(data.rows.item(i).t1_2);
                    _this.result1_3 = JSON.parse(data.rows.item(i).t1_3);
                    var tempMax = 0;
                    var tempMin = 0;
                    for (var i_1 = 0; i_1 < _this.result1_1.length; i_1++) {
                        if (i_1 == 0) {
                            tempMax = _this.result1_1[i_1];
                            tempMin = _this.result1_1[i_1];
                        }
                        if (_this.result1_1[i_1] - tempMax >= 0)
                            tempMax = _this.result1_1[i_1];
                        if (_this.result1_1[i_1] - tempMin <= 0)
                            tempMin = _this.result1_1[i_1];
                    }
                    _this.highest1 = tempMax;
                    _this.lowest1 = tempMin;
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i_2 = 0; i_2 < _this.result1_2.length; i_2++) {
                        if (i_2 == 0) {
                            tempMax = _this.result1_2[i_2];
                            tempMin = _this.result1_2[i_2];
                        }
                        if (_this.result1_2[i_2] - tempMax >= 0) {
                            tempMax = _this.result1_2[i_2];
                        }
                        if (_this.result1_2[i_2] - tempMin <= 0) {
                            tempMin = _this.result1_2[i_2];
                        }
                    }
                    _this.highest2 = tempMax;
                    _this.lowest2 = tempMin;
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    for (var i_3 = 0; i_3 < _this.result1_3.length; i_3++) {
                        if (i_3 == 0) {
                            tempMax = _this.result1_3[i_3];
                            tempMin = _this.result1_3[i_3];
                        }
                        if (_this.result1_3[i_3] - tempMax >= 0)
                            tempMax = _this.result1_3[i_3];
                        if (_this.result1_3[i_3] - tempMin <= 0)
                            tempMin = _this.result1_3[i_3];
                    }
                    _this.highest3 = tempMax;
                    _this.lowest3 = tempMin;
                    if (tempMin > 0 && tempMax > 0)
                        _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
                    tempMax = 0;
                    tempMin = 0;
                    if (_this.ratio1 != 0) {
                        tempMax += _this.ratio1;
                        tempMin++;
                    }
                    if (_this.ratio2 != 0) {
                        tempMax += _this.ratio2;
                        tempMin++;
                    }
                    if (_this.ratio3 != 0) {
                        tempMax += _this.ratio3;
                        tempMin++;
                    }
                    if (tempMin == 0)
                        tem1 = 0;
                    else
                        tem1 = (tempMax) / tempMin;
                    // end test1 data 
                    // start test2 data 
                    _this.result2_1 = JSON.parse(data.rows.item(i).t2_1);
                    var valid_test = 0;
                    var sum = 0;
                    if (_this.result2_1.length > 0) {
                        valid_test++;
                        sum += Math.round(((_this.result2_1[0] - _this.result2_1[1]) +
                            (_this.result2_1[2] - _this.result2_1[3]) +
                            (_this.result2_1[4] - _this.result2_1[5]) +
                            (_this.result2_1[6] - _this.result2_1[7]) +
                            (_this.result2_1[8] - _this.result2_1[9]) +
                            (_this.result2_1[10] - _this.result2_1[11])) / 6);
                    }
                    if (valid_test == 0)
                        tem2 = 0;
                    else {
                        tem2 = Math.round(sum / valid_test);
                    }
                    // end test2 data 
                    // start test3 data
                    _this.result3_1 = JSON.parse(data.rows.item(i).t3_1);
                    if (_this.result3_1.length > 0) {
                        var max = _this.result3_1[3];
                        if (_this.result3_1[5] > max)
                            max = _this.result3_1[5];
                        if (_this.result3_1[7] > max)
                            max = _this.result3_1[7];
                        if (_this.result3_1[9] > max)
                            max = _this.result3_1[9];
                        if (_this.result3_1[11] > max)
                            max = _this.result3_1[11];
                        console.log(max, _this.result3_1[1]);
                        tem3 = max - _this.result3_1[1];
                    }
                    else {
                        tem3 = 0;
                    }
                    // end test3 data 
                    // start test4 data
                    _this.result4_1 = JSON.parse(data.rows.item(i).t4_1);
                    if (_this.result4_1.length > 0) {
                        tem4 = _this.result4_1[1] / _this.result4_1[0];
                    }
                    else {
                        tem4 = 0;
                    }
                    // end test4 data 
                    // start test4b data
                    _this.result4b_1 = JSON.parse(data.rows.item(0).t4_2);
                    if (_this.result4b_1.length > 0) {
                        var min = _this.result4b_1[2];
                        if (_this.result4b_1[4] < min)
                            min = _this.result4b_1[4];
                        if (_this.result4b_1[6] < min)
                            min = _this.result4b_1[6];
                        tem5 = Math.abs(min - _this.result4b_1[0]);
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
                    _this.datas.push({
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
    TestEndPage_1 = TestEndPage;
    TestEndPage.prototype.onInput = function (a) {
        this.searchAllRecord();
    };
    TestEndPage.prototype.onCancel = function (a) {
        this.searchAllRecord();
    };
    TestEndPage.prototype.showPatient = function (id) {
        var _this = this;
        console.log(id);
        this.datab.executeSql("select * from patient_table where id = " + id + ";", {})
            .then(function (data) {
            _this.hide1 = false;
            _this.hide2 = false;
            _this.hide3 = false;
            _this.patient_name = data.rows.item(0).name;
            _this.patient_age = data.rows.item(0).age;
            _this.patient_time = data.rows.item(0).createTime;
            _this.ratio1 = 0;
            _this.ratio2 = 0;
            _this.ratio3 = 0;
            _this.result_t1_0 = JSON.parse(data.rows.item(0).t1_1);
            _this.result_t1_1 = JSON.parse(data.rows.item(0).t1_2);
            _this.result_t1_2 = JSON.parse(data.rows.item(0).t1_3);
            var tempMax = 0;
            var tempMin = 0;
            for (var i = 0; i < _this.result_t1_0.length; i++) {
                if (i == 0) {
                    tempMax = _this.result_t1_0[i];
                    tempMin = _this.result_t1_0[i];
                }
                if (_this.result_t1_0[i] - tempMax >= 0)
                    tempMax = _this.result_t1_0[i];
                if (_this.result_t1_0[i] - tempMin <= 0)
                    tempMin = _this.result_t1_0[i];
            }
            if (tempMax == 0) {
                _this.highest1 = "-";
            }
            else {
                _this.highest1 = tempMax;
            }
            if (tempMin == 0) {
                _this.lowest1 = "-";
            }
            else {
                _this.lowest1 = tempMin;
            }
            if (tempMin > 0 && tempMax > 0)
                _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
            else {
                _this.ratio1 = 0;
            }
            tempMax = 0;
            tempMin = 0;
            for (var i = 0; i < _this.result_t1_1.length; i++) {
                if (i == 0) {
                    tempMax = _this.result_t1_1[i];
                    tempMin = _this.result_t1_1[i];
                }
                if (_this.result_t1_1[i] - tempMax >= 0) {
                    tempMax = _this.result_t1_1[i];
                }
                if (_this.result_t1_1[i] - tempMin <= 0) {
                    tempMin = _this.result_t1_1[i];
                }
            }
            if (tempMax == 0) {
                _this.highest2 = "-";
            }
            else {
                _this.highest2 = tempMax;
            }
            if (tempMin == 0) {
                _this.lowest2 = "-";
            }
            else {
                _this.lowest2 = tempMin;
            }
            if (tempMin > 0 && tempMax > 0)
                _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
            else {
                _this.ratio2 = 0;
            }
            tempMax = 0;
            tempMin = 0;
            for (var i = 0; i < _this.result_t1_2.length; i++) {
                if (i == 0) {
                    tempMax = _this.result_t1_2[i];
                    tempMin = _this.result_t1_2[i];
                }
                if (_this.result_t1_2[i] - tempMax >= 0)
                    tempMax = _this.result_t1_2[i];
                if (_this.result_t1_2[i] - tempMin <= 0)
                    tempMin = _this.result_t1_2[i];
            }
            if (tempMax == 0) {
                _this.highest3 = "-";
            }
            else {
                _this.highest3 = tempMax;
            }
            if (tempMin == 0) {
                _this.lowest3 = "-";
            }
            else {
                _this.lowest3 = tempMin;
            }
            if (tempMin > 0 && tempMax > 0)
                _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
            else {
                _this.ratio3 = 0;
            }
            tempMax = 0;
            tempMin = 0;
            if (_this.ratio1 != 0) {
                tempMax += _this.ratio1;
                tempMin++;
            }
            if (_this.ratio2 != 0) {
                tempMax += _this.ratio2;
                tempMin++;
            }
            if (_this.ratio3 != 0) {
                tempMax += _this.ratio3;
                tempMin++;
            }
            if (tempMin == 0)
                _this.average_t1 = 0;
            else
                _this.average_t1 = (tempMax) / tempMin;
            _this.result_t2_0 = JSON.parse(data.rows.item(0).t2_1);
            _this.result_t2_1 = JSON.parse(data.rows.item(0).t2_2);
            _this.result_t2_2 = JSON.parse(data.rows.item(0).t2_3);
            if (_this.result_t2_0.length > 0) {
                _this.average_t2_1 = Math.round(((_this.result_t2_0[0] - _this.result_t2_0[1]) +
                    (_this.result_t2_0[2] - _this.result_t2_0[3]) +
                    (_this.result_t2_0[4] - _this.result_t2_0[5]) +
                    (_this.result_t2_0[6] - _this.result_t2_0[7]) +
                    (_this.result_t2_0[8] - _this.result_t2_0[9]) +
                    (_this.result_t2_0[10] - _this.result_t2_0[11])) / 6);
            }
            var temp = 0;
            var count = 0;
            if (_this.average_t2_1 > 0) {
                temp += _this.average_t2_1;
                count++;
            }
            if (count == 0)
                _this.average_t2 = 0;
            else {
                _this.average_t2 = Math.round(temp / count);
            }
            console.log(JSON.stringify(_this.result_t2_0));
            _this.result_t3_1 = JSON.parse(data.rows.item(0).t3_1);
            if (_this.result_t3_1.length > 0) {
                _this.t3_up1 = _this.result_t3_1[0];
                _this.t3_down1 = _this.result_t3_1[1];
                _this.t3_up2 = _this.result_t3_1[2];
                _this.t3_down2 = _this.result_t3_1[3];
                _this.t3_up3 = _this.result_t3_1[4];
                _this.t3_down3 = _this.result_t3_1[5];
                _this.t3_up4 = _this.result_t3_1[6];
                _this.t3_down4 = _this.result_t3_1[7];
                _this.t3_up5 = _this.result_t3_1[8];
                _this.t3_down5 = _this.result_t3_1[9];
                _this.t3_up6 = _this.result_t3_1[10];
                _this.t3_down6 = _this.result_t3_1[11];
                var max = _this.result_t3_1[3];
                if (_this.result_t3_1[5] > max)
                    max = _this.result_t3_1[5];
                if (_this.result_t3_1[7] > max)
                    max = _this.result_t3_1[7];
                if (_this.result_t3_1[9] > max)
                    max = _this.result_t3_1[9];
                if (_this.result_t3_1[11] > max)
                    max = _this.result_t3_1[11];
                _this.average_t3 = max - _this.result_t3_1[1];
            }
            else {
                _this.average_t3 = 0;
            }
            _this.result_t4_1 = JSON.parse(data.rows.item(0).t4_1);
            if (_this.result_t4_1.length > 0) {
                _this.RRI15 = _this.result_t4_1[0];
                _this.RRI30 = _this.result_t4_1[1];
                _this.average_RRI = _this.result_t4_1[1] / _this.result_t4_1[0];
            }
            _this.result_t4_2 = JSON.parse(data.rows.item(0).t4_2);
            if (_this.result_t4_2.length > 0) {
                _this.up1 = _this.result_t4_2[0];
                _this.down1 = _this.result_t4_2[1];
                _this.up2 = _this.result_t4_2[2];
                _this.down2 = _this.result_t4_2[3];
                _this.up3 = _this.result_t4_2[4];
                _this.down3 = _this.result_t4_2[5];
                _this.up4 = _this.result_t4_2[6];
                _this.down4 = _this.result_t4_2[7];
                var min = _this.up2;
                if (_this.up3 < min)
                    min = _this.up3;
                if (_this.up4 < min)
                    min = _this.up4;
                _this.average_t4 = Math.abs(min - _this.up1);
            }
            else {
                _this.average_t4 = 0;
            }
            setTimeout(function () {
                _this.slideew.slideTo(0, 0);
                _this.slideew.update();
                console.log(_this.ratio1, _this.ratio2, _this.ratio3);
                if (_this.ratio1 != 0) {
                    _this.lineChart = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.lineCanvas.nativeElement, {
                        type: 'line',
                        options: { legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                        display: true
                                    }]
                            }
                        },
                        data: {
                            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
                                    data: _this.result_t1_0,
                                    spanGaps: true
                                }
                            ]
                        }
                    });
                }
                else {
                    _this.hide1 = true;
                }
                if (_this.ratio2 != 0) {
                    _this.lineChart2 = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.lineCanvas2.nativeElement, {
                        type: 'line',
                        options: { legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                        display: true
                                    }]
                            }
                        },
                        data: {
                            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
                                    pointBackgroundColor: "rgba(255,192,0,1)",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(255,192,0,1)",
                                    pointHoverBorderColor: "rgba(255,192,0,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: _this.result_t1_1,
                                    spanGaps: true,
                                }
                            ]
                        }
                    });
                }
                else {
                    _this.hide2 = true;
                }
                if (_this.ratio3 != 0) {
                    _this.lineChart3 = new __WEBPACK_IMPORTED_MODULE_10_chart_js__["Chart"](_this.lineCanvas3.nativeElement, {
                        type: 'line',
                        options: { legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                        display: true
                                    }]
                            }
                        },
                        data: {
                            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
                                    data: _this.result_t1_2,
                                    spanGaps: true,
                                }
                            ]
                        }
                    });
                }
                else {
                    _this.hide3 = true;
                }
            }, 500);
        });
        this.selected = true;
    };
    TestEndPage.prototype.searchAllRecord = function () {
        var _this = this;
        var query = "select * from patient_table order by id desc";
        if (this.searchInput != "") {
            query = "select * from patient_table where name like '%" + this.searchInput + "%'\n   OR  age like '%" + this.searchInput + "%'  order by id desc;";
        }
        this.datab.executeSql(query, {})
            .then(function (data) {
            _this.datas = [];
            for (var i = 0; i < data.rows.length; i++) {
                var tem1 = 0;
                var tem2 = 0;
                var tem3 = 0;
                var tem4 = 0;
                var tem5 = 0;
                _this.ratio1 = 0;
                _this.ratio2 = 0;
                _this.ratio3 = 0;
                // start test1 data 
                _this.result1_1 = JSON.parse(data.rows.item(i).t1_1);
                _this.result1_2 = JSON.parse(data.rows.item(i).t1_2);
                _this.result1_3 = JSON.parse(data.rows.item(i).t1_3);
                var tempMax = 0;
                var tempMin = 0;
                for (var i_4 = 0; i_4 < _this.result1_1.length; i_4++) {
                    if (i_4 == 0) {
                        tempMax = _this.result1_1[i_4];
                        tempMin = _this.result1_1[i_4];
                    }
                    if (_this.result1_1[i_4] - tempMax >= 0)
                        tempMax = _this.result1_1[i_4];
                    if (_this.result1_1[i_4] - tempMin <= 0)
                        tempMin = _this.result1_1[i_4];
                }
                _this.highest1 = tempMax;
                _this.lowest1 = tempMin;
                if (tempMin > 0 && tempMax > 0)
                    _this.ratio1 = (tempMax * 1.0) / (tempMin * 1.0);
                tempMax = 0;
                tempMin = 0;
                for (var i_5 = 0; i_5 < _this.result1_2.length; i_5++) {
                    if (i_5 == 0) {
                        tempMax = _this.result1_2[i_5];
                        tempMin = _this.result1_2[i_5];
                    }
                    if (_this.result1_2[i_5] - tempMax >= 0) {
                        tempMax = _this.result1_2[i_5];
                    }
                    if (_this.result1_2[i_5] - tempMin <= 0) {
                        tempMin = _this.result1_2[i_5];
                    }
                }
                _this.highest2 = tempMax;
                _this.lowest2 = tempMin;
                if (tempMin > 0 && tempMax > 0)
                    _this.ratio2 = (tempMax * 1.0) / (tempMin * 1.0);
                tempMax = 0;
                tempMin = 0;
                for (var i_6 = 0; i_6 < _this.result1_3.length; i_6++) {
                    if (i_6 == 0) {
                        tempMax = _this.result1_3[i_6];
                        tempMin = _this.result1_3[i_6];
                    }
                    if (_this.result1_3[i_6] - tempMax >= 0)
                        tempMax = _this.result1_3[i_6];
                    if (_this.result1_3[i_6] - tempMin <= 0)
                        tempMin = _this.result1_3[i_6];
                }
                _this.highest3 = tempMax;
                _this.lowest3 = tempMin;
                if (tempMin > 0 && tempMax > 0)
                    _this.ratio3 = (tempMax * 1.0) / (tempMin * 1.0);
                tempMax = 0;
                tempMin = 0;
                if (_this.ratio1 != 0) {
                    tempMax += _this.ratio1;
                    tempMin++;
                }
                if (_this.ratio2 != 0) {
                    tempMax += _this.ratio2;
                    tempMin++;
                }
                if (_this.ratio3 != 0) {
                    tempMax += _this.ratio3;
                    tempMin++;
                }
                if (tempMin == 0)
                    tem1 = 0;
                else
                    tem1 = (tempMax) / tempMin;
                // end test1 data 
                // start test2 data 
                _this.result2_1 = JSON.parse(data.rows.item(i).t2_1);
                var valid_test = 0;
                var sum = 0;
                if (_this.result2_1.length > 0) {
                    valid_test++;
                    sum += Math.round(((_this.result2_1[0] - _this.result2_1[1]) +
                        (_this.result2_1[2] - _this.result2_1[3]) +
                        (_this.result2_1[4] - _this.result2_1[5]) +
                        (_this.result2_1[6] - _this.result2_1[7]) +
                        (_this.result2_1[8] - _this.result2_1[9]) +
                        (_this.result2_1[10] - _this.result2_1[11])) / 6);
                }
                if (valid_test == 0)
                    tem2 = 0;
                else {
                    tem2 = Math.round(sum / valid_test);
                }
                // end test2 data 
                // start test3 data
                _this.result3_1 = JSON.parse(data.rows.item(i).t3_1);
                if (_this.result3_1.length > 0) {
                    var max = _this.result3_1[3];
                    if (_this.result3_1[5] > max)
                        max = _this.result3_1[5];
                    if (_this.result3_1[7] > max)
                        max = _this.result3_1[7];
                    if (_this.result3_1[9] > max)
                        max = _this.result3_1[9];
                    if (_this.result3_1[11] > max)
                        max = _this.result3_1[11];
                    console.log(max, _this.result3_1[1]);
                    tem3 = max - _this.result3_1[1];
                }
                else {
                    tem3 = 0;
                }
                // end test3 data 
                // start test4 data
                _this.result4_1 = JSON.parse(data.rows.item(i).t4_1);
                if (_this.result4_1.length > 0) {
                    tem4 = _this.result4_1[1] / _this.result4_1[0];
                }
                else {
                    tem4 = 0;
                }
                // end test4 data 
                // start test4b data
                _this.result4b_1 = JSON.parse(data.rows.item(0).t4_2);
                if (_this.result4b_1.length > 0) {
                    var min = _this.result4b_1[2];
                    if (_this.result4b_1[4] < min)
                        min = _this.result4b_1[4];
                    if (_this.result4b_1[6] < min)
                        min = _this.result4b_1[6];
                    tem5 = Math.abs(min - _this.result4b_1[0]);
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
                _this.datas.push({
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
    };
    TestEndPage.prototype.clickPage = function (a) {
        if (a == 0)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__testStart_testStart__["a" /* TestStartPage */], {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__test5_test5__["a" /* Test5Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(TestEndPage_1, {}, { animate: false, direction: 'forward' });
        else if (a == 9)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */], {}, { animate: false, direction: 'forward' });
    };
    TestEndPage.prototype.loadConfig = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__testConfig_testConfig__["a" /* TestConfigPage */], {});
    };
    TestEndPage.prototype.copy_csv = function () {
        var dataCSV = "";
        for (var i = 0; i < this.datas.length; i++) {
            dataCSV += "\"" + this.datas[i].pid + "\"," +
                "\"" + this.datas[i].time + "\"," +
                "\"" + this.datas[i].breath + "\"," +
                "\"" + this.datas[i].hg + "\"," +
                "\"" + this.datas[i].blood + "\"," +
                "\"" + this.datas[i].heartrate + "\"\r\n";
        }
        this.clipboard.copy(dataCSV);
    };
    TestEndPage.prototype.presentPrompt = function () {
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
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], TestEndPage.prototype, "lineCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas2'),
        __metadata("design:type", Object)
    ], TestEndPage.prototype, "lineCanvas2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas3'),
        __metadata("design:type", Object)
    ], TestEndPage.prototype, "lineCanvas3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slidee'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Slides */])
    ], TestEndPage.prototype, "slideew", void 0);
    TestEndPage = TestEndPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-testEnd',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/testEnd/testEnd.html"*/'\n\n<ion-content text-left no-bounce>\n\n        <ion-fab right bottom>\n            <button ion-fab large color="white" style="box-shadow:0 0 40px #888" (click)="clickPage(9)">\n                <ion-icon name="close" style="zoom:2.5"></ion-icon>\n            </button>\n          </ion-fab>\n        \n    \n    <div no-bounce id="contentLeft" style="display:block; text-align: left;width:35%; height:100%;box-shadow:0px 10px 40px 0 #888; float:left; z-index:99; position:relative;overflow:scroll; background:#fafafa; color:rgb(46,138,212)">\n        <ion-searchbar text-left\n        placeholder="" \n        [showCancelButton]="false"\n        [(ngModel)]="searchInput"\n        (ionInput)="onInput($event)"\n        (ionCancel)="onCancel($event)">\n      </ion-searchbar>\n            <ion-list no-bounce style="box-shadow:0px 10px 10px 0 #aaa" >\n                    <ion-item text-wrap *ngFor="let data of datas" (click)="showPatient(data.id)" >\n                        <table style="width: 100%">\n                            <tr>\n                            <td style="font-size: 1.5em; font-weight:normal">{{data.name}} <b>{{data.age}}</b></td>\n                            <td rowspan="2" style="font-size: 3em; text-align:right">{{data.failure}}</td>\n                            </tr>\n                            <tr>\n                            <td>{{data.time}}</td>\n                            </tr>\n                            <tr>\n                            <td colspan="2" style="font-size:1em;font-weight:bold; color:rgb(46,138,212)">\n                             {{data.t1result | number:\'1.2-2\'}} {{data.t2result}}<span style="font-weight:initial; font-size:0.75em">bpm</span> {{data.t3result}}<span style="font-weight:initial; font-size:0.75em">mmHg</span> {{data.t4result | number:\'1.2-2\'}} {{data.t4result2}}<span style="font-weight:initial; font-size:0.75em">mmHg</span></td>\n                            </tr>                \n                    </table>\n                    </ion-item>\n                  </ion-list>\n    </div>\n        \n    <div text-left id="contentRight" style="background:rgb(240, 240, 240);display:block; width:65%; overflow:scroll; height:100%; float:right; padding-top:3%">\n    \n            <div *ngIf="!selected">\n                    <div style="padding-left:40px;font-size:3.5em ; text-align:left; ">Please select patient record.</div>\n                </div>\n        <div *ngIf="selected">\n\n<div style="padding-top: 0%; padding-left:5%;">\n        <b style="font-size: 5em; line-height:0.8em; color:rgb(46,138,212);">{{patient_name}}</b><BR>\n    <span style="font-size: 3em"><b>{{patient_age}}</b><BR>{{patient_time}}</span>\n    </div>\n        \n    \n    \n    <table cellspacing=0 cellpadding=0 border=0 style=" margin:5%; width:90%;margin-bottom:0%; margin-top:4%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n            <tr>\n            <td style="padding-left:10px;font-size:3.25em ;width:75%; text-align:left; font-weight:bold">Valsalva Maneuver</td>\n            <td style="padding-right:10px;font-size:3.25em ;width:25%; text-align:right;color:rgb(46,138,212)" colspan="4">{{average_t1 | number:\'1.2-2\'}}</td>\n            </table>  \n\n    <div style="padding:5%; padding-top:0;">\n                       <BR>\n            <ion-slides style="width:100%; height:200px" #slidee>\n                    <ion-slide style="align-items: flex-start">  \n                            <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:0.8em; color:#444;">\n                                    <tr>\n                                        <td style="padding-left:10px;font-size:2em ;width:5%; text-align:left;">1<sup>st</sup></td>\n                                        <td style="padding-left:10px;font-size:2em ;width:18%; text-align:left;">Trial</td>\n                                    <td style="padding-left:10px;font-size:2em ;width:30%; text-align:left;">{{highest1}}/{{lowest1}}</td>\n                                    <td style="font-weight:bold;padding-left:10px;font-size:2em ;width:15%; text-align:right; color:rgb(46,138,212)">{{ratio1 | number:\'1.2-2\'}}</td>\n                                    <td style="font-weight:bold;padding-left:10px;font-size:2em ;width:32%; text-align:right;">\n                                             <div *ngIf="result_t1_0.length > 0">   \n                                                 <span *ngIf="average_t1 >= 1.21" style="color:rgba(112,173,71,1); font-size:0.8em; font-weight:bold">NORMAL</span>\n                                                        <span *ngIf="average_t1 >= 1.11 && average_t1 < 1.21 " style="color:rgba(255,192,0,1);font-size:0.8em; font-weight:bold">BORDERLINE</span>\n                                                        <span *ngIf="average_t1 > 0 && average_t1 < 1.11" style="color:rgba(237,125,49,1);font-size:0.8em; font-weight:bold">ABNORMAL</span></div>\n                                    </td>\n                               \n                                </tr>\n                                    <tr>\n                                        <td style="padding-left:10px;font-size:2em ; text-align:left;">2<sup>nd</sup></td>\n                                        <td style="padding-left:10px;font-size:2em ; text-align:left;">Trial</td>\n                                    <td style="padding-left:10px;font-size:2em ;text-align:left;">{{highest2}}/{{lowest2}}</td>\n                                    <td style="font-weight:bold;padding-left:10px;font-size:2em ;text-align:right; color:rgb(46,138,212)">{{ratio2 | number:\'1.2-2\'}}</td>\n                                    <td></td>\n                                </tr>\n                                    <tr>\n                                        <td style="padding-left:10px;font-size:2em ;text-align:left;">3<sup>rd</sup></td>\n                                        <td style="padding-left:10px;font-size:2em ;text-align:left;">Trial</td>\n                                    <td style="padding-left:10px;font-size:2em ;text-align:left;">{{highest3}}/{{lowest3}}</td>\n                                    <td style="font-weight:bold;padding-left:10px;font-size:2em ;text-align:right; color:rgb(46,138,212)">{{ratio3 | number:\'1.2-2\'}}</td>\n                                    <td></td>\n                                </tr>\n                                     </table>\n                        </ion-slide>\n\n                    <ion-slide *ngIf="!hide1">\n                        <canvas #lineCanvas  style="width: 100%; height: 200px"></canvas>\n                    </ion-slide>\n                    <ion-slide *ngIf="!hide2">\n                         <canvas #lineCanvas2  style="width: 100%; height: 200px"></canvas>\n                        </ion-slide>\n                        <ion-slide *ngIf="!hide3">\n\n                           <canvas #lineCanvas3  style="width: 100%; height: 200px"></canvas>\n\n                            </ion-slide>\n                </ion-slides>\n        \n\n\n\n    </div> \n\n\n   \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    <table cellspacing=0 cellpadding=0 border=0 style=" margin:5%; width:90%;margin-bottom:2%; margin-top:0%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n            <tr>\n            <td style="padding-left:10px;font-size:3.25em ;width:60%; text-align:left; font-weight:bold">Deep Breathing</td>\n            <td style="padding-right:10px;font-size:3.25em ;width:40%; text-align:right;color:rgb(46,138,212)" colspan="4">{{average_t2}}</td>\n            </table>  \n\n    <div style="padding:5%; padding-top:0;">\n\n     <ion-slides style="width:100%; height:50%;">\n\n            <ion-slide>\n    \n                    <div style="font-size:1.75em ; text-align:left;" *ngIf="result_t2_0.length == 0" >No Record</div>\n                    <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:0.9em; color:#444" *ngIf="result_t2_0.length>0">\n                    <tr>\n                    <td style="padding-left:10px;font-size:1.75em ;width:10%; text-align:left;">1<sup>st</sup></td>\n                    <td style="font-size:1.75em ;width:10%; text-align:left;">Trial</td>\n                    <td style="font-size:1.75em ;width:14%; text-align:right;">{{result_t2_0[0]}}</td>\n                    <td style="font-size:1.75em ;width:6%; text-align:center;">-</td>\n                    <td style="font-size:1.75em ;width:12%; text-align:left;">{{result_t2_0[1]}}</td>\n                    <td style="font-weight:bold; font-size:1.75em ;width:19%; text-align:center; color:rgb(46,138,212)">{{result_t2_0[0] - result_t2_0[1]}}</td>\n                    <td>\n                        <div style="text-align:right; font-size:1.4em" *ngIf="result_t2_0.length > 0">   \n                                        <span *ngIf="average_t2 >=15" style="color:rgba(112,173,71,1); font-weight:bold">NORMAL</span>\n                                        <span *ngIf="average_t2 <=14 && average_t2 >= 11" style="color:rgba(255,192,0,1); font-weight:bold">BORDERLINE</span>\n                                        <span *ngIf="average_t2 <=10 && average_t2 >0" style="color:rgba(237,125,49,1); font-weight:bold">ABNORMAL</span>   </div>\n\n            </td>\n                </tr>\n                    \n                    <tr>\n                    <td style="padding-left:10px;font-size:1.75em ;text-align:left;">2<sup>nd</sup></td>\n                    <td style="font-size:1.75em ; text-align:left;">Trial</td>\n                    <td style="font-size:1.75em ;text-align:right;">{{result_t2_0[2]}}</td>\n                    <td style="font-size:1.75em ;width:6%; text-align:center;">-</td>\n                    <td style="font-size:1.75em ;text-align:left;">{{result_t2_0[3]}}</td>\n                    <td style="font-weight:bold; font-size:1.75em ;text-align:center; color:rgb(46,138,212)">{{result_t2_0[2] - result_t2_0[3]}}</td>\n                   <td></td>\n                </tr>\n                    \n                    <tr>\n                    <td style="padding-left:10px;font-size:1.75em ;text-align:left;">3<sup>rd</sup></td>\n                    <td style="font-size:1.75em ;text-align:left;">Trial</td>\n                    <td style="font-size:1.75em ; text-align:right;">{{result_t2_0[4]}}</td>\n                    <td style="font-size:1.75em ;width:6%; text-align:center;">-</td>\n                    <td style="font-size:1.75em ; text-align:left;">{{result_t2_0[5]}}</td>\n                    <td style="font-weight:bold; font-size:1.75em ;text-align:center; color:rgb(46,138,212)">{{result_t2_0[4] - result_t2_0[5]}}</td>\n                    <td></td>\n                </tr>\n                    \n                    <tr>\n                    <td style="padding-left:10px;font-size:1.75em ;text-align:left;">4<sup>th</sup></td>\n                    <td style="font-size:1.75em ; text-align:left;">Trial</td>\n                    <td style="font-size:1.75em ;text-align:right;">{{result_t2_0[6]}}</td>\n                    <td style="font-size:1.75em ;width:6%; text-align:center;">-</td>\n                    <td style="font-size:1.75em ;text-align:left;">{{result_t2_0[7]}}</td>\n                    <td style="font-weight:bold; font-size:1.75em ;text-align:center; color:rgb(46,138,212)">{{result_t2_0[6] - result_t2_0[7]}}</td>\n                    <td></td>\n                </tr>\n                    \n                    <tr>\n                    <td style="padding-left:10px;font-size:1.75em ;text-align:left;">5<sup>th</sup></td>\n                    <td style="font-size:1.75em ;text-align:left;">Trial</td>\n                    <td style="font-size:1.75em ; text-align:right;">{{result_t2_0[8]}}</td>\n                    <td style="font-size:1.75em ;width:6%; text-align:center;">-</td>\n                    <td style="font-size:1.75em ;text-align:left;">{{result_t2_0[9]}}</td>\n                    <td style="font-weight:bold; font-size:1.75em ;text-align:center; color:rgb(46,138,212)">{{result_t2_0[8] - result_t2_0[9]}}</td>\n                    <td></td>\n                </tr>\n                    \n                    <tr>\n                    <td style="padding-left:10px;font-size:1.75em ;text-align:left;">6<sup>th</sup></td>\n                    <td style="font-size:1.75em ; text-align:left;">Trial</td>\n                    <td style="font-size:1.75em ;text-align:right;">{{result_t2_0[10]}}</td>\n                    <td style="font-size:1.75em ;width:6%; text-align:center;">-</td>\n                    <td style="font-size:1.75em ;text-align:left;">{{result_t2_0[11]}}</td>\n                    <td style="font-weight:bold; font-size:1.75em ; text-align:center; color:rgb(46,138,212)">{{result_t2_0[10] - result_t2_0[11]}}</td>\n                    <td></td>\n                </tr>\n                    \n                    </table>  <BR><BR>\n                    </ion-slide>\n            \n            \n     </ion-slides>\n\n    </div>\n\n\n\n\n\n\n\n\n    <table cellspacing=0 cellpadding=0 border=0 style=" margin:5%; width:90%;margin-bottom:-2%; margin-top:3%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n            <tr>\n            <td style="padding-left:10px;font-size:3.25em ;width:70%; text-align:left; font-weight:bold">Sustained Handgrip</td>\n            <td style="padding-right:10px;font-size:3.25em ;width:30%; text-align:right;color:rgb(46,138,212)" colspan="4">{{average_t3}}</td>\n            </table>  \n\n    <div style="padding:5%; padding-top:0;">\n\n                    <div style="font-size:2em; padding-top:25px;" *ngIf="average_t3==0">No Record. </div>\n                    <div style="font-size:2em; " *ngIf="average_t3!=0">\n                        <div style="text-align: left"><BR>\n                            <table border=0 style="width: 100%;">\n                                    <tr>\n                                    <td style="width: 35%">\n                                    Baseline\n                                    </td><td style="width: 15%;text-align:center">\n                                    <span style="color:rgb(46,138,212); font-weight:bold">{{t3_down1}}</span>\n                                    </td>\n\n                                    <td colspan="2" style="width: 50%; text-align:right">\n                                            <span *ngIf="average_t3>=16" style="color:rgba(112,173,71,1); font-weight:bold;font-size:0.875em">NORMAL</span>\n                                            <span *ngIf="average_t3<=15 && average_t3>= 11" style="color:rgba(255,192,0,1); font-weight:bold;font-size:0.875em">BORDERLINE</span>\n                                            <span *ngIf="average_t3<=10 && average_t3>0" style="color:rgba(237,125,49,1); font-weight:bold;font-size:0.875em">ABNORMAL</span>                      \n                                    </td>\n                                    </tr>\n                                    <tr>\n                                    <td style="width: 35%">\n                                    1<sup>st</sup> Minute        </td><td style="width: 15%;text-align:center">\n                                    <span style="color:rgb(46,138,212); font-weight:bold">{{t3_down2}}</span>\n                                    </td>\n                                    <td style="width: 35%; padding-left:20px">\n                                    4<sup>th</sup> Minute        </td><td style="width: 15%;text-align:right">\n                                    <span style="color:rgb(46,138,212); font-weight:bold">{{t3_down5}}</span>\n                                    </td>\n                                    </tr>\n                                    \n                                    <tr>\n                                    <td style="width: 35%">\n                                    2<sup>nd</sup> Minute</td><td style="width: 15%;text-align:center">\n                                    <span style="color:rgb(46,138,212); font-weight:bold">{{t3_down3}}</span>\n                                    </td>\n                                    <td style="width: 35%; padding-left:20px">\n                                                    5<sup>th</sup> Minute        </td><td style="width: 15%;text-align:right">\n                                                    <span style="color:rgb(46,138,212); font-weight:bold">{{t3_down6}}</span>\n                                                    </td>\n                                    </tr>\n\n                                    <tr>\n                                                    <td style="width: 35%">\n                                                    3<sup>rd</sup> Minute</td><td style="width: 15%;text-align:center">\n                                                    <span style="color:rgb(46,138,212); font-weight:bold">{{t3_down4}}</span>\n                                                    </td>\n                                                    <td style="width: 35%"></td><td style="width: 15%"></td>\n                                                    </tr>\n                                    </table> \n\n\n                    </div>\n\n\n                            </div>\n\n    </div>\n\n\n\n\n\n\n\n\n\n\n\n    <table cellspacing=0 cellpadding=0 border=0 style=" margin:5%; width:90%;margin-bottom:2%; margin-top:3%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n            <tr>\n            <td style="padding-left:10px;font-size:3.25em ;width:50%; text-align:left; font-weight:bold">30:15 Ratio</td>\n            <td style="padding-right:10px;font-size:3.25em ;width:50%; text-align:right;color:rgb(46,138,212)" colspan="4">{{average_RRI | number:\'1.2-2\'}}</td>\n            </table>  \n\n    <div style="padding:5%; padding-top:0;">\n\n            <div style="font-size:2em; " *ngIf="result_t4_1.length==0">\n                    No Record.\n            </div>\n        \n            <div *ngIf="result_t4_1.length>0">\n                    <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444">\n        <tr >\n        <td style="padding-left:10px;font-size:2em ;width:5%; text-align:left;">15<sup>th</sup></td>\n        <td style="padding-left:10px;font-size:2em ;width:15%; text-align:left;">Beat</td>\n        <td style="padding-left:10px;font-size:2em ;width:23%; text-align:right;;color:rgb(46,138,212); font-weight:bold">{{RRI15}}</td>\n        <td style="width:57%; text-align:right;">\n                <span *ngIf="average_RRI >= 1.035" style="color:rgba(112,173,71,1); font-size:1.6em; font-weight:bold">NORMAL</span>  \n                <span *ngIf="average_RRI >= 1.005 && average_RRI < 1.035 " style="color:rgba(255,192,0,1);font-size:1.6em; font-weight:bold">BORDERLINE</span>  \n                <span *ngIf="average_RRI > 0 && average_RRI < 1.005 " style="color:rgba(237,125,49,1);font-size:1.6em; font-weight:bold">ABNORMAL</span>  \n        </td>\n        </tr>\n        <tr>\n        <td style="padding-left:10px;font-size:2em ;text-align:left;">30<sup>th</sup></td>\n        <td style="padding-left:10px;font-size:2em ;text-align:left;">Beat</td>\n        <td style="padding-left:10px;font-size:2em ;text-align:right;color:rgb(46,138,212); font-weight:bold">{{RRI30}}</td>\n        <td></td>\n        </tr>\n            </table>\n        </div>\n    </div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n    <table cellspacing=0 cellpadding=0 border=0 style=" margin:5%; width:90%;margin-bottom:2%; margin-top:3%;font-size:1em; border-bottom: 3px solid rgb(46,138,212);color:rgb(46,138,212)">\n            <tr>\n            <td style="padding-left:10px;font-size:3.25em ;width:50%; text-align:left; font-weight:bold">Orthostasis</td>\n            <td style="padding-right:10px;font-size:3.25em ;width:50%; text-align:right;color:rgb(46,138,212)" colspan="4">{{average_t4}}</td>\n            </table>  \n\n    <div style="padding:5%; padding-top:0;">\n\n\n\n\n            <div style="font-size:2em; " *ngIf="result_t4_1.length==0">\n                    No Record.\n            </div>\n        \n      <div *ngIf="result_t4_1.length>0">\n\n        <div style="text-align: left;font-size:2em; ">\n                    <table border=0 style="width: 100%;">\n                            <tr>\n                            <td style="width: 35%">\n                            Baseline\n                            </td><td style="width: 15%;text-align:center">\n                            <span style="color:rgb(46,138,212); font-weight:bold">{{up1}}</span>\n                            </td>\n\n                            <td colspan="2" style="width: 50%; text-align:right">\n                            <span *ngIf="average_t4 !=0 && average_t4<= 10" style="color:rgba(112,173,71,1); font-weight:bold;font-size:0.8em;">NORMAL</span>\n                            <span *ngIf="average_t4 >=11 && average_t4<= 29" style="color:rgba(255,192,0,1); font-weight:bold;font-size:0.8em;">BORDERLINE</span>\n                            <span *ngIf="average_t4 >=30" style="color:rgba(237,125,49,1); font-weight:bold;font-size:0.8em;">ABNORMAL</span>  \n                            </td>\n                            </tr>\n                            <tr>\n                            <td style="width: 35%">\n                            1<sup>st</sup> Minute        </td><td style="width: 15%;text-align:center">\n                            <span style="color:rgb(46,138,212); font-weight:bold">{{up2}}</span>\n                            </td>\n                            <td style="width: 35%; padding-left:20px">\n                            3<sup>rd</sup> Minute        </td><td style="width: 15%;text-align:right">\n                            <span style="color:rgb(46,138,212); font-weight:bold">{{up4}}</span>\n                            </td>\n                            </tr>\n                            \n                            <tr>\n                            <td style="width: 35%">\n                            2<sup>nd</sup> Minute</td><td style="width: 15%;text-align:center">\n                            <span style="color:rgb(46,138,212); font-weight:bold">{{up3}}</span>\n                            </td>\n                            <td style="width: 35%; padding-left:20px"></td><td style="width: 15%;text-align:right"></td>\n                            </tr>\n\n                        \n                            </table> \n        \n        </div>\n        </div>\n\n\n\n\n\n\n<BR><BR>\n\n\n\n    </div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n</div> \n</div>\n\n    </ion-content>\n    '/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/testEnd/testEnd.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_14__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_clipboard__["a" /* Clipboard */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], TestEndPage);
    return TestEndPage;
    var TestEndPage_1;
}());

//# sourceMappingURL=testEnd.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_test1detail_test1detail__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_test2detail_test2detail__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_test3detail_test3detail__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_test4detail_test4detail__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_test4detail_2_test4detail_2__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_clipboard__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_email_composer__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_keyboard__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_storage__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_progress_bar_progress_bar__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_sqlite__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_testStart_testStart__["a" /* TestStartPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_test1_test1__["a" /* Test1Page */],
                __WEBPACK_IMPORTED_MODULE_9__pages_test1detail_test1detail__["a" /* Test1DetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_test2_test2__["a" /* Test2Page */],
                __WEBPACK_IMPORTED_MODULE_11__pages_test2detail_test2detail__["a" /* Test2DetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_test3_test3__["a" /* Test3Page */],
                __WEBPACK_IMPORTED_MODULE_13__pages_test3detail_test3detail__["a" /* Test3DetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_test4_test4__["a" /* Test4Page */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test4detail_test4detail__["a" /* Test4DetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_test4detail_2_test4detail_2__["a" /* Test4DetailPage_2 */],
                __WEBPACK_IMPORTED_MODULE_17__pages_test5_test5__["a" /* Test5Page */],
                __WEBPACK_IMPORTED_MODULE_18__pages_testEnd_testEnd__["a" /* TestEndPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_testConfig_testConfig__["a" /* TestConfigPage */],
                __WEBPACK_IMPORTED_MODULE_25__components_progress_bar_progress_bar__["a" /* ProgressBarComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    platforms: {
                        ios: {
                            // These options are available in ionic-angular@2.0.0-beta.2 and up.
                            scrollAssist: false,
                            autoFocusAssist: false // Valid options appear to be ['instant', 'delay', false]
                        }
                        // http://ionicframework.com/docs/v2/api/config/Config/)
                    }
                }, {
                    links: []
                }
                /*
                 * END MODIFY
                 */ ),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_testStart_testStart__["a" /* TestStartPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_test1_test1__["a" /* Test1Page */],
                __WEBPACK_IMPORTED_MODULE_9__pages_test1detail_test1detail__["a" /* Test1DetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_test2_test2__["a" /* Test2Page */],
                __WEBPACK_IMPORTED_MODULE_11__pages_test2detail_test2detail__["a" /* Test2DetailPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_test3_test3__["a" /* Test3Page */],
                __WEBPACK_IMPORTED_MODULE_13__pages_test3detail_test3detail__["a" /* Test3DetailPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_test4_test4__["a" /* Test4Page */],
                __WEBPACK_IMPORTED_MODULE_15__pages_test4detail_test4detail__["a" /* Test4DetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_test4detail_2_test4detail_2__["a" /* Test4DetailPage_2 */],
                __WEBPACK_IMPORTED_MODULE_17__pages_test5_test5__["a" /* Test5Page */],
                __WEBPACK_IMPORTED_MODULE_18__pages_testEnd_testEnd__["a" /* TestEndPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_testConfig_testConfig__["a" /* TestConfigPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_clipboard__["a" /* Clipboard */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_ble__["a" /* BLE */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_sqlite__["a" /* SQLite */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(kb, platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            if (platform.is('ios')) {
                kb.disableScroll(true);
            }
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestStartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test5_test5__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__testConfig_testConfig__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TestStartPage = (function () {
    function TestStartPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TestStartPage_1 = TestStartPage;
    TestStartPage.prototype.clickPage = function (a) {
        if (a == 0)
            this.navCtrl.setRoot(TestStartPage_1, {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test5_test5__["a" /* Test5Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    TestStartPage.prototype.loadConfig = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__testConfig_testConfig__["a" /* TestConfigPage */], {});
    };
    TestStartPage = TestStartPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-testStart',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/testStart/testStart.html"*/'<!--\n  Generated template for the Test1Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content  text-center>\n\n    <ion-fab right bottom>\n        <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 4px #AAA" (click)="loadConfig()">\n          <ion-icon name="cog" ></ion-icon>\n        </button>\n      </ion-fab>\n    \n\n    <div style="width:22%; height:100%;background:#D5E4C0; float:left; color:#000">\n\n        <div class="ext-box">\n            <div class="int-box">\n                <B style="font-size:2em; ">Progress</B>\n                  <BR><BR>\n                  <button ion-button  color="lilac" style="width: 75%" (tap)="clickPage(0)">Start</button><BR>\n                  <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                  <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(1)">Breath Pressure</button><BR>\n                  <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                  <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(2)">hand grip</button><BR>\n                  <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                  <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(3)">Test3</button><BR>\n                  <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                  <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(4)">Test4</button><BR>\n                  <!-- <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                  <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(5)">Test5</button><BR> -->\n                  <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                  <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(6)">Result</button>          \n            </div> \n        </div>\n\n    </div>\n\n    \n    <div style="width:78%; height:100%; background:#fff;float:right">\n\n        <div class="ext-box">\n            <div class="int-box">\n                <B style="font-size:4em ; color:#D5E4C0">Please Enter Patient ID</B>\n                  <BR><BR>\n                    <input type="text" style="color:#000000 ; height:10vh; width:40vw ;font-size:1.5em" maxlength="25"><BR><BR>\n                  <button ion-button outline (click)="clickStart()">Submit</button>\n                  <BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;<BR>&nbsp;\n            </div>\n        </div>\n    </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/testStart/testStart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], TestStartPage);
    return TestStartPage;
    var TestStartPage_1;
}());

//# sourceMappingURL=testStart.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test5Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__testStart_testStart__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test2_test2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test3_test3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__testConfig_testConfig__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Test5Page = (function () {
    function Test5Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    Test5Page_1 = Test5Page;
    Test5Page.prototype.clickPage = function (a) {
        if (a == 0)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__testStart_testStart__["a" /* TestStartPage */], {}, { animate: false, direction: 'forward' });
        else if (a == 1)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 2)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__test2_test2__["a" /* Test2Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 3)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__test3_test3__["a" /* Test3Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 4)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
        else if (a == 5)
            this.navCtrl.setRoot(Test5Page_1, {}, { animate: false, direction: 'forward' });
        else if (a == 6)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    Test5Page.prototype.loadConfig = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__testConfig_testConfig__["a" /* TestConfigPage */], {});
    };
    Test5Page = Test5Page_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test5',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test5/test5.html"*/'<!--\n  Generated template for the Test1Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content  text-center>\n\n        <div style="width:22%; height:100%;background:#D5E4C0; float:left; color:#000">\n\n                <div class="ext-box">\n                    <div class="int-box">\n                        <B style="font-size:2em; ">Progress</B>\n                          <BR><BR>\n                          <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(0)">Start</button><BR>\n                          <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                          <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(1)">Breath Pressure</button><BR>\n                          <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                          <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(2)">hand grip</button><BR>\n                          <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                          <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(3)">Test3</button><BR>\n                          <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                          <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(4)">Test4</button><BR>\n                          <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                          <button ion-button  color="lilac" style="width: 75%" (tap)="clickPage(5)">Test5</button><BR>\n                          <ion-icon name="arrow-down" style="font-size:2em"></ion-icon><BR>\n                          <button ion-button  color="sunshine" style="width: 75%" (tap)="clickPage(6)">Result</button>          \n                    </div> \n                </div>\n        \n            </div>\n\n    \n    <div style="width:78%; height:100%; background:#fff;float:right">\n\n        <div class="ext-box">\n            <div class="int-box">\n                <B style="font-size:4em ; color:#D5E4C0">Test5</B>\n                  <BR><BR>\n            </div>\n        </div>\n    </div>\n\n    <div>\n        <img src="images/gear.png" style="height:5vh; width:5vh; position:fixed; padding:1vh;top:3vh; left:0;" (click)="loadConfig()">\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test5/test5.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test5Page);
    return Test5Page;
    var Test5Page_1;
}());

//# sourceMappingURL=test5.js.map

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 223,
	"./af.js": 223,
	"./ar": 224,
	"./ar-dz": 225,
	"./ar-dz.js": 225,
	"./ar-kw": 226,
	"./ar-kw.js": 226,
	"./ar-ly": 227,
	"./ar-ly.js": 227,
	"./ar-ma": 228,
	"./ar-ma.js": 228,
	"./ar-sa": 229,
	"./ar-sa.js": 229,
	"./ar-tn": 230,
	"./ar-tn.js": 230,
	"./ar.js": 224,
	"./az": 231,
	"./az.js": 231,
	"./be": 232,
	"./be.js": 232,
	"./bg": 233,
	"./bg.js": 233,
	"./bm": 234,
	"./bm.js": 234,
	"./bn": 235,
	"./bn.js": 235,
	"./bo": 236,
	"./bo.js": 236,
	"./br": 237,
	"./br.js": 237,
	"./bs": 238,
	"./bs.js": 238,
	"./ca": 239,
	"./ca.js": 239,
	"./cs": 240,
	"./cs.js": 240,
	"./cv": 241,
	"./cv.js": 241,
	"./cy": 242,
	"./cy.js": 242,
	"./da": 243,
	"./da.js": 243,
	"./de": 244,
	"./de-at": 245,
	"./de-at.js": 245,
	"./de-ch": 246,
	"./de-ch.js": 246,
	"./de.js": 244,
	"./dv": 247,
	"./dv.js": 247,
	"./el": 248,
	"./el.js": 248,
	"./en-au": 249,
	"./en-au.js": 249,
	"./en-ca": 250,
	"./en-ca.js": 250,
	"./en-gb": 251,
	"./en-gb.js": 251,
	"./en-ie": 252,
	"./en-ie.js": 252,
	"./en-il": 253,
	"./en-il.js": 253,
	"./en-nz": 254,
	"./en-nz.js": 254,
	"./eo": 255,
	"./eo.js": 255,
	"./es": 256,
	"./es-do": 257,
	"./es-do.js": 257,
	"./es-us": 258,
	"./es-us.js": 258,
	"./es.js": 256,
	"./et": 259,
	"./et.js": 259,
	"./eu": 260,
	"./eu.js": 260,
	"./fa": 261,
	"./fa.js": 261,
	"./fi": 262,
	"./fi.js": 262,
	"./fo": 263,
	"./fo.js": 263,
	"./fr": 264,
	"./fr-ca": 265,
	"./fr-ca.js": 265,
	"./fr-ch": 266,
	"./fr-ch.js": 266,
	"./fr.js": 264,
	"./fy": 267,
	"./fy.js": 267,
	"./gd": 268,
	"./gd.js": 268,
	"./gl": 269,
	"./gl.js": 269,
	"./gom-latn": 270,
	"./gom-latn.js": 270,
	"./gu": 271,
	"./gu.js": 271,
	"./he": 272,
	"./he.js": 272,
	"./hi": 273,
	"./hi.js": 273,
	"./hr": 274,
	"./hr.js": 274,
	"./hu": 275,
	"./hu.js": 275,
	"./hy-am": 276,
	"./hy-am.js": 276,
	"./id": 277,
	"./id.js": 277,
	"./is": 278,
	"./is.js": 278,
	"./it": 279,
	"./it.js": 279,
	"./ja": 280,
	"./ja.js": 280,
	"./jv": 281,
	"./jv.js": 281,
	"./ka": 282,
	"./ka.js": 282,
	"./kk": 283,
	"./kk.js": 283,
	"./km": 284,
	"./km.js": 284,
	"./kn": 285,
	"./kn.js": 285,
	"./ko": 286,
	"./ko.js": 286,
	"./ky": 287,
	"./ky.js": 287,
	"./lb": 288,
	"./lb.js": 288,
	"./lo": 289,
	"./lo.js": 289,
	"./lt": 290,
	"./lt.js": 290,
	"./lv": 291,
	"./lv.js": 291,
	"./me": 292,
	"./me.js": 292,
	"./mi": 293,
	"./mi.js": 293,
	"./mk": 294,
	"./mk.js": 294,
	"./ml": 295,
	"./ml.js": 295,
	"./mr": 296,
	"./mr.js": 296,
	"./ms": 297,
	"./ms-my": 298,
	"./ms-my.js": 298,
	"./ms.js": 297,
	"./mt": 299,
	"./mt.js": 299,
	"./my": 300,
	"./my.js": 300,
	"./nb": 301,
	"./nb.js": 301,
	"./ne": 302,
	"./ne.js": 302,
	"./nl": 303,
	"./nl-be": 304,
	"./nl-be.js": 304,
	"./nl.js": 303,
	"./nn": 305,
	"./nn.js": 305,
	"./pa-in": 306,
	"./pa-in.js": 306,
	"./pl": 307,
	"./pl.js": 307,
	"./pt": 308,
	"./pt-br": 309,
	"./pt-br.js": 309,
	"./pt.js": 308,
	"./ro": 310,
	"./ro.js": 310,
	"./ru": 311,
	"./ru.js": 311,
	"./sd": 312,
	"./sd.js": 312,
	"./se": 313,
	"./se.js": 313,
	"./si": 314,
	"./si.js": 314,
	"./sk": 315,
	"./sk.js": 315,
	"./sl": 316,
	"./sl.js": 316,
	"./sq": 317,
	"./sq.js": 317,
	"./sr": 318,
	"./sr-cyrl": 319,
	"./sr-cyrl.js": 319,
	"./sr.js": 318,
	"./ss": 320,
	"./ss.js": 320,
	"./sv": 321,
	"./sv.js": 321,
	"./sw": 322,
	"./sw.js": 322,
	"./ta": 323,
	"./ta.js": 323,
	"./te": 324,
	"./te.js": 324,
	"./tet": 325,
	"./tet.js": 325,
	"./tg": 326,
	"./tg.js": 326,
	"./th": 327,
	"./th.js": 327,
	"./tl-ph": 328,
	"./tl-ph.js": 328,
	"./tlh": 329,
	"./tlh.js": 329,
	"./tr": 330,
	"./tr.js": 330,
	"./tzl": 331,
	"./tzl.js": 331,
	"./tzm": 332,
	"./tzm-latn": 333,
	"./tzm-latn.js": 333,
	"./tzm.js": 332,
	"./ug-cn": 334,
	"./ug-cn.js": 334,
	"./uk": 335,
	"./uk.js": 335,
	"./ur": 336,
	"./ur.js": 336,
	"./uz": 337,
	"./uz-latn": 338,
	"./uz-latn.js": 338,
	"./uz.js": 337,
	"./vi": 339,
	"./vi.js": 339,
	"./x-pseudo": 340,
	"./x-pseudo.js": 340,
	"./yo": 341,
	"./yo.js": 341,
	"./zh-cn": 342,
	"./zh-cn.js": 342,
	"./zh-hk": 343,
	"./zh-hk.js": 343,
	"./zh-tw": 344,
	"./zh-tw.js": 344
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 453;

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test4DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test4_test4__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test4detail_2_test4detail_2__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Test4DetailPage = (function () {
    function Test4DetailPage(storage, sqlite, ble, navCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.sqlite = sqlite;
        this.ble = ble;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.heartRateDeviceConnected = false;
        this.RRIReadng = 0;
        this.currentTime = 5;
        this.trial = 0;
        this.loadProgress = 100;
        this.baseBeatCount = 0;
        this.currentBeatCount = 0;
        this.RRI15 = 0;
        this.RRI30 = 0;
        this.CountdownSecond = 3;
        this.tempString = "";
        this.stand = false;
        this.result = [];
        this.result3015 = [];
        this.storage.get('id').then(function (val) {
            console.log(' id is', val);
            _this.patient_id = val;
        });
        this.showDeviceConnectTable = true;
        this.checkDeviceTask = setInterval(function () {
            _this.checkAllHardware();
        }, 300);
        setTimeout(function () {
            _this.connectHeartRate();
        }, 1000);
        this.clickTestStart();
    }
    Test4DetailPage.prototype.gotoOrthostasis = function () {
        var _this = this;
        clearInterval(this.checkDeviceTask);
        clearInterval(this.countdownTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.saveDataTask);
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            var data = [JSON.stringify(_this.result3015)];
            _this.datab.executeSql("UPDATE patient_table SET t4_1 = ? where id='" + _this.patient_id + "';", data)
                .then(function () {
                console.log(data);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__test4detail_2_test4detail_2__["a" /* Test4DetailPage_2 */], {}, { animate: false, direction: 'forward' });
            });
        });
    };
    Test4DetailPage.prototype.backTest4 = function () {
        var _this = this;
        clearInterval(this.checkDeviceTask);
        clearInterval(this.countdownTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.saveDataTask);
        this.sqlite.create({
            name: 'recorder.db',
            location: 'default'
        }).then(function (db) {
            _this.datab = db;
            var data = [JSON.stringify(_this.result3015)];
            _this.datab.executeSql("UPDATE patient_table SET t4_1 = ? where id='" + _this.patient_id + "';", data)
                .then(function () {
                console.log(data);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test4_test4__["a" /* Test4Page */], {}, { animate: false, direction: 'forward' });
            });
        });
    };
    Test4DetailPage.prototype.clickTestStart = function () {
        var _this = this;
        var daa = new Uint8Array(1);
        daa[0] = 2;
        this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1218', daa.buffer).then(function (data2) {
            console.log(data2);
        }).catch(function (error) {
            console.log(error);
        });
        this.showDeviceConnectTable = false;
        this.showCountdownTable = true;
        this.stand = false;
        this.countdownTask = setInterval(function () {
            _this.CountdownSecond--;
            if (_this.CountdownSecond == 0) {
                _this.showCountdownTable = false;
                _this.showTestingTable = true;
                _this.testSecondTask = setInterval(function () {
                    _this.eachSecond();
                }, 1000);
                _this.saveDataTask = setInterval(function () {
                    _this.readDatafor15and30();
                }, 200);
                clearInterval(_this.countdownTask);
            }
        }, 1000);
    };
    Test4DetailPage.prototype.redoTestOrthostasis = function () {
    };
    Test4DetailPage.prototype.redoTest = function () {
        var _this = this;
        this.result = [];
        this.trial--;
        this.RRI15 = 0;
        this.RRI30 = 0;
        this.CountdownSecond = 3;
        this.currentTime = 5;
        this.loadProgress = 100;
        this.stand = false;
        var daa = new Uint8Array(1);
        daa[0] = 2;
        this.ble.write('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19B10001-E8F2-537E-4F6C-D104768A1218', daa.buffer).then(function (data2) {
            console.log(data2);
        }).catch(function (error) {
            console.log(error);
        });
        this.showDeviceConnectTable = false;
        this.showCountdownTable = true;
        this.countdownTask = setInterval(function () {
            _this.CountdownSecond--;
            if (_this.CountdownSecond == 0) {
                _this.showCountdownTable = false;
                _this.showTestingTable = true;
                _this.testSecondTask = setInterval(function () {
                    _this.eachSecond();
                }, 1000);
                _this.saveDataTask = setInterval(function () {
                    _this.readDatafor15and30();
                }, 200);
                clearInterval(_this.countdownTask);
            }
        }, 1000);
    };
    Test4DetailPage.prototype.readDatafor15and30 = function () {
        console.log((this.currentBeatCount - this.baseBeatCount));
        if (this.stand && (this.currentBeatCount - this.baseBeatCount) >= 15 && this.RRI15 == 0) {
            this.RRI15 = this.RRIReadng;
        }
        if (this.stand && (this.currentBeatCount - this.baseBeatCount) >= 30 && this.RRI30 == 0) {
            this.RRI30 = this.RRIReadng;
            this.showCountdownTable = false;
            this.showTestingTable = false;
            this.finishTaking();
        }
    };
    Test4DetailPage.prototype.finishTaking = function () {
        clearInterval(this.countdownTask);
        clearInterval(this.testSecondTask);
        clearInterval(this.saveDataTask);
        this.result.push(this.RRI15, this.RRI30);
        this.result3015 = this.result;
        this.trial = 1;
        this.showDeviceConnectTable = true;
        this.CountdownSecond = 3;
        this.currentTime = 5;
        this.loadProgress = 100;
        this.stand = false;
    };
    Test4DetailPage.prototype.eachSecond = function () {
        this.currentTime--;
        this.loadProgress = (this.currentTime / 5) * 100;
        if (this.currentTime <= 0) {
            clearInterval(this.testSecondTask);
            this.stand = true;
            this.baseBeatCount = this.currentBeatCount;
        }
    };
    Test4DetailPage.prototype.checkAllHardware = function () {
        var _this = this;
        this.ble.isConnected('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').then(function () {
            _this.heartRateDeviceConnected = true;
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19b10001-e8f2-537e-4f6c-d104768a1216').then(function (data2) {
                if ((new Uint16Array(data2)[0]) > 560 && (new Uint16Array(data2)[0]) < 1450)
                    _this.RRIReadng = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                console.log(error);
            });
            _this.ble.read('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9', '19b10000-e8f2-537e-4f6c-d104768a1216', '19b10001-e8f2-537e-4f6c-d104768a1217').then(function (data2) {
                _this.currentBeatCount = (new Uint16Array(data2)[0]);
            }).catch(function (error) {
                console.log(error);
            });
        }, function () {
            _this.heartRateDeviceConnected = false;
        });
        if (!this.heartRateDeviceConnected) {
            this.connectHeartRate();
        }
    };
    Test4DetailPage.prototype.connectHeartRate = function () {
        var _this = this;
        this.ble.scan([], 3).subscribe(function (device) {
            console.log(JSON.stringify(device));
            _this.ble.connect('8AD5E630-8A2D-C628-1622-1A1F58EF6BA9').subscribe(function (data) {
                _this.heartRateDeviceConnected = true;
            }, function (error) {
                console.log(error);
            });
        });
    };
    Test4DetailPage.prototype.resetValue = function () {
        var _this = this;
        this.ble.isConnected('9ADE4682-C753-3B3A-7454-50123794CAF4').then(function () {
            var daa = new Uint8Array(1);
            daa[0] = 2;
            _this.ble.write('9ADE4682-C753-3B3A-7454-50123794CAF4', '19b10000-e8f2-537e-4f6c-d104768a1223', '19B10001-E8F2-537E-4F6C-D104768A1223', daa.buffer).then(function (data2) {
                console.log(data2);
            }).catch(function (error) {
                console.log(error);
            });
        }, function () { });
    };
    Test4DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test4detail',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/test4detail/test4detail.html"*/'\n\n<ion-content text-left no-bounce style="overflow:none;background:rgb(240, 240, 240)">\n    <div class="ext-box" style=" background:#fff;box-shadow: 0 15px 15px -15px #888; width:120%; margin-left:-10%;padding-left:7%; font-family:\'Calibri\' ; height:12%; z-index:99; position:relative"> \n        <div class="int-box" style="padding-left:5%">\n            <table border="0" style="width:90%" >\n\n                <tr>\n                    <td style="width: 50%; vertical-align:middle"><B style="font-size:5em ; color:#444">30:15 Ratio</B> {{RRIReadng}} - {{currentBeatCount}}</td>\n                        <td style="text-align:right;width:25%;font-size:3em; vertical-align:middle">trials<BR>completed</td>\n                        <td style="text-align:right;width:25%;font-size:10em; font-weight:bold;  vertical-align:middle">{{trial}}/1</td>\n                </tr>\n            </table>\n            \n        \n        </div>\n    </div>\n\n<div style="background:rgb(240, 240, 240);text-align:center; padding-top:40px; color:rgb(46,138,212) ;  ">\n \n\n<div *ngIf="showDeviceConnectTable">\n    <div style="font-size:2em">\n\n        <b><u>Device Status</u></b><BR>\n       Heart Rate Device : {{heartRateDeviceConnected}} <BR>\n        <div style="width:40%; margin:0 auto;" *ngIf="trial >=1">\n                <table cellspacing=0 cellpadding=0 border=0 style="width:100%;font-size:1em; color:#444">\n                        <tr>\n                        <td style="font-size:6em ;width:20%; text-align:left;color:rgb(46,138,212)" colspan="3">{{RRI30 / RRI15 | number:\'1.2-2\'}}</td>\n                       </tr>\n<tr>\n    <td style="padding-left:10px;font-size:1.75em ;width:5%; text-align:left;">15<sup>th</sup></td>\n    <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">Beat</td>\n  <td style="padding-left:10px;font-size:1.75em ;width:55%; text-align:left;">{{RRI15}} RRI</td>\n</tr>\n<tr>\n    <td style="padding-left:10px;font-size:1.75em ;width:5%; text-align:left;">30<sup>th</sup></td>\n    <td style="padding-left:10px;font-size:1.75em ;width:15%; text-align:left;">Beat</td>\n  <td style="padding-left:10px;font-size:1.75em ;width:55%; text-align:left;">{{RRI30}} RRI</td>\n</tr>\n            </table> \n                 </div>\n       </div><BR>\n        <div *ngIf="heartRateDeviceConnected && trial>=1" (tap)="redoTest()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:200px ;  padding:10px">\n                Redo Trial\n                </div>\n                &nbsp;&nbsp;\n        <div *ngIf="heartRateDeviceConnected && trial <1" (tap)="clickTestStart()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                START\n                </div>\n        <div *ngIf="heartRateDeviceConnected && trial >=1" (tap)="gotoOrthostasis()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n                Continue\n                </div>\n</div>    \n\n\n<div *ngIf="showCountdownTable"  style="font-size: 20em">\n{{CountdownSecond}}\n </div>  \n\n    <table style="width:80%; margin-left:10%; text-align:left;" id="testingTable" *ngIf="showTestingTable && !stand">\n<tr>\n    <td colspan="2">\n        <div>\n            <span style="font-size:7.5em; font-weight:bold;">Stand up <BR>after 5 second</span>\n        </div>\n    </td>\n</tr>\n<tr>\n     <td style="width:40%; text-align:left;">\n         <span style="font-size:15em; font-weight:bold;">{{currentTime}}</span><span style="font-weight:bold;font-size:7.5em">s</span>\n    </td>\n    <td style="width:70%">\n            <progress-bar [progress]="loadProgress"></progress-bar>\n    </td>\n    </tr>\n    </table>\n\n    <table style="width:80%; margin-left:10%; text-align:left;" id="testingTable" *ngIf="showTestingTable && stand ">\n        <tr>\n            <td colspan="2">\n                <div>\n                    <span style="font-size:15em; font-weight:bold;">Stand up</span>\n                </div>\n            </td>\n        </tr>\n        <tr>\n            <td colspan="2">\n                <div>\n                    <span style="font-size:3em; font-weight:bold;">{{ currentBeatCount - baseBeatCount }} th beats</span>\n                </div>\n            </td>\n        </tr>\n            </table>\n\n\n\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style=" font-size:20px;box-shadow:0 0 40px #888" (click)="backTest4()">\n      <ion-icon name="close" style="zoom:2.5"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/test4detail/test4detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], Test4DetailPage);
    return Test4DetailPage;
}());

//# sourceMappingURL=test4detail.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('progress'),
        __metadata("design:type", Object)
    ], ProgressBarComponent.prototype, "progress", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'progress-bar',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/components/progress-bar/progress-bar.html"*/'<div class="progress-outer">\n  <div class="progress-inner" [style.width]="progress + \'%\'">\n      <!--{{progress}}%-->\n  </div>\n</div>'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/components/progress-bar/progress-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test1_test1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__testEnd_testEnd__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__testConfig_testConfig__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(storage, navCtrl, alertCtrl, sqlite) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.sqlite = sqlite;
    }
    HomePage_1 = HomePage;
    HomePage.prototype.clickStart = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
    };
    HomePage.prototype.clickRecord = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__testEnd_testEnd__["a" /* TestEndPage */], {}, { animate: false, direction: 'forward' });
    };
    HomePage.prototype.loadConfig = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__testConfig_testConfig__["a" /* TestConfigPage */], { parent: HomePage_1 }, { animate: true, direction: 'forward' });
    };
    HomePage.prototype.showPrompt = function () {
        var _this = this;
        /*this.storage.set('id', "4").then(sss=>{
          this.navCtrl.setRoot(Test1Page, {}, {animate : false, direction: 'forward'});
        });
    
        return false;
    */
        var alert = this.alertCtrl.create({
            title: 'Create New Record',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Patient Name'
                },
                {
                    name: 'age',
                    placeholder: 'Age',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Create',
                    handler: function (formdata) {
                        if (formdata.name == "" || formdata.age == "") {
                            _this.showAlert();
                            return false;
                        }
                        else if (parseInt(formdata.age) == 0) {
                            _this.showAlert();
                            return false;
                        }
                        else {
                            _this.sqlite.create({
                                name: 'recorder.db',
                                location: 'default'
                            }).then(function (db) {
                                _this.datab = db;
                                //this.datab.executeSql(`Drop table patient_table`,{}); 
                                _this.datab.executeSql("create table if not exists patient_table (\n                          id INTEGER PRIMARY KEY AUTOINCREMENT,\n                          name VARCHAR(100), \n                          age VARCHAR(4), \n                          t1_1 VARCHAR(1000), \n                          t1_2 VARCHAR(1000),\n                          t1_3 VARCHAR(1000), \n                          t2_1 VARCHAR(1000), \n                          t2_2 VARCHAR(1000), \n                          t2_3 VARCHAR(1000), \n                          t3_1 VARCHAR(1000), \n                          t3_2 VARCHAR(1000), \n                          t3_3 VARCHAR(1000), \n                          t4_1 VARCHAR(1000), \n                          t4_2 VARCHAR(1000), \n                          t4_3 VARCHAR(1000), \n                          t5_1 VARCHAR(1000), \n                          t5_2 VARCHAR(1000), \n                          t5_3 VARCHAR(1000), \n                          createTime VARCHAR(50))", {});
                                _this.datab.executeSql("insert into patient_table (id , name , age ,\n                            t1_1, t1_2, t1_3, t2_1, t2_2 , t2_3 , \n                            t3_1, t3_2 , t3_3 ,t4_1, t4_2 , t4_3 ,\n                            t5_1, t5_2 , t5_3 , createTime) \n                          VALUES (null,'" + formdata.name + "','" + formdata.age + "',\n                          '[]','[]','[]',\n                          '[]','[]','[]',\n                          '[]','[]','[]',\n                          '[]','[]','[]',\n                          '[]','[]','[]','" + __WEBPACK_IMPORTED_MODULE_6_moment___default()().format('YYYY-MM-DD HH:mm:ss') + "');", {}).then(function (data2) {
                                    /*
                                                          this.datab.executeSql(`insert into patient_table (id , name , age ,
                                                            t1_1, t1_2, t1_3, t2_1, t2_2 , t2_3 ,
                                                            t3_1, t3_2 , t3_3 ,t4_1, t4_2 , t4_3 ,
                                                            t5_1, t5_2 , t5_3 , createTime)
                                                          VALUES (null,'`+formdata.name+`','`+formdata.age+`',
                                                          '[800,900,600,700,900,600,700,600,700,900,600]',
                                                          '[800,900,600,700,900,600,700,600,700,900,600]',
                                                          '[800,900,600,700,900,600,700,600,700,900,600]',
                                                          '[160,89,152,74,153,83,135,84,184,90,148,59]','[]','[]',
                                                          '[120,70,130,80,131,81,132,85,153,35,163,42]','[]','[]',
                                                          '[800,900]','[120,70,130,80,131,81,132,85]','[]',
                                                          '[]','[]','[]','`+moment().format('YYYY-MM-DD HH:mm:ss')+`');`, {}).then((data2) => {
                                      */
                                    _this.storage.set('id', data2.insertId).then(function (sss) {
                                        console.log("RECORD CREATED: " + data2.insertId + " " + formdata.name + " " + formdata.age + " " + __WEBPACK_IMPORTED_MODULE_6_moment___default()().format('YYYY-MM-DD HH:mm:ss'));
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__test1_test1__["a" /* Test1Page */], {}, { animate: false, direction: 'forward' });
                                    });
                                });
                            });
                        }
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Input Error',
            subTitle: 'Please fill in patient name and age.<BR>Age must be a number.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Rudra/Desktop/medical/src/pages/home/home.html"*/'\n\n<ion-content text-center no-bounce>\n\n    <div class="ext-box" style=" background:#fff;width:120%; margin-left:-10%;box-shadow: 0 40px 40px -40px #888; height:83%; z-index:99; position:relative"> \n        <div class="int-box">\n            <B style="font-size:4em ; font-weight:bold; color:#444">EWING\'S BATTERY<BR>autonomic dysfunction<br>diagnosis</B>\n                <BR><BR><BR><BR><BR><BR><BR><BR><BR>\n        \n        </div>\n    </div>\n<div style="background-color:rgb(240, 240, 240);text-align:left;padding-left:6%; height:17%;padding-top:40px; color:rgb(46,138,212) ; ">\n    <div (tap)="showPrompt()" style="display:inline-block; font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px ;  padding:10px">\n        START\n        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n        <div (tap)="clickRecord()" style="font-size: 1.5em; color:rgb(46,138,212);text-align:center; border:1px solid rgb(46,138,212); border-radius:75px; width:150px;  display:inline-block; padding:10px">\n            RECORD\n            </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n</div>\n\n<ion-fab right bottom>\n    <button ion-fab large color="white" style="box-shadow:0 0 40px #888" (click)="loadConfig()">\n      <img src="images/gear.png">\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/Rudra/Desktop/medical/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[350]);
//# sourceMappingURL=main.js.map