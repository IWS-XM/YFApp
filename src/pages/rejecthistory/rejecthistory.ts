import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Rejecthistory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rejecthistory',
  templateUrl: 'rejecthistory.html',
})
export class Rejecthistory {

  hist: any;
  //参数 reject-list 必输， 格式如下：
  // [{issues:'设计缺陷；其他',additionnote:'水龙头生锈',reject-date:'2016-9-23',inspect-agent:'张三'}]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hist = navParams.data;
    if (this.hist == undefined || this.hist == null || this.hist.length < 1) {
      this.navCtrl.pop();
    }
  }

  getIssues(h: any): string {
    let s: string = "";
    s += h.designDefect ? "设计缺陷;" : "";
    s += h.qualityDefect ? "工程质量缺陷;" : "";
    s += h.promiseInconformity ? "销售承诺不符;" : "" ;
    s += h.others ? "其他" : "";
    
    return s;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Rejecthistory');
  }

}
