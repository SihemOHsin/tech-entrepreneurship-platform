import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneursCommunityRoutingModule } from './entrepreneurs-community-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EntrepreneursCommunityComponent} from "./entrepreneurs-community/entrepreneurs-community.component";


@NgModule({
  declarations: [
    EntrepreneursCommunityComponent
  ],
  imports: [
    CommonModule,
    EntrepreneursCommunityRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntrepreneursCommunityModule { }
