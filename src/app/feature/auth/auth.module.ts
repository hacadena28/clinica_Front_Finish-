import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {CreatePatientService} from "./shared/service/patient.service";
import {AuthService} from "./shared/service/auth.service";
import {EpsService} from "../admin/eps-management/shared/service/eps.service";
import {UserService} from "../admin/doctor-management/shared/Services/user.service";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [CreatePatientService, EpsService, AuthService,UserService]
})
export class AuthModule { }
