import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntrepreneurProfileComponent} from "./entrepreneur-profile/entrepreneur-profile.component";
import {authGuard} from "../../../services/guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component: EntrepreneurProfileComponent,
    canActivate:[authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepreneurProfileRoutingModule { }
