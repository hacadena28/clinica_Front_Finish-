export class DoctorPaginatedDto {
  constructor(
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
    birthdate: Date,
    specialization: string) {
    this.id = id;
    this.firstName = firstName;
    this.secondName=secondName;
    this.lastName=lastName;
    this.secondLastName=secondLastName;
    this.documentType=documentType;
    this.documentNumber=documentNumber;
    this.email=email;
    this.phone=phone;
    this.address=address;
    this.birthdate=birthdate;
    this.specialization =specialization;

  }

  id: string;
  firstName:string;
  secondName:string;
  lastName:string;
  secondLastName:string;
  documentType:string;
  documentNumber:string;
  email:string;
  phone:string;
  address:string;
  birthdate: Date;
  specialization : string;
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
