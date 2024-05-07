import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {AdminDashboardComponent} from "../../admin/admin-dashboard/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path:'',
    component: AdminDashboardComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertDashboardRoutingModule { }
