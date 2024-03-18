import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {AdminDto} from "../models/admin-dto.interface";
import {AdminPaginatedDto, Paginated} from '../models/admin-paginated-dto.model';
import {AdminUpdate} from "../models/admin-update";


@Injectable()
export class AdminService {

  constructor(protected http: HttpService) {
  }

  getAll(): Observable<AdminDto[]> {
    return this.http.doGet<AdminDto[]>(`${environment.appUrl}admin/all`)
      .pipe(
        map((response: any[]) => response.map(item => this.mapToAdminDto(
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
          item.birthdate
         )))
      );
  }


  getAllPaginated(page: number, recordsPerPage: number): Observable<Paginated<AdminPaginatedDto>> {
    return this.http.doGet<Paginated<AdminPaginatedDto>>(`${environment.appUrl}admin?page=${page}&recordsPerPage=${recordsPerPage}`)
      .pipe(
        map((response: any) => this.mapToAdminToPaginatedDto(response))
      );
  }

  getById(id: string): Observable<AdminPaginatedDto> {
    return this.http.doGet<AdminPaginatedDto>(`${environment.appUrl}admin/${id}`)
      .pipe(
        map((response: any) => new AdminPaginatedDto(
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
          ))
      );
  }

  getByName(name: string): Observable<AdminPaginatedDto> {
    return this.http.doGet<AdminPaginatedDto>(`${environment.appUrl}admin/name/${name}`)
      .pipe(
        map((response: any) => new AdminPaginatedDto(
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
          ))
      );
  }

  post(name: string): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}admin`, {name: name});
  }

  put(id: string, adminUpdate: AdminUpdate): Observable<void> {
    return this.http.doPut<any, void>(`${environment.appUrl}admin/${id}`, adminUpdate);
  }

  delete(id: string): Observable<void> {
    return this.http.doDelete<any>(`${environment.appUrl}admin/${id}`);
  }

  private mapToAdminDto(
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
    birthdate: Date
  ):
    AdminDto {
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
      birthdate: birthdate
    };
  }

  private mapToAdminToPaginatedDto(response: any): Paginated<AdminPaginatedDto> {
    return {
      page: response.page,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      records: response.records.map((record: any) => new AdminPaginatedDto(record.id,
        record.firstName,
        record.secondName,
        record.lastName,
        record.secondLastName,
        record.documentType,
        record.documentNumber,
        record.email,
        record.phone,
        record.address,
        record.birthdate
        ))
    }
  }
}


