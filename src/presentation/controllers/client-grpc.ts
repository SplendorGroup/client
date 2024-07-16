import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateClientUseCase } from '@/application/usecases/create-client';
import { UpdateClientUseCase } from '@/application/usecases/update-client';
import { FindOneClientUseCase } from '@/application/usecases/find-one-client';
import { FindAllClientUseCase } from '@/application/usecases/find-all-client';
import { DeleteClientUseCase } from '@/application/usecases/delete-client';
import { CreateClientDTO } from '@/application/dtos/create-client';
import { UpdateClientDTO } from '@/application/dtos/update-client';
import { FindOneClientDTO } from '@/application/dtos/find-one-client';
import { FindAllClientDTO } from '@/application/dtos/find-all-client';
import { DeleteClientDTO } from '@/application/dtos/delete-client';
import { ValidateGrpcInput } from '@/infraestructure/decorators/validate-grpc-input';

@Controller()
export class ClientGrpcController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly findOneClientUseCase: FindOneClientUseCase,
    private readonly findAllClientUseCase: FindAllClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @GrpcMethod('ClientService', 'CreateClient')
  @ValidateGrpcInput(
    { body: CreateClientDTO },
    {
      code: 2205,
      identify: 'CLIENT_UNPROCESSABLE_CONTENT',
    },
  )
  async createClient(data: { body: CreateClientDTO }) {
    return await this.createClientUseCase.execute(data.body);
  }

  @GrpcMethod('ClientService', 'UpdateClient')
  @ValidateGrpcInput(
    { params: { id: String }, body: UpdateClientDTO },
    {
      code: 2205,
      identify: 'CLIENT_UNPROCESSABLE_CONTENT',
    },
  )
  async updateClient(data: { params: { id: string }, body: UpdateClientDTO }) {
    return await this.updateClientUseCase.execute(data.params.id, data.body);
  }

  @GrpcMethod('ClientService', 'GetClients')
  @ValidateGrpcInput(
    { query: FindAllClientDTO },
    {
      code: 2205,
      identify: 'CLIENT_UNPROCESSABLE_CONTENT',
    },
  )
  async findAllClients(data: { query: FindAllClientDTO }) {
    return await this.findAllClientUseCase.execute(data.query);
  }

  @GrpcMethod('ClientService', 'GetClientById')
  @ValidateGrpcInput(
    { params: FindOneClientDTO },
    {
      code: 2205,
      identify: 'CLIENT_UNPROCESSABLE_CONTENT',
    },
  )
  async findOneClient(data: { params: FindOneClientDTO }) {
    return await this.findOneClientUseCase.execute(data.params.id);
  }

  @GrpcMethod('ClientService', 'DeleteClient')
  @ValidateGrpcInput(
    { params: DeleteClientDTO },
    {
      code: 2205,
      identify: 'CLIENT_UNPROCESSABLE_CONTENT',
    },
  )
  async deleteClient(data: { params: DeleteClientDTO }) {
    return await this.deleteClientUseCase.execute(data.params.id);
  }
}
