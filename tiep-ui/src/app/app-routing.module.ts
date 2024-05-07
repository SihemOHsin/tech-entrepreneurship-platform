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
      },
      {
        path: 'manage-users',
        loadChildren:() => import('./modules/admin/manage-users/manage-users.module').then(m => m.ManageUsersModule),
        canActivate : [authGuard]
      },
      {
        path: 'manage-entrepreneurs',
        loadChildren:() => import('./modules/admin/manage-entrepreneurs/manage-entrepreneurs.module').then(m => m.ManageEntrepreneursModule),
        canActivate : [authGuard]
      },
      {
        path: 'manage-itexperts',
        loadChildren:() => import('./modules/admin/manage-itexperts/manage-itexperts.module').then(m => m.ManageItexpertsModule),
        canActivate : [authGuard]
      },
      {
        path: 'manage-orders',
        loadChildren:() => import('./modules/admin/manage-orders/manage-orders.module').then(m => m.ManageOrdersModule),
        canActivate : [authGuard]
      },
      {
        path: 'manage-consultations',
        loadChildren:() => import('./modules/admin/manage-consultations/manage-consultations.module').then(m => m.ManageConsultationsModule),
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
      },
      {
        path: 'community',
        loadChildren:() => import('./modules/expert/entrepreneurs-comminuty/entrepreneurs-comminuty.module').then(m => m.EntrepreneursComminutyModule),
        canActivate : [authGuard]
      },
      {
        path: 'business',
        loadChildren:() => import('./modules/expert/business-profile/business-profile.module').then(m => m.BusinessProfileModule),
        canActivate : [authGuard]
      },
      {
        path: 'reviews',
        loadChildren:() => import('./modules/expert/manage-reviews/manage-reviews.module').then(m => m.ManageReviewsModule),
        canActivate : [authGuard]
      },

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
      },
      {
        path: 'profile',
        loadChildren:() => import('./modules/entrepreneur/entrepreneur-profile/entrepreneur-profile.module').then(m => m.EntrepreneurProfileModule),
        canActivate : [authGuard]
      },
      {
        path: 'consultation',
        loadChildren:() => import('./modules/entrepreneur/consultation-services/consultation-services.module').then(m => m.ConsultationServicesModule),
        canActivate : [authGuard]
      },
      {
        path: 'findexpert',
        loadChildren:() => import('./modules/entrepreneur/findexpert/findexpert.module').then(m => m.FindexpertModule),
        canActivate : [authGuard]
      },
      {
        path: 'manage-orders',
        loadChildren:() => import('./modules/entrepreneur/manage-orders/manage-orders.module').then(m => m.ManageOrdersModule),
        canActivate : [authGuard]
      },
      {
        path: 'consultations',
        loadChildren:() => import('./modules/entrepreneur/view-consultation/view-consultation.module').then(m => m.ViewConsultationModule),
        canActivate : [authGuard]
      },
      {
        path: 'entrepreneurs',
        loadChildren:() => import('./modules/entrepreneur/entrepreneurs-community/entrepreneurs-community.module').then(m => m.EntrepreneursCommunityModule),
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
