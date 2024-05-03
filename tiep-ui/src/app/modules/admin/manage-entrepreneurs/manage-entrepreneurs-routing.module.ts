import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageEntrepreneursComponent} from "./manage-entrepreneurs/manage-entrepreneurs.component";
import {authGuard} from "../../../services/guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component:ManageEntrepreneursComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEntrepreneursRoutingModule { }
