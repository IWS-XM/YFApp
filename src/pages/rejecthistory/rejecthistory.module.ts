import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Rejecthistory } from './rejecthistory';

@NgModule({
  declarations: [
    Rejecthistory,
  ],
  imports: [
    IonicPageModule.forChild(Rejecthistory),
  ],
  exports: [
    Rejecthistory
  ]
})
export class RejecthistoryModule {}
