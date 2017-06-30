import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Signature } from '../signature/signature';

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

    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    @ViewChild('contentEl') contentEl: ElementRef;
    isEmpty = true;

    // tslint:disable-next-line:no-unused-variable
    private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 1,
        'canvasHeight': 180
    };

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
        this.receiptInfo.issueList = [{ issueid: '1209ulsjdflsduf923klfjldsou', catagory: '顶蓬漏水', description: '严重漏水已造成鼓包', status: '已处理' },
        { issueid: 'lskdfjpowejflsdufpsldf', catagory: '灯光不亮', description: '完全不亮，开关面板发黑', status: '待处理' }
        ];
        this.receiptInfo.electricMeter = 100;
        this.receiptInfo.waterMeter = 93;
        this.receiptInfo.gasMeter = 12;
        this.receiptInfo.keyReserve = 0;
        this.receiptInfo.ownerSign = "assets/img/little.jpg";
        this.receiptInfo.dlvrDate = "2017/04/23";
        this.receiptInfo.satisfactionDlvr = 5;
        this.receiptInfo.satisfactionInspector = 3;
        this.receiptInfo.satisfactionLandscape = 4;
        this.receiptInfo.satisfactionQuality = 5;
        this.receiptInfo.satisfactionSystem = 5;
        this.receiptInfo.additionNote = '7/20之前联系装修公司';


        this._SCORE_LIST = [
            { name: "satisfactionDlvr", desc: "正式交付满意度" },
            { name: "satisfactionInspector", desc: "验房师满意度" },
            { name: "satisfactionSystem", desc: "验房系统满意度" },
            { name: "satisfactionQuality", desc: "工程质量满意度" },
            { name: "satisfactionLandscape", desc: "园林景观满意度" }];

    }

    getStars(score: number) {
        var ret = [];
        for (var i = 0; i < score; i++) {
            ret.push(i);
        }
        return ret;
    }

    ionViewDidLoad() {
        // this.signaturePad is now available
        this.signaturePad.set('canvasWidth', this.contentEl.nativeElement.offsetWidth); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        document.getElementById("signPad").style.display = "none";
    }
    
    doSubmit() {
        alert(this.receiptInfo.electricMeter);
    }

    doCancel() {
        if (this.navCtrl.canGoBack)
            this.navCtrl.pop();
    }

    doSignature() {
        //this.navCtrl.push(Signature);
        document.getElementById("footbar").style.display = "none";
        document.getElementById("signPad").style.display = "";
    }
    endSignature() {
        document.getElementById("footbar").style.display = "";
        document.getElementById("signPad").style.display = "none";
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        // this.isEmpty = true;
        this.receiptInfo.ownerSign = this.signaturePad.toDataURL();
    }

    clearSign() {
        this.signaturePad.clear();
        this.receiptInfo.ownerSign = this.signaturePad.toDataURL();
    }

    starClick(type: string, index: number) {
        var normalClass = document.getElementById(type + index).className.replace("-star-outline ", "-star ");
        var outlineClass = document.getElementById(type + index).className.replace("-star ", "-star-outline ");
        for (var i = 1; i <= 5; i++) {
            if (i <= index) {
                document.getElementById(type + i).className = normalClass;
                document.getElementById(type + i)["ng-reflect-is-active"] = "true";
            } else {
                document.getElementById(type + i).className = outlineClass;
                document.getElementById(type + i)["ng-reflect-is-active"] = "false";
            }
        }
        this.receiptInfo[type] = index;
    }
}

export class ReceiptInfo {
    inspectType: any;
    projId: any; projName: string;
    buildingId: any; buildingName: string;
    floorId: any; floorName: string;
    roomId: any; roomName: string;
    ownerName: string; ownerPhone: string;
    issueList: Array<any>;
    electricMeter: number;
    waterMeter: number;
    gasMeter: number;
    keyReserve: number;
    dlvrDate: string;
    ownerSign: any;
    satisfactionDlvr: number;
    satisfactionInspector: number;
    satisfactionSystem: number;
    satisfactionQuality: number;
    satisfactionLandscape: number;
    additionNote: string;
}