import { Global, Module } from '@nestjs/common';
import { CreateClientUseCase } from './usecases/create-client';
import { FindOneClientUseCase } from './usecases/find-one-client';
import { FindAllClientUseCase } from './usecases/find-all-client';
import { UpdateClientUseCase } from './usecases/update-client';
import { DeleteClientUseCase } from './usecases/delete-client';
import { ClientService } from './services/client';

@Global()
@Module({
  providers: [
    CreateClientUseCase,
    FindOneClientUseCase,
    FindAllClientUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    ClientService
  ],
  exports: [
    CreateClientUseCase,
    FindOneClientUseCase,
    FindAllClientUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    ClientService
  ],
})
export class Application {}
