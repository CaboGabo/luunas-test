import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class UserRO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  created: Date;
  active: boolean;
}
