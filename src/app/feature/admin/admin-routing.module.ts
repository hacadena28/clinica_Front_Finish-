import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EpsManagementComponent} from "./eps-management/eps-management.component";
import {PageAdminComponent} from "./page-admin/page-admin.component";
import {DoctorManagementComponent} from "./doctor-management/doctor-management.component";
import {PatientManagementComponent} from "./patient-management/patient-management.component";
import {AdminManagementComponent} from "./admin-management/admin-management.component";
import {DiseaseManagementComponent} from "./disease-management/disease-management.component";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PageAdminComponent,
    children: [
      {path: 'eps', component: EpsManagementComponent},
      {path: 'disease', component: DiseaseManagementComponent},
      {path: 'doctor', component: DoctorManagementComponent},
      {path: 'patient', component: PatientManagementComponent},
      {path: 'admin', component: AdminManagementComponent},
      {path: 'dashboard', component: DashboardComponent},

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
