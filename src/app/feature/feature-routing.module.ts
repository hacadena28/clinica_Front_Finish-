import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'home',pathMatch:'full' },
  { path: 'home', loadChildren:() => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'clinic', loadChildren:() => import('./clinic/clinic.module').then(m => m.ClinicModule) },
  { path: 'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
