import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertDashboardRoutingModule } from './expert-dashboard-routing.module';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';


@NgModule({
  declarations: [
    ExpertDashboardComponent
  ],
  imports: [
    CommonModule,
    ExpertDashboardRoutingModule
  ]
})
export class ExpertDashboardModule { }
