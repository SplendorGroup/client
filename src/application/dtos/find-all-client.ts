import { IsOptional, IsString, IsInt } from 'class-validator';

export class FindAllClientDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsInt()
  page?: number;
}
