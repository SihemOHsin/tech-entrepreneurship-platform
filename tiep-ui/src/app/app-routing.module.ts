import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontLayoutComponent} from "./layouts/front-layout/front-layout.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {ExpertLayoutComponent} from "./layouts/expert-layout/expert-layout.component";
import {EntrepreneurLayoutComponent} from "./layouts/entrepreneur-layout/entrepreneur-layout.component";
import {authGuard} from "./services/guard/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children:[
      {
        path: '',
        loadChildren:() => import('./modules/front/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        loadChildren:() => import('./modules/front/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren:() => import('./modules/front/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'activate-account',
        loadChildren:() => import('./modules/front/activate-account/activate-account.module').then(m => m.ActivateAccountModule)
      },
      {
        path: 'resourcehub',
        loadChildren:() => import('./modules/front/resourcehub/resourcehub.module').then(m => m.ResourcehubModule)
      },
      {
        path: 'findexpert',
        loadChildren:() => import('./modules/front/find-expert/find-expert.module').then(m => m.FindExpertModule)
      },
      {
        path: 'entrepreneurcommunity',
        loadChildren:() => import('./modules/front/entrepreneur-community/entrepreneur-community.module').then(m => m.EntrepreneurCommunityModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren:() => import('./modules/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
        canActivate : [authGuard]
      }
      ]
  },
  {
    path: 'expert',
    component: ExpertLayoutComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren:() => import('./modules/expert/expert-dashboard/expert-dashboard.module').then(m => m.ExpertDashboardModule),
        canActivate : [authGuard]
      }

    ]
  },
  {
    path: 'entrepreneur',
    component: EntrepreneurLayoutComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren:() => import('./modules/entrepreneur/entrepreneur-dashboard/entrepreneur-dashboard.module').then(m => m.EntrepreneurDashboardModule),
        canActivate : [authGuard]
      }

    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
