import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResourcehubComponent} from "./resourcehub/resourcehub.component";

const routes: Routes = [
  {
    path:'',
    component: ResourcehubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcehubRoutingModule { }
