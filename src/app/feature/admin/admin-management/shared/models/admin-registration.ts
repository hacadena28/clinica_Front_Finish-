export interface Admin {
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
}

export interface AdminRegistration {
  password: string;
  admin: Admin;
}
