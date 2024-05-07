import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FindexpertComponent} from "./findexpert/findexpert.component";
import {authGuard} from "../../../services/guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component: FindexpertComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindexpertRoutingModule { }
