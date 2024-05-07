import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageOrdersComponent} from "../../admin/manage-orders/manage-orders/manage-orders.component";
import {authGuard} from "../../../services/guard/auth.guard";


const routes: Routes = [
  {
    path:'',
    component: ManageOrdersComponent,
    canActivate:[authGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrdersRoutingModule { }
