import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {ViewConsultationComponent} from "./view-consultation/view-consultation.component";

const routes: Routes = [
  {
    path:'',
    component: ViewConsultationComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewConsultationRoutingModule { }
