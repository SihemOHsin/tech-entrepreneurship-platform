import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepreneurCommunityRoutingModule } from './entrepreneur-community-routing.module';
import { EntrepreneurCommunityComponent } from './entrepreneur-community/entrepreneur-community.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EntrepreneurCommunityComponent
  ],
    imports: [
        CommonModule,
        EntrepreneurCommunityRoutingModule,
        FormsModule
    ]
})
export class EntrepreneurCommunityModule { }
