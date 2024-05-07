import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReviewsRoutingModule } from './manage-reviews-routing.module';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';


@NgModule({
  declarations: [
    ManageReviewsComponent
  ],
  imports: [
    CommonModule,
    ManageReviewsRoutingModule
  ]
})
export class ManageReviewsModule { }
