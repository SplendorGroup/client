import { Client } from "../entities/client";
import { DateValuesObject } from "../values-object/date";

export class ClientMapper {
  static toDomain(raw: any): Client {
    return new Client({
      id: raw?._id,
      user_id: raw?.id,
      full_name: raw?.full_name,
      cpf: raw?.cpf,
      cnh: raw?.cnh,
      email: raw?.email,
      phone_number: raw?.phone_number,
      address: raw?.address,
      city: raw?.city,
      state: raw?.state,
      zip_code: raw?.zip_code,
      complement: raw?.complement,
      number: raw?.number,
      created_at: new DateValuesObject(raw?.created_at).toDate(),
      updated_at: raw?.updated_at ? new DateValuesObject(raw?.updated_at).toDate() : undefined,
    });
  }

  static toPersistence(client: Client) {
    return {
      id: client?.id,
      user_id: client?.id,
      full_name: client?.full_name,
      cpf: client?.cpf,
      cnh: client?.cnh,
      email: client?.email,
      phone_number: client?.phone_number,
      address: client?.address,
      city: client?.city,
      state: client?.state,
      zip_code: client?.zip_code,
      complement: client?.complement,
      number: client?.number,
      created_at: client?.created_at ? new DateValuesObject(client?.created_at).toString() : undefined,
      updated_at: client?.updated_at ? new DateValuesObject(client?.updated_at).toString() : undefined,
    };
  }

  static toResponse(client: Client) {
    return {
      id: client?.id,
      user_id: client?.id,
      full_name: client?.full_name,
      cpf: client?.cpf,
      cnh: client?.cnh,
      email: client?.email,
      phone_number: client?.phone_number,
      address: client?.address,
      city: client?.city,
      state: client?.state,
      zip_code: client?.zip_code,
      complement: client?.complement,
      number: client?.number,
      created_at: client?.created_at ? new DateValuesObject(client?.created_at).toISOString() : undefined,
      updated_at: client?.updated_at ? new DateValuesObject(client?.updated_at).toISOString() : undefined,
    };
  }
}
