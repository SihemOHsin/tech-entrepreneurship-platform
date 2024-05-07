import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewConsultationRoutingModule } from './view-consultation-routing.module';
import { ViewConsultationComponent } from './view-consultation/view-consultation.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ViewConsultationComponent
  ],
    imports: [
        CommonModule,
        ViewConsultationRoutingModule,
        FormsModule
    ]
})
export class ViewConsultationModule { }
