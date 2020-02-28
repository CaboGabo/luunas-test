import { IsString, IsNumber } from 'class-validator';

export class ProductDTO {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsString()
  brand: string;
  @IsNumber()
  stock: number;
  @IsString()
  code: string;
}

export class ProductRO {
  id: string;
  created: Date;
  name: string;
  price: number;
  brand: string;
  stock: number;
  code: string;
  active: boolean;
}
