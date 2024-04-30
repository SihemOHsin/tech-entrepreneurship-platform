import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcehubRoutingModule } from './resourcehub-routing.module';
import { ResourcehubComponent } from './resourcehub/resourcehub.component';


@NgModule({
  declarations: [
    ResourcehubComponent
  ],
  imports: [
    CommonModule,
    ResourcehubRoutingModule
  ]
})
export class ResourcehubModule { }
