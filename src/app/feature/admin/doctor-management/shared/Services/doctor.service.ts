import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {DoctorDto} from "../models/doctor-dto.interface";
import {DoctorPaginatedDto, Paginated} from '../models/doctor-paginated-dto.model';
import {DoctorUpdate} from "../models/doctor-update";


@Injectable()
export class DoctorService {

  constructor(protected http: HttpService) {
  }

  getAll(): Observable<DoctorDto[]> {
    return this.http.doGet<DoctorDto[]>(`${environment.appUrl}doctor/all`)
      .pipe(
        map((response: any[]) => response.map(item => this.mapToDoctorDto(
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
          item.specialization)))
      );
  }


  getAllPaginated(page: number, recordsPerPage: number): Observable<Paginated<DoctorPaginatedDto>> {
    return this.http.doGet<Paginated<DoctorPaginatedDto>>(`${environment.appUrl}doctor?page=${page}&recordsPerPage=${recordsPerPage}`)
      .pipe(
        map((response: any) => this.mapToDoctorToPaginatedDto(response))
      );
  }

  getById(id: string): Observable<DoctorPaginatedDto> {
    return this.http.doGet<DoctorPaginatedDto>(`${environment.appUrl}doctor/${id}`)
      .pipe(
        map((response: any) => new DoctorPaginatedDto(response.id,
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
          response.specialization))
      );
  }

  getByName(name: string): Observable<DoctorPaginatedDto> {
    return this.http.doGet<DoctorPaginatedDto>(`${environment.appUrl}doctor/name/${name}`)
      .pipe(
        map((response: any) => new DoctorPaginatedDto(
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
          response.specialization))
      );
  }

  post(name: string): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}doctor`, {name: name});
  }

  put(id: string, doctorUpdate: DoctorUpdate): Observable<void> {
    return this.http.doPut<any, void>(`${environment.appUrl}doctor/${id}`, doctorUpdate);
  }

  delete(id: string): Observable<void> {
    return this.http.doDelete<any>(`${environment.appUrl}doctor/${id}`);
  }

  private mapToDoctorDto(
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
    specialization: string
  ):
    DoctorDto {
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
      specialization: specialization,
    };
  }

  private mapToDoctorToPaginatedDto(response: any): Paginated<DoctorPaginatedDto> {
    return {
      page: response.page,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      records: response.records.map((record: any) => new DoctorPaginatedDto(record.id,
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
        record.specialization))
    }
  }
}


