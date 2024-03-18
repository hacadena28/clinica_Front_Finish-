import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {PatientDto} from "../models/patient-dto.interface";
import {PatientPaginatedDto, Paginated} from '../models/patient-paginated-dto.model';
import {DoctorUpdate} from "../../../doctor-management/shared/models/doctor-update";
import {PatientUpdate} from "../models/patient-update";


@Injectable()
export class PatientService {

  constructor(protected http: HttpService) {
  }

  getAll(): Observable<PatientDto[]> {
    return this.http.doGet<PatientDto[]>(`${environment.appUrl}patient/all`)
      .pipe(
        map((response: any[]) => response.map(item => this.mapToPatientDto(
          item.id,
          item.firstName,
          item.secondName,
          item.lastName,
          item.secondLastName,
          item.documentType,
          item.documentNumber,
          item.email,
          item.phone,
          item.address,
          item.birthdate,
          item.epsId)))
      );
  }


  getAllPaginated(page: number, recordsPerPage: number): Observable<Paginated<PatientPaginatedDto>> {
    return this.http.doGet<Paginated<PatientPaginatedDto>>(`${environment.appUrl}patient?page=${page}&recordsPerPage=${recordsPerPage}`)
      .pipe(
        map((response: any) => this.mapToPatientToPaginatedDto(response))
      );
  }

  getById(id: string): Observable<PatientPaginatedDto> {
    return this.http.doGet<PatientPaginatedDto>(`${environment.appUrl}patient/${id}`)
      .pipe(
        map((response: any) => new PatientPaginatedDto(
          response.id,
          response.firstName,
          response.secondName,
          response.lastName,
          response.secondLastName,
          response.documentType,
          response.documentNumber,
          response.email,
          response.phone,
          response.address,
          response.birthdate,
          response.epsId))
      );
  }

  getByName(name: string): Observable<PatientPaginatedDto> {
    return this.http.doGet<PatientPaginatedDto>(`${environment.appUrl}patient/name/${name}`)
      .pipe(
        map((response: any) => new PatientPaginatedDto(
          response.id,
          response.firstName,
          response.secondName,
          response.lastName,
          response.secondLastName,
          response.documentType,
          response.documentNumber,
          response.email,
          response.phone,
          response.address,
          response.birthdate,
          response.epsId))
      );
  }

  post(name: string): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}patient`, {name: name});
  }

  put(id: string, patientUpdate: PatientUpdate): Observable<void> {
    return this.http.doPut<any, void>(`${environment.appUrl}patient/${id}`, patientUpdate);
  }

  delete(id: string): Observable<void> {
    return this.http.doDelete<any>(`${environment.appUrl}patient/${id}`);
  }

  private mapToPatientDto(
    id: string,
    firstName: string,
    secondName: string,
    lastName: string,
    secondLastName: string,
    documentType: string,
    documentNumber: string,
    email: string,
    phone: string,
    address: string,
    birthdate: Date,
    epsId: string
  ):
    PatientDto {
    return {
      id: id,
      firstName: firstName,
      secondName: secondName,
      lastName: lastName,
      secondLastName: secondLastName,
      documentType: documentType,
      documentNumber: documentNumber,
      email: email,
      phone: phone,
      address: address,
      birthdate: birthdate,
      epsId: epsId
    };
  }

  private mapToPatientToPaginatedDto(response: any): Paginated<PatientPaginatedDto> {
    return {
      page: response.page,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      records: response.records.map((record: any) => new PatientPaginatedDto(record.id,
        record.firstName,
        record.secondName,
        record.lastName,
        record.secondLastName,
        record.documentType,
        record.documentNumber,
        record.email,
        record.phone,
        record.address,
        record.birthdate,
        record.epsId))
    }
  }
}


