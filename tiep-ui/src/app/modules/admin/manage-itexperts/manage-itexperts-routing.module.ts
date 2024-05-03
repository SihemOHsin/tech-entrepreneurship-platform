import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {ManageItexpertsComponent} from "./manage-itexperts/manage-itexperts.component";

const routes: Routes = [
  {
    path:'',
    component:ManageItexpertsComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItexpertsRoutingModule { }
