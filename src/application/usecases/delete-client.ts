import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientService } from '@/application/services/client';
import { Client } from '@/domain/entities/client';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(id: string): Promise<void> {
    const client = await this.findClientById(id);
    this.checkIfClientExists(client);
    await this.deleteClient(id);
  }

  private async findClientById(id: string) {
    return await this.clientService.findById(id);
  }

  private checkIfClientExists(client: Partial<Client>| null) {
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

  private async deleteClient(id: string) {
    try {
      await this.clientService.delete(id);
    } catch {
      throw new RpcException({
        code: 2204,
        details: JSON.stringify({
          name: 'Client Deletion Failed',
          identify: 'CLIENT_DELETION_FAILED',
          status: 500,
          message: 'Failed to delete client.',
        }),
      });
    }
  }
}
