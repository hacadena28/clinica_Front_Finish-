import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {CreateUserPatient} from "../models/create-patient.interface";


@Injectable()
export class CreatePatientService {

  constructor(protected http: HttpService) { }

  public create(userPatient: CreateUserPatient): Observable<void>{
    userPatient.patient.address = "456 Oak Street";
    return this.http.doPost<CreateUserPatient,void>(`${environment.appUrl}user/patient`, userPatient);
  }
}
