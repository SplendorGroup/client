import { IsString } from 'class-validator';

export class DeleteClientDTO {
  @IsString()
  id: string;
}
