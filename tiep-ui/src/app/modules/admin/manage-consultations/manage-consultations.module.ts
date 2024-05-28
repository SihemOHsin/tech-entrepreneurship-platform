import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageConsultationsRoutingModule } from './manage-consultations-routing.module';
import { ManageConsultationsComponent } from './manage-consultations/manage-consultations.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ManageConsultationsComponent
  ],
    imports: [
        CommonModule,
        ManageConsultationsRoutingModule,
        FormsModule
    ]
})
export class ManageConsultationsModule { }
