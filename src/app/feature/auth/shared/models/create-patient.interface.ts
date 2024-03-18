interface CreatePatient {
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  birthdate: Date;
  epsId: string;
}

export interface UserLoginDto {
  userId: string;
  documentNumber: string;
  role: string;
}

export interface CreateUserPatient{
  password: string;
  patient: CreatePatient;
}
