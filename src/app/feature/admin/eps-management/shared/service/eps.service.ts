import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {EpsDto} from "../models/eps-dto.interface";
import { EpsPaginatedDto, Paginated } from '../models/eps-paginated-dto.model';


@Injectable()
export class EpsService {

  constructor(protected http: HttpService) { }

  getAll(): Observable<EpsDto[]> {
    return this.http.doGet<EpsDto[]>(`${environment.appUrl}eps/all`)
      .pipe(
        map((response: any[]) => response.map(item => this.mapToEpsDto(item.id, item.name)))
      );
  }

  getAllPaginated(page: number, recordsPerPage: number): Observable<Paginated<EpsPaginatedDto>> {
    return this.http.doGet<Paginated<EpsPaginatedDto>>(`${environment.appUrl}eps?page=${page}&recordsPerPage=${recordsPerPage}`)
      .pipe(
        map((response: any) => this.mapToEpsToPaginatedDto(response))
      );
  }
  
  getById(id: string): Observable<EpsPaginatedDto> {
    return this.http.doGet<EpsPaginatedDto>(`${environment.appUrl}eps/${id}`)
      .pipe(
        map((response: any) => new EpsPaginatedDto(response.id, response.name, response.state))
        );
  }
  
  getByName(name: string): Observable<EpsPaginatedDto> {
    return this.http.doGet<EpsPaginatedDto>(`${environment.appUrl}eps/name/${name}`)
      .pipe(
        map((response: any) => new EpsPaginatedDto(response.id, response.name, response.state))
        );
  }

  post(name: string): Observable<void> {
    return this.http.doPost<any, void>(`${environment.appUrl}eps`, { name: name });
  }

  put(id: string, newName: string): Observable<void> {
    return this.http.doPut<any, void>(`${environment.appUrl}eps/${id}`, { id: id, newName: newName });
  }

  delete(id: string): Observable<void> {
    return this.http.doDelete<any>(`${environment.appUrl}eps/${id}`);
  }

  private mapToEpsDto(id: string, name: string): EpsDto {
    return {
      id: id,
      name: name,
    };
  }

  private mapToEpsToPaginatedDto(response: any): Paginated<EpsPaginatedDto> {
    return {
      page: response.page,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      records: response.records.map((record: any) => new EpsPaginatedDto(record.id, record.name, record.state))
    }
  }
}
