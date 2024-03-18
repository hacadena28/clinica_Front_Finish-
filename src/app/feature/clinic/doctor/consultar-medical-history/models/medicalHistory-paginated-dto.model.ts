import {MedicalHistoryDiseaseDto} from "./medicalHistory-dto.interface";

export class MedicalHistoryPaginatedDto {

    constructor(
        id: string,
        date: string,
        description: string,
        diagnosis:  MedicalHistoryDiseaseDto[],
        treatment: string,
        patientId: string) {

        this.id = id;
        this.date = date;
        this.description = description;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.patientId = patientId;

    }

    id: string;
    date: string;
    description: string;
    diagnosis:  MedicalHistoryDiseaseDto[];
    treatment: string;
    patientId: string;
}

export class Paginated<T> {
    page: number;
    totalRecords: number;
    totalPages: number;
    records: T[];


    constructor(page: number, totalRecords: number, totalPages: number, records: T[]) {
        this.page = page;
        this.totalRecords = totalRecords;
        this.totalPages = totalPages;
        this.records = records;
    }
}
