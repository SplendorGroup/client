import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@/domain/entities/client';
import { IRepository } from '@/domain/interfaces/irepository';

@Injectable()
export class ClientService {
  @Inject('client')
  public readonly client: IRepository<'client'>;

  async findAll(client?: Partial<Client>): Promise<Partial<Client>[]> {
    return await this.client.findAll(client);
  }

  async findById(id: string): Promise<Partial<Client>> {
    return await this.client.findById(id);
  }

  async findOne(client: Partial<Client>): Promise<Partial<Client>> {
    return await this.client.findOne(client);
  }

  async create(client: Partial<Client>): Promise<Partial<Client>> {
    return await this.client.create(client);
  }

  async update(id: string, client: Partial<Client>): Promise<Partial<Client>> {
    return (await this.client.update(id, client)) as unknown as Partial<Client>;
  }

  async delete(id: string): Promise<void> {
    return await this.client.deleteById(id);
  }

  async count(client: Partial<Client>): Promise<number> {
    return await this.client.count(client);
  }
}
