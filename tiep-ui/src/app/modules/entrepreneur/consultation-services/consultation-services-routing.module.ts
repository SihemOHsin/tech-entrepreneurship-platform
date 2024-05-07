import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ManageConsultationsComponent
} from "../../admin/manage-consultations/manage-consultations/manage-consultations.component";
import {authGuard} from "../../../services/guard/auth.guard";

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
export class ConsultationServicesRoutingModule { }
