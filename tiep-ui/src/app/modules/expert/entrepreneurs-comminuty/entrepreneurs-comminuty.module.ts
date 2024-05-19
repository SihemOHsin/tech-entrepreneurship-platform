import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneursComminutyRoutingModule } from './entrepreneurs-comminuty-routing.module';
import { EntrepreneursCommunityComponent } from './entrepreneurs-community/entrepreneurs-community.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EntrepreneursCommunityComponent
  ],
  imports: [
    CommonModule,
    EntrepreneursComminutyRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntrepreneursComminutyModule { }
