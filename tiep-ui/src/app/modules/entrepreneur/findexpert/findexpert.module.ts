import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindexpertRoutingModule } from './findexpert-routing.module';
import { FindexpertComponent } from './findexpert/findexpert.component';


@NgModule({
  declarations: [
    FindexpertComponent
  ],
  imports: [
    CommonModule,
    FindexpertRoutingModule
  ]
})
export class FindexpertModule { }
