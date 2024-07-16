import { IsString } from 'class-validator';

export class FindOneClientDTO {
  @IsString()
  id: string;
}
