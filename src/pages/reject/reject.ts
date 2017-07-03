import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { Rejecthistory } from '../rejecthistory/rejecthistory';
/**
 * Generated class for the Reject page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-reject',
  templateUrl: 'reject.html',
})
export class RejectPage {

  rejectInfo: RejectInfo;
  rejectHistory: Array<RejectInfo>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rejectInfo = new RejectInfo();
    this.rejectInfo.others = true;
    this.rejectInfo.additionNote = "";
    this.rejectHistory = [{
      designDefect: true,
      qualityDefect: false,
      promiseInconformity: true,
      others: false,
      additionNote: '',
      rejectDate: new Date('2017/06/18'),
      inspectAgent: '黄龙江'
    },
    {
      designDefect: false,
      qualityDefect: true,
      promiseInconformity: false,
      others: false,
      additionNote: '顶堋漏水',
      rejectDate: new Date('2017/06/23'),
      inspectAgent: '李小龙'
    },
    {
      designDefect: false,
      qualityDefect: true,
      promiseInconformity: false,
      others: true,
      additionNote: '渗水问题仍未解决',
      rejectDate: new Date('2017/06/26'),
      inspectAgent: '李小龙'
    }
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Reject');
  }

  showRejectHistory() {
    this.navCtrl.push(Rejecthistory, this.rejectHistory);
  }
  doSubmit() {
    alert(this.rejectInfo.rejectDate.toLocaleDateString());
  }
}

export class RejectInfo {
  designDefect: boolean;  //设计缺陷
  qualityDefect: boolean;  //工程质量缺陷
  promiseInconformity: boolean; //销售承诺不符
  others: boolean;  //其他
  additionNote: string;  //附注
  rejectDate: Date;  //暂不收楼日期
  inspectAgent: string;  //验房工程师
  constructor() {
    this.rejectDate = new Date();
    this.additionNote = '';
  }
}
