import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {ManageReviewsComponent} from "./manage-reviews/manage-reviews.component";

const routes: Routes = [
  {
    path: '',
    component: ManageReviewsComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReviewsRoutingModule { }
