import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageItexpertsRoutingModule } from './manage-itexperts-routing.module';
import { ManageItexpertsComponent } from './manage-itexperts/manage-itexperts.component';


@NgModule({
  declarations: [
    ManageItexpertsComponent
  ],
  imports: [
    CommonModule,
    ManageItexpertsRoutingModule
  ]
})
export class ManageItexpertsModule { }
