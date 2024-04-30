import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntrepreneurCommunityComponent} from "./entrepreneur-community/entrepreneur-community.component";

const routes: Routes = [
  {
    path:'',
    component: EntrepreneurCommunityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepreneurCommunityRoutingModule { }
