export interface Doctor {
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
  specialization: string;
}

export interface DoctorRegistration {
  password: string;
  doctor: Doctor;
}
