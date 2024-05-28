import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindexpertRoutingModule } from './findexpert-routing.module';
import { FindexpertComponent } from './findexpert/findexpert.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FindexpertComponent
  ],
    imports: [
        CommonModule,
        FindexpertRoutingModule,
        ReactiveFormsModule
    ]
})
export class FindexpertModule { }
