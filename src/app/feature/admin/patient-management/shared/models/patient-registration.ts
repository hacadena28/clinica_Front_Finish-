export interface Patient {
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  eps: string;
}

export interface PatientRegistration {
  password: string;
  patient: Patient;
}
