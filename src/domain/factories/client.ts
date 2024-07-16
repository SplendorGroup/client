import { Injectable } from '@nestjs/common';
import { ClientMapper } from '../mappers/client';
import { Client } from '../entities/client';

@Injectable()
export class ClientFactory {
  create(data: any): any {
    const clientDomain = ClientMapper.toDomain(data);
    const client = new Client(clientDomain);
    return ClientMapper.toPersistence(client);
  }

  update(data: any): any {
    const clientDomain = ClientMapper.toDomain(data);
    const client = new Client(clientDomain, { update: true });
    return ClientMapper.toPersistence(client);
  }
}
