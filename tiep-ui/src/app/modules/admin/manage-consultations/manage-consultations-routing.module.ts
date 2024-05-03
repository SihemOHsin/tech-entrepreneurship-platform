import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {ManageConsultationsComponent} from "./manage-consultations/manage-consultations.component";

const routes: Routes = [
  {
    path:'',
    component: ManageConsultationsComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageConsultationsRoutingModule { }
