import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../../services/guard/auth.guard";
import {ManageUsersComponent} from "./manage-users/manage-users.component";

const routes: Routes = [
  {
  path:'',
  component: ManageUsersComponent,
  canActivate : [authGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
