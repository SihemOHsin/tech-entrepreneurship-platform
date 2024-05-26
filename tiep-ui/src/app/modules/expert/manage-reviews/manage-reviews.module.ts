import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReviewsRoutingModule } from './manage-reviews-routing.module';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ManageReviewsComponent
  ],
  imports: [
    CommonModule,
    ManageReviewsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageReviewsModule { }
