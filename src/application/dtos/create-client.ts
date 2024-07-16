import { IsString, IsOptional, IsEmail, IsDateString } from 'class-validator';

export class CreateClientDTO {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  cnh: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;
}
