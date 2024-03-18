import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {map, Observable} from "rxjs";
import {DoctorDto} from "../../../../admin/doctor-management/shared/models/doctor-dto.interface";
import {environment} from "@env/environment";
import {DoctorPaginatedDto} from "../../../../admin/doctor-management/shared/models/doctor-paginated-dto.model";
import {MedicalHistoryDiseaseDto, MedicalHistoryDto} from "../models/medicalHistory-dto.interface";
import {MedicalHistoryPaginatedDto} from "../models/medicalHistory-paginated-dto.model";
import {Paginated} from "../../../patient/shared/interfaces/paginated";

@Injectable({
    providedIn: 'root'
})
export class MedicalHistoryService {

    constructor(protected http: HttpService) {
    }


    getById(patientId: string): Observable<Paginated<MedicalHistoryPaginatedDto>> {
        return this.http.doGet<Paginated<MedicalHistoryPaginatedDto>>(`${environment.appUrl}medicalhistory/user/${patientId}`)
            .pipe(
                map((response: any) => this.mapToMedicalHistoryToPaginatedDto(response))
            );
    }

    post(meedicalHistory: MedicalHistoryDto): Observable<void> {
        return this.http.doPost<any, void>(`${environment.appUrl}doctor`, {name: name});
    }

    put(id: string, medicalHistory: MedicalHistoryDto): Observable<void> {
        return this.http.doPut<any, void>(`${environment.appUrl}doctor/${id}`, medicalHistory);
    }


    private mapToMedicalHistoryDto(
        id: string,
        date: string,
        description: string,
        diagnosis:  MedicalHistoryDiseaseDto[],
        treatment: string,
        patientId: string,
    ):
        MedicalHistoryDto {
        return {
            id: id,
            date: date,
            description: description,
            diagnosis: diagnosis,
            treatment: treatment,
            patientId: patientId,
        };
    }

    private mapToMedicalHistoryToPaginatedDto(response: any): Paginated<MedicalHistoryPaginatedDto> {
        return {
            page: response.page,
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            records: response.records.map((record: any) => new MedicalHistoryPaginatedDto(
                record.id,
                record.date,
                record.description,
                record.diagnosis,
                record.treatment,
                record.patientId
            ))
        }
    }
}


