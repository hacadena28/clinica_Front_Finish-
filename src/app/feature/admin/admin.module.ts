import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpsManagementComponent} from './eps-management/eps-management.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {EpsService} from "./eps-management/shared/service/eps.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {NgxPaginationModule} from "ngx-pagination";
import {LayoutAdminComponent} from "./layout-admin/layout-admin.component";
import {SidebarAdminComponent} from "./sidebar-admin/sidebar-admin.component";
import {MatIconModule} from "@angular/material/icon";
import {PageAdminComponent} from "./page-admin/page-admin.component";
import {DoctorManagementComponent} from './doctor-management/doctor-management.component';
import {PatientManagementComponent} from './patient-management/patient-management.component';
import {DoctorService} from "./doctor-management/shared/Services/doctor.service";
import {UserService} from "./doctor-management/shared/Services/user.service";
import {TableEpsComponent} from './eps-management/components/table-eps/table-eps.component';
import {FormCreateEpsComponent} from './eps-management/components/form-create-eps/form-create-eps.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {FormUpdateEpsComponent} from "./eps-management/components/form-update-eps/form-update-eps.component";

import {TableDoctorComponent} from "./doctor-management/components/table-doctor/table-doctor.component";
import {
    FormCreateDoctorComponent
} from './doctor-management/components/form-create-doctor/form-create-doctor.component';
import {
    FormCreatePatientComponent
} from './patient-management/components/form-create-patient/form-create-patient.component';
import {TablePatientComponent} from './patient-management/components/table-patient/table-patient.component';
import {PatientService} from "./patient-management/shared/Services/patient.service";
import {
    FormUpdateDoctorComponent
} from './doctor-management/components/form-update-doctor/form-update-doctor.component';
import {
    FormUpdatePatientComponent
} from './patient-management/components/form-update-patient/form-update-patient.component';
import {UserPatientService} from "./patient-management/shared/Services/user-patient.service";
import {AdminManagementComponent} from './admin-management/admin-management.component';
import {FormUpdateAdminComponent} from './admin-management/components/form-update-admin/form-update-admin.component';
import {FormCreateAdminComponent} from './admin-management/components/form-create-admin/form-create-admin.component';
import {TableAdminComponent} from './admin-management/components/table-admin/table-admin.component';
import {UserAdminService} from "./admin-management/shared/Services/user-admin.service";
import {AdminService} from "./admin-management/shared/Services/admin.service";
import {MedicalHistoryService} from "../clinic/doctor/shared/services/medical-history.service";
import {DiseaseManagementComponent} from './disease-management/disease-management.component';
import {
    FormCreateDiseaseComponent
} from './disease-management/components/form-create-disease/form-create-disease.component';
import {
    FormUpdateDiseaseComponent
} from './disease-management/components/form-update-disease/form-update-disease.component';
import {TableDiseaseComponent} from './disease-management/components/table-disease/table-disease.component';
import {DiseaseService} from "./disease-management/shared/service/disease.service";
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        EpsManagementComponent,
        LayoutAdminComponent,
        SidebarAdminComponent,
        PageAdminComponent,
        TableEpsComponent,
        FormCreateEpsComponent,
        FormUpdateEpsComponent,
        PageAdminComponent,
        DoctorManagementComponent,
        PatientManagementComponent,
        TableDoctorComponent,
        FormCreateDoctorComponent,
        FormCreatePatientComponent,
        TablePatientComponent,
        FormUpdateDoctorComponent,
        FormUpdatePatientComponent,
        AdminManagementComponent,
        FormUpdateAdminComponent,
        FormCreateAdminComponent,
        TableAdminComponent,
        DiseaseManagementComponent,
        FormCreateDiseaseComponent,
        FormUpdateDiseaseComponent,
        TableDiseaseComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        NgxPaginationModule,
        MatIconModule,
        ReactiveFormsModule,
        MdbModalModule,
        MatButtonModule,
        MatChipsModule,
        MatCardModule,
    ],
    providers: [
        EpsService,
        DiseaseService,
        DoctorService,
        PatientService,
        AdminService,
        UserService,
        UserPatientService,
        UserAdminService,
        MedicalHistoryService],
})
export class AdminModule {
}
