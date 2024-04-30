import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpertDashboardComponent} from "./expert-dashboard/expert-dashboard.component";
import {authGuard} from "../../../services/guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component: ExpertDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertDashboardRoutingModule { }
