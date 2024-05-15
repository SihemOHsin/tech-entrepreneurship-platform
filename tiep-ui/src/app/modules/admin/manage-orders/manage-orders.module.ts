import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ManageOrdersComponent
  ],
    imports: [
        CommonModule,
        ManageOrdersRoutingModule,
        ReactiveFormsModule,
        FormsModule,

    ]
})
export class ManageOrdersModule { }
