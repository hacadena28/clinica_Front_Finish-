import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {UserDto} from "../../../doctor-management/shared/models/user-dto.interface";
import {UserModelDto} from "../../../doctor-management/shared/models/user-dto.model";
import {AdminRegistration} from "../models/admin-registration";


@Injectable()
export class UserAdminService {

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
    return this.http.doGet<UserDto>(`${environment.appUrl}user/documentnumber/${documentNumber},Admin`)
      .pipe(
        map((response: any) => new UserModelDto(
          response.id, response.role, response.personId))
      );
  }

  post(adminRegistration: AdminRegistration): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}user/admin`, {
      "password": adminRegistration.password,
      "admin": {
        "firstName": adminRegistration.admin.firstName,
        "secondName": adminRegistration.admin.secondName,
        "lastName": adminRegistration.admin.lastName,
        "secondLastName": adminRegistration.admin.secondLastName,
        "documentType": adminRegistration.admin.documentType,
        "documentNumber": adminRegistration.admin.documentNumber,
        "email": adminRegistration.admin.email,
        "phone": adminRegistration.admin.phone,
        "address": adminRegistration.admin.address,
        "birthdate": adminRegistration.admin.birthdate,
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


