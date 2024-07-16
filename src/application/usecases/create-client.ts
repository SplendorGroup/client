import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientService } from '@/application/services/client';
import { ClientFactory } from '@/domain/factories/client';
import { CreateClientDTO } from '@/application/dtos/create-client';
import { Client } from '@/domain/entities/client';
import { ClientMapper } from '@/domain/mappers/client';

@Injectable()
export class CreateClientUseCase {
  constructor(
    private readonly clientService: ClientService,
    private readonly clientFactory: ClientFactory,
  ) {}

  async execute(data: CreateClientDTO) {
    const client = this.createClientDomain(data);
    const created_client = await this.saveClient(client);
    return this.transformResponse(created_client);
  }

  private createClientDomain(data: CreateClientDTO): Client {
    return this.clientFactory.create(data);
  }

  private async saveClient(client: Client): Promise<Client> {
    try {
      return await this.clientService.create(client) as Client;
    } catch {
      throw new RpcException({
        code: 2202,
        details: JSON.stringify({
          name: 'Client Creation Failed',
          identify: 'CLIENT_CREATION_FAILED',
          status: 500,
          message: 'Failed to create client.',
        }),
      });
    }
  }

  private transformResponse(client: Client) {
    return ClientMapper.toResponse(client);
  }
}
