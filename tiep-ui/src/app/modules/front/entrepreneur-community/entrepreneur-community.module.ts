import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneurCommunityRoutingModule } from './entrepreneur-community-routing.module';
import { EntrepreneurCommunityComponent } from './entrepreneur-community/entrepreneur-community.component';


@NgModule({
  declarations: [
    EntrepreneurCommunityComponent
  ],
  imports: [
    CommonModule,
    EntrepreneurCommunityRoutingModule
  ]
})
export class EntrepreneurCommunityModule { }
