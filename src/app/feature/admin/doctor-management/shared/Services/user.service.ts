import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {UserDto} from "../models/user-dto.interface";
import {UserModelDto} from "../models/user-dto.model";
import {Doctor, DoctorRegistration} from "../models/doctor-registration";


@Injectable()
export class UserService {

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
    return this.http.doGet<UserDto>(`${environment.appUrl}user/documentnumber/${documentNumber},Doctor`)
      .pipe(
        map((response: any) => new UserModelDto(
          response.id, response.role, response.personId))
      );
  }

  post(doctorRegistration: DoctorRegistration): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}user/doctor`, {
      "password": doctorRegistration.password,
      "doctor": {
        "firstName": doctorRegistration.doctor.firstName,
        "secondName": doctorRegistration.doctor.secondName,
        "lastName": doctorRegistration.doctor.lastName,
        "secondLastName": doctorRegistration.doctor.secondLastName,
        "documentType": doctorRegistration.doctor.documentType,
        "documentNumber": doctorRegistration.doctor.documentNumber,
        "email": doctorRegistration.doctor.email,
        "phone": doctorRegistration.doctor.phone,
        "address": doctorRegistration.doctor.address,
        "birthdate": doctorRegistration.doctor.birthdate,
        "specialization": doctorRegistration.doctor.specialization
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

  recoveryPassword(documentNumber:string):Observable<void>{
    return this.http.doGet<any>(`${environment.appUrl}user/recovery-password/${documentNumber}`);
  }


}


