import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {BusinessProfileComponent} from "./business-profile/business-profile.component";

const routes: Routes = [
  {
    path: '',
    component: BusinessProfileComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessProfileRoutingModule { }
