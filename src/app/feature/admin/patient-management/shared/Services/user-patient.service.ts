import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {PatientRegistration} from "../models/patient-registration";
import {UserDto} from "../../../doctor-management/shared/models/user-dto.interface";
import {UserModelDto} from "../../../doctor-management/shared/models/user-dto.model";


@Injectable()
export class UserPatientService {

  constructor(protected http: HttpService) {
  }

  getAll(): Observable<UserDto[]> {
    return this.http.doGet<UserDto[]>(`${environment.appUrl}user/all`)
      .pipe(
        map((response: any[]) => response.map(item => this.mapToUserDto(
          item.id,
          item.role,
          item.personId
        )))
      );
  }


  getById(id: string): Observable<UserDto> {
    return this.http.doGet<UserDto>(`${environment.appUrl}user/${id}`)
      .pipe(
        map((response: any) => new UserModelDto(response.id, response.role, response.personId
        ))
      );
  }

  getByDocumentNumber(documentNumber: string): Observable<UserDto> {
    return this.http.doGet<UserDto>(`${environment.appUrl}user/documentnumber/${documentNumber},Patient`)
      .pipe(
        map((response: any) => new UserModelDto(
          response.id, response.role, response.personId))
      );
  }

  post(patientRegistration: PatientRegistration): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}user/patient`, {
      "password": patientRegistration.password,
      "patient": {
        "firstName": patientRegistration.patient.firstName,
        "secondName": patientRegistration.patient.secondName,
        "lastName": patientRegistration.patient.lastName,
        "secondLastName": patientRegistration.patient.secondLastName,
        "documentType": patientRegistration.patient.documentType,
        "documentNumber": patientRegistration.patient.documentNumber,
        "email": patientRegistration.patient.email,
        "phone": patientRegistration.patient.phone,
        "address": patientRegistration.patient.address,
        "birthdate": patientRegistration.patient.birthdate,
        "epsId": patientRegistration.patient.eps
      }
    });
  }

  put(id: string, newName: string): Observable<void> {
    return this.http.doPut<any, void>(`${environment.appUrl}user/${id}`, {id: id, newName: newName});
  }

  delete(id: string): Observable<void> {
    return this.http.doDelete<any>(`${environment.appUrl}user/${id}`);
  }

  private mapToUserDto(
    id: string,
    role: string,
    personId: string
  ):
    UserDto {
    return {
      id: id,
      role: role,
      personId: personId
    };
  }


}


