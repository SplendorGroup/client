import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientService } from '@/application/services/client';
import { Client } from '@/domain/entities/client';
import { ClientMapper } from '@/domain/mappers/client';

@Injectable()
export class FindOneClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(id: string) {
    const client = await this.findClientById(id);
    this.checkIfClientExists(client);
    return this.transformResponse(client);
  }

  private async findClientById(id: string): Promise<Client> {
    return await this.clientService.findById(id) as Client;
  }

  private checkIfClientExists(client: Client | null) {
    if (!client) {
      throw new RpcException({
        code: 2200,
        details: JSON.stringify({
          name: 'Client Not Found',
          identify: 'CLIENT_NOT_FOUND',
          status: 404,
          message: 'The specified client could not be found.',
        }),
      });
    }
  }

  private transformResponse(client: Client) {
    return ClientMapper.toResponse(client);
  }
}
