import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FloorPage } from '../pages/floor/Floor';
import { RoomPage } from '../pages/room/room';
import { IssuePage } from '../pages/issue/issue';
import { IssueviewPage } from '../pages/issueview/issueview';
import { LocalStorage } from '../providers/local-storage';
import { FormalinspectionPage } from '../pages/formalinspection/formalinspection';
import { OpeninspectionPage } from '../pages/openinspection/openinspection';
import { PreinspectionPage } from '../pages/preinspection/preinspection';
import { MaintenancePage } from '../pages/maintenance/maintenance';
import { HttpService } from '../providers/HttpService';
import { initBaseDB } from '../providers/initBaseDB';
//import { ImgeditorPage } from '../pages/imageeditor/imgeditor';
import { ShowimgPage } from '../pages/imageeditor/showimg';
import { ImageEditorModal } from '../pages/imageeditor/imageeditormodal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import {SQLite} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import {NativeService} from '../providers/nativeservice';
import { Network } from '@ionic-native/network';
import { Dialogs } from '@ionic-native/dialogs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
	FloorPage,
  RoomPage,
	IssuePage,
  IssueviewPage,
  ImageEditorModal,
  ShowimgPage,
  FormalinspectionPage,
  OpeninspectionPage,
  PreinspectionPage,
  MaintenancePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
	FloorPage,
  RoomPage,
	IssuePage,
  IssueviewPage,
  ImageEditorModal,
  ShowimgPage,
  FormalinspectionPage,
  OpeninspectionPage,
  PreinspectionPage,
  MaintenancePage,
    TabsPage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
