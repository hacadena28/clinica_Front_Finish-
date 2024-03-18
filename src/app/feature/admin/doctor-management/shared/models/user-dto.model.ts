export class UserModelDto {
  constructor(
    id: string,
    role: string,
    personId: string
  ) {
    this.id = id;
    this.role = role;
    this.personId = personId;
  }

  id: string;
  role: string;
  personId: string;


}
