import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ExpertLayoutComponent } from './expert-layout/expert-layout.component';
import { EntrepreneurLayoutComponent } from './entrepreneur-layout/entrepreneur-layout.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    ExpertLayoutComponent,
    EntrepreneurLayoutComponent,
    FrontLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class LayoutsModule { }
