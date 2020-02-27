export class UserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class UserRO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  created: Date;
}
