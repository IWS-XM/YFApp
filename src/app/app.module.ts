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
import { ImageeditorPage } from '../pages/imageeditor/imageeditor';
import { CavimageeditorPage } from '../pages/imageeditor/cavimageeditor';
import { HttpService } from '../providers/HttpService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { IonicStorageModule } from '@ionic/storage';
import {NativeService} from '../providers/nativeservice';
// import {CSDKImageEditor} from '@ionic-native/phonegap-plugin-csdk-image-editor';

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
  ImageeditorPage,
  CavimageeditorPage,
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
  ImageeditorPage,
  CavimageeditorPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
  	Camera,
    LocalStorage,
    NativeService,
    HttpService,
    // CSDKImageEditor,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
