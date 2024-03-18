import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {map, Observable} from "rxjs";
import {environment} from "@env/environment";
import {DiseaseDto} from "../models/disease-dto.interface";
import {DiseasePaginatedDto, Paginated} from "../models/disease-paginated-dto.model";

@Injectable({
    providedIn: 'root'
})
export class DiseaseService {

    constructor(protected http: HttpService) {
    }

    getAll(): Observable<DiseaseDto[]> {
        return this.http.doGet<DiseaseDto[]>(`${environment.appUrl}disease/all`)
            .pipe(
                map((response: any[]) => response.map(item => this.mapToDiseaseDto(item.id, item.name)))
            );
    }

    getAllPaginated(page: number, recordsPerPage: number): Observable<Paginated<DiseasePaginatedDto>> {
        return this.http.doGet<Paginated<DiseasePaginatedDto>>(`${environment.appUrl}disease?page=${page}&recordsPerPage=${recordsPerPage}`)
            .pipe(
                map((response: any) => this.mapToDiseaseToPaginatedDto(response))
            );
    }

    getById(id: string): Observable<DiseasePaginatedDto> {
        return this.http.doGet<DiseasePaginatedDto>(`${environment.appUrl}disease/${id}`)
            .pipe(
                map((response: any) => new DiseasePaginatedDto(response.id, response.name))
            );
    }

    getByName(name: string): Observable<DiseasePaginatedDto> {
        return this.http.doGet<DiseasePaginatedDto>(`${environment.appUrl}disease/name/${name}`)
            .pipe(
                map((response: any) => new DiseasePaginatedDto(response.id, response.name))
            );
    }

    post(name: string): Observable<void> {
        return this.http.doPost<any, void>(`${environment.appUrl}disease`, {name: name});
    }

    put(id: string, newName: string): Observable<void> {
        return this.http.doPut<any, void>(`${environment.appUrl}disease/${id}`, {id: id, newName: newName});
    }

    delete(id: string): Observable<void> {
        return this.http.doDelete<any>(`${environment.appUrl}disease/${id}`);
    }

    private mapToDiseaseDto(id: string, name: string): DiseaseDto {
        return {
            id: id,
            name: name,
        };
    }

    private mapToDiseaseToPaginatedDto(response: any): Paginated<DiseasePaginatedDto> {
        return {
            page: response.page,
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            records: response.records.map((record: any) => new DiseasePaginatedDto(record.id, record.name))
        }
    }
}
