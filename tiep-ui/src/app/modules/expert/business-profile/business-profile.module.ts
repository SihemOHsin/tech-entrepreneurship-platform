import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessProfileRoutingModule } from './business-profile-routing.module';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BusinessProfileComponent
  ],
    imports: [
        CommonModule,
        BusinessProfileRoutingModule,
        ReactiveFormsModule
    ]
})
export class BusinessProfileModule { }
