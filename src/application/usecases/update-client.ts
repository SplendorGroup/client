import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientService } from '@/application/services/client';
import { UpdateClientDTO } from '@/application/dtos/update-client';
import { ClientMapper } from '@/domain/mappers/client';
import { Client } from '@/domain/entities/client';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(id: string, data: UpdateClientDTO) {
    const existing_client = await this.findClientById(id);
    this.checkIfClientExists(existing_client);
    const updated_client = await this.updateClient(id, {
        ...existing_client,
        ...data
    } as Client);
    return this.transformResponse(updated_client);
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

  private async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    try {
      return await this.clientService.update(id, data) as Client;
    } catch {
      throw new RpcException({
        code: 2203,
        details: JSON.stringify({
          name: 'Client Update Failed',
          identify: 'CLIENT_UPDATE_FAILED',
          status: 500,
          message: 'Failed to update client.',
        }),
      });
    }
  }

  private transformResponse(client: Client) {
    return ClientMapper.toResponse(client);
  }
}
