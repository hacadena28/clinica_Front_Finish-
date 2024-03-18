export interface MedicalHistoryDto{
  id: string;
  date: string;
  description: string;
  diagnosis: MedicalHistoryDiseaseDto[];
  treatment: string;
  patientId: string;
}



export interface MedicalHistoryDiseaseDto{
  id: string;
    medicalHistoryId: string;
    diseaseId:string;
    disease : DiseasesDto;
}

export interface DiseasesDto{
  id:string;
  name:string;
}
