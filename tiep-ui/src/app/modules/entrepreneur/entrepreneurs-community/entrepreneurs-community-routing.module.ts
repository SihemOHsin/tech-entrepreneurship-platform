import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EntrepreneursCommunityComponent
} from "../../expert/entrepreneurs-comminuty/entrepreneurs-community/entrepreneurs-community.component";
import {authGuard} from "../../../services/guard/auth.guard";

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
