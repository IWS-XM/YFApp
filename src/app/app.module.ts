import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {MyinfoPage} from '../pages/myinfo/myinfo';
import {MysettingsPage} from '../pages/mysettings/mysettings';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { FloorPage } from '../pages/floor/Floor';
import { RoomPage } from '../pages/room/room';
import { IssuePage } from '../pages/issue/issue';
import { IssueviewPage } from '../pages/issueview/issueview';
import { ReceiptPage } from '../pages/receipt/receipt';
import { RejectPage } from '../pages/reject/reject';
import { LocalStorage } from '../providers/local-storage';
import { FormalinspectionPage } from '../pages/formalinspection/formalinspection';
import { OpeninspectionPage } from '../pages/openinspection/openinspection';
import { PreinspectionPage } from '../pages/preinspection/preinspection';
import { MaintenancePage } from '../pages/maintenance/maintenance';
import { HttpService } from '../providers/HttpService';
import { initBaseDB } from '../providers/initBaseDB';
//import { ImgeditorPage } from '../pages/imageeditor/imgeditor';
import { ShowimgPage } from '../pages/imageeditor/showimg';
import {ChangePWPage} from '../pages/changepw/changepw';
import { MyPage } from '../pages/mypage/mypage';
import { MyTeamPage } from '../pages/myteam/myteam';
import { ImageEditorModal } from '../pages/imageeditor/imageeditormodal';
import { AddphonecontactsPage } from '../pages/addphonecontacts/addphonecontacts';
import { AddmembermanualPage } from '../pages/addmembermanual/addmembermanual';
import { Signature } from '../pages/signature/signature';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import {SQLite} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import {NativeService} from '../providers/nativeservice';
import { Network } from '@ionic-native/network';
import { Dialogs } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';
import { Contacts } from '@ionic-native/contacts';
import { SignaturePadModule } from 'angular2-signaturepad'
import { RoomoldPage } from '../pages/roomold/room';
import { FlooroldPage } from '../pages/floorold/Floor';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,    
	FloorPage,
  RoomPage,
	IssuePage,
  IssueviewPage,
  ImageEditorModal,
  ShowimgPage,
  MyPage,
  FormalinspectionPage,
  OpeninspectionPage,
  PreinspectionPage,
  MaintenancePage,
    TabsPage,
    MyinfoPage,
    MysettingsPage,
    ChangePWPage,
    MyTeamPage,
    AddphonecontactsPage,
    AddmembermanualPage,
    ReceiptPage,
    RejectPage,    
    Signature,
    RoomoldPage,
    FlooroldPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
	FloorPage,
  RoomPage,
	IssuePage,
  IssueviewPage,
  ImageEditorModal,
  ShowimgPage,
  MyPage,
  FormalinspectionPage,
  OpeninspectionPage,
  PreinspectionPage,
  MaintenancePage,
    TabsPage,
    MyinfoPage,
    MysettingsPage,
    ChangePWPage,
    MyTeamPage,
    AddphonecontactsPage,
    AddmembermanualPage,
      ReceiptPage,
    RejectPage,    
    Signature,
    RoomoldPage,
    FlooroldPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
     Camera,
    LocalStorage,
    SQLite,
    SQLitePorter,
    NativeService,
    HttpService,
    initBaseDB,
    Network,
    Dialogs,
    Toast,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
