import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminLoginRoutingModule
  ]
})
export class AdminLoginModule { }
