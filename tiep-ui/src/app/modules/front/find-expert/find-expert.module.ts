import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindExpertRoutingModule } from './find-expert-routing.module';
import { FindExpertComponent } from './find-expert/find-expert.component';


@NgModule({
  declarations: [
    FindExpertComponent
  ],
  imports: [
    CommonModule,
    FindExpertRoutingModule
  ]
})
export class FindExpertModule { }
