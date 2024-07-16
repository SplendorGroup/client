import { Injectable } from '@nestjs/common';
import { ClientService } from '@/application/services/client';
import { Client } from '@/domain/entities/client';
import { ClientMapper } from '@/domain/mappers/client';
import { FindAllClientDTO } from '@/application/dtos/find-all-client';

type Data = {
  id?: string;
  name?: string;
  cpf?: string;
  page?: number;
};

type Pagination = {
  skip: number;
  take: number;
};

@Injectable()
export class FindAllClientUseCase {
  constructor(private readonly clientService: ClientService) {}

  async execute(filter: FindAllClientDTO) {
    const per_page = this.limitPerPage();
    const pagination = this.pagination(filter, per_page);
    const filter_payload = this.mountFilter(filter, pagination);

    const total = await this.countAllClients(filter);
    const page = this.getPage(pagination);
    const clients = await this.selectWithFilterClients(filter_payload);
    const in_page = this.countClientsFiltered(clients);
    const pages = this.countPages(total, per_page);

    return this.findAllClientsToResponse({
      total,
      page,
      pages,
      per_page,
      in_page,
      data: clients,
    });
  }

  protected pagination(filter: Omit<Data, 'client'>, limit: number) {
    if (!filter?.page || filter?.page <= 1) {
      return {
        skip: 1,
        take: limit,
      };
    }
    return {
      skip: filter?.page + 1,
      take: limit,
    };
  }

  limitPerPage() {
    const page_limit = Number(process.env.PAGE_LIMIT);
    return !isNaN(page_limit) ? page_limit : 10;
  }

  getPage(pagination: ReturnType<FindAllClientUseCase['pagination']>) {
    return pagination.skip;
  }

  mountFilter(
    filter: Omit<Data, 'client'>,
    pagination: ReturnType<FindAllClientUseCase['pagination']>,
  ) {
    delete filter.page;
    return {
      ...filter,
      ...pagination,
    };
  }

  async selectWithFilterClients(filter: Omit<Data & Pagination, 'client'>) {
    return (await this.clientService.findAll(filter)) as Client[];
  }

  countClientsFiltered(client: Client[]) {
    return client.length;
  }

  async countAllClients(filter: Omit<Data, 'client'>) {
    return await this.clientService.count(filter);
  }

  countPages(total_clients: number, per_page: number) {
    return Math.floor(total_clients / per_page);
  }

  findAllClientsToResponse(data: {
    total: number;
    page: number;
    per_page: number;
    in_page: number;
    pages: number;
    data: Client[];
  }) {
    const { total, page, per_page, in_page, pages, data: clients } = data;
    return {
      total,
      page,
      per_page,
      in_page,
      pages,
      data: this.filterClient(clients),
    };
  }

  filterClient(data: Client[]) {
    try {
      return data.flatMap((client: Client) => {
        return ClientMapper.toResponse(client);
      });
    } catch (error) {
      return [];
    }
  }
}
