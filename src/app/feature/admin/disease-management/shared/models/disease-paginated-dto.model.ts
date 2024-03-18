export class DiseasePaginatedDto {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  id: string;
  name: string;
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
