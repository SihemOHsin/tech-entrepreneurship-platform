import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {authGuard} from "../../../services/guard/auth.guard";
import {EntrepreneursCommunityComponent} from "./entrepreneurs-community/entrepreneurs-community.component";

const routes: Routes = [
  {
    path: '',
    component: EntrepreneursCommunityComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepreneursCommunityRoutingModule { }
