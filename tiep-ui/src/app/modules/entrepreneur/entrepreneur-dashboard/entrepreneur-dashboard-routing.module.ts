import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntrepreneurDashboardComponent} from "./entrepreneur-dashboard/entrepreneur-dashboard.component";
import {authGuard} from "../../../services/guard/auth.guard";

const routes: Routes = [
  {path: '',
  component: EntrepreneurDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepreneurDashboardRoutingModule { }
