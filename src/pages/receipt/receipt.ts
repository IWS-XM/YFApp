import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the Receipt page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})

export class ReceiptPage {

  _SCORE_LIST: Array<any>;
  receiptInfo: ReceiptInfo;
  viewType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.viewType = navParams.get('viewType');
    
    this.receiptInfo = new ReceiptInfo();
    this.receiptInfo.inspectType = '正式交付';
    this.receiptInfo.projId = 'lsdfsdfp[oi2jmlfdsufslfk';
    this.receiptInfo.projName = '同美花园II期';
    this.receiptInfo.buildingId = 'a+1oijldsf0ojlsdf823k0-';
    this.receiptInfo.buildingName = '3号楼';
    this.receiptInfo.floorId = '013lsjd;fl9lslfklskflsf';
    this.receiptInfo.floorName = '五楼';
    this.receiptInfo.roomId = navParams.get('roomid');
    this.receiptInfo.roomName = '0503单元';
    this.receiptInfo.ownerName = '张三丰/苗翠花';
    this.receiptInfo.ownerPhone = '173-29383382、188-02383123'; 
    this.receiptInfo.issueList = [{issueid:'1209ulsjdflsduf923klfjldsou',catagory:'顶蓬漏水', description:'严重漏水已造成鼓包', status:'已处理'},
      {issueid:'lskdfjpowejflsdufpsldf',catagory:'灯光不亮', description:'完全不亮，开关面板发黑', status:'待处理'}
    ];
    this.receiptInfo.electricMeter = 100;
    this.receiptInfo.waterMeter = 93;
    this.receiptInfo.gasMeter = 12;
    this.receiptInfo.keyReserve = 0;
    this.receiptInfo.dlvrDate = "2017/04/23";
    this.receiptInfo.satisfactionDlvr = 5;
    this.receiptInfo.satisfactionInspector = 3;
    this.receiptInfo.satisfactionLandscape = 4;
    this.receiptInfo.satisfactionQuality = 5;
    this.receiptInfo.satisfactionSystem = 5;
    this.receiptInfo.additionNote = '7/20之前联系装修公司';

    
    this._SCORE_LIST = [
      { name:"satisfactionDlvr", desc:"正式交付满意度"},
      { name:"satisfactionInspector", desc:"验房师满意度"},
      { name:"satisfactionSystem", desc:"验房系统满意度"},
      { name:"satisfactionQuality", desc:"工程质量满意度"},
      { name:"satisfactionLandscape", desc:"园林景观满意度"}];
    
  }

  getStars(score:number) {
    var ret = [];
    for(var i=0;i<score;i++){
      ret.push(i);
    }
    return ret;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Receipt');
  }

  doSubmit(){
    alert(this.receiptInfo.electricMeter);
  }

  doCancel(){
      if(this.navCtrl.canGoBack)
        this.navCtrl.pop();
  }

  starClick(type:string,index:number){
    var _className: string;
    _className = document.getElementById(type+index).className;
    for(var i=1;i<=5;i++){
        if(i<=index){
          document.getElementById(type+i).className=_className.replace(' ion-ios-star-outline ',' ion-ios-star ');
          document.getElementById(type+i)["ng-reflect-is-active"]="true";
        }else{
          document.getElementById(type+i).className=_className.replace(' ion-ios-star ',' ion-ios-star-outline ');
          document.getElementById(type+i)["ng-reflect-is-active"]="false";
        }
      }
      this.receiptInfo[type]=index;
      //console.log(type+' =' + this.receiptInfo[type] );
  }

}

export class ReceiptInfo{
  inspectType: any;
  projId: any; projName: string;
  buildingId: any; buildingName:string;
  floorId:any; floorName:string;
  roomId: any; roomName:string;
  ownerName:string; ownerPhone: string;
  issueList: Array<any>;
  electricMeter: number;
  waterMeter:number;
  gasMeter:number;
  keyReserve: number;
  dlvrDate: string;
  ownerSign: any;
  satisfactionDlvr: number;
  satisfactionInspector:number;
  satisfactionSystem: number;
  satisfactionQuality: number;
  satisfactionLandscape: number;
  additionNote: string;
}