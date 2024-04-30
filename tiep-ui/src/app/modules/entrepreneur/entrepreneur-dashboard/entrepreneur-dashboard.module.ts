import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneurDashboardRoutingModule } from './entrepreneur-dashboard-routing.module';
import { EntrepreneurDashboardComponent } from './entrepreneur-dashboard/entrepreneur-dashboard.component';


@NgModule({
  declarations: [
    EntrepreneurDashboardComponent
  ],
  imports: [
    CommonModule,
    EntrepreneurDashboardRoutingModule
  ]
})
export class EntrepreneurDashboardModule { }
