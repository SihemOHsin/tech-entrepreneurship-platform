import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpertLoginComponent} from "./expert-login/expert-login.component";
import {authGuard} from "../../../services/guard/auth.guard";

const routes: Routes = [
  {
    path:'',
    component:ExpertLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertLoginRoutingModule { }
