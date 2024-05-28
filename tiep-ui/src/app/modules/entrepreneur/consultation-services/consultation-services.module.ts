import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationServicesRoutingModule } from './consultation-services-routing.module';
import {ManageConsultationsComponent} from "./manage-consultations/manage-consultations.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ManageConsultationsComponent
  ],
  imports: [
    CommonModule,
    ConsultationServicesRoutingModule,
    FormsModule
  ]
})
export class ConsultationServicesModule { }
