import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneurProfileRoutingModule } from './entrepreneur-profile-routing.module';
import { EntrepreneurProfileComponent } from './entrepreneur-profile/entrepreneur-profile.component';


@NgModule({
  declarations: [
    EntrepreneurProfileComponent
  ],
  imports: [
    CommonModule,
    EntrepreneurProfileRoutingModule
  ]
})
export class EntrepreneurProfileModule { }
