import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessProfileRoutingModule } from './business-profile-routing.module';
import { BusinessProfileComponent } from './business-profile/business-profile.component';


@NgModule({
  declarations: [
    BusinessProfileComponent
  ],
  imports: [
    CommonModule,
    BusinessProfileRoutingModule
  ]
})
export class BusinessProfileModule { }
