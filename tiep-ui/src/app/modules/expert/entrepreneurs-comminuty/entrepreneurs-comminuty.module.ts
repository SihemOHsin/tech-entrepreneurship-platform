import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneursComminutyRoutingModule } from './entrepreneurs-comminuty-routing.module';
import { EntrepreneursCommunityComponent } from './entrepreneurs-community/entrepreneurs-community.component';


@NgModule({
  declarations: [
    EntrepreneursCommunityComponent
  ],
  imports: [
    CommonModule,
    EntrepreneursComminutyRoutingModule
  ]
})
export class EntrepreneursComminutyModule { }
