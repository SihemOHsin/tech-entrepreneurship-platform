import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEntrepreneursRoutingModule } from './manage-entrepreneurs-routing.module';
import { ManageEntrepreneursComponent } from './manage-entrepreneurs/manage-entrepreneurs.component';


@NgModule({
  declarations: [
    ManageEntrepreneursComponent
  ],
  imports: [
    CommonModule,
    ManageEntrepreneursRoutingModule
  ]
})
export class ManageEntrepreneursModule { }
