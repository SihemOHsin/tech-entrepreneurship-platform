import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FindExpertComponent} from "./find-expert/find-expert.component";

const routes: Routes = [
  {
    path:'',
    component: FindExpertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindExpertRoutingModule { }
