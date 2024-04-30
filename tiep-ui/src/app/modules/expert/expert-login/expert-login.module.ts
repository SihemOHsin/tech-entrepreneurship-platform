import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertLoginRoutingModule } from './expert-login-routing.module';
import { ExpertLoginComponent } from './expert-login/expert-login.component';


@NgModule({
  declarations: [
    ExpertLoginComponent
  ],
  imports: [
    CommonModule,
    ExpertLoginRoutingModule
  ]
})
export class ExpertLoginModule { }
